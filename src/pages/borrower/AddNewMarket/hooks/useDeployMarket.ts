import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
  MarketParameters,
  deployToken,
  TokenAmount,
  Token,
  getNextTokenAddress,
  populateDeployToken,
  PartialTransaction,
} from "@wildcatfi/wildcat-sdk"
import { parseUnits } from "ethers/lib/utils"

import { useNavigate } from "react-router-dom"
import { useGetController } from "../../../../hooks/useGetController"
import { useEthersSigner } from "../../../../modules/hooks"
import { DeployNewMarketParams } from "./interface"
import { toastifyError, toastifyRequest } from "../../../../components/toasts"
import { BASE_PATHS } from "../../../../routes/constants"
import { TargetChainId } from "../../../../config/networks"
import { useCurrentNetwork } from "../../../../hooks/useCurrentNetwork"
import { useGnosisSafeSDK } from "../../../../hooks/useGnosisSafeSDK"
import { waitForSubgraphSync } from "../../../../utils/waitForSubgraphSync"
import { GET_BORROWER_MARKETS_LIST_KEY } from "../../hooks/useMarketsForBorrower"

export const useDeployMarket = () => {
  const { data: controller } = useGetController()
  const signer = useEthersSigner()
  const navigate = useNavigate()
  const client = useQueryClient()
  const { isTestnet } = useCurrentNetwork()
  const {
    isConnectedToSafe,
    sdk: gnosisSafeSDK,
    sendTransactions: sendGnosisTransactions,
  } = useGnosisSafeSDK()

  const { mutate: deployNewMarket, isLoading: isDeploying } = useMutation({
    mutationFn: async (marketParams: DeployNewMarketParams) => {
      if (!signer || !controller || !marketParams) {
        return
      }
      const useGnosisMultiSend = gnosisSafeSDK && isTestnet

      const { assetData } = marketParams
      let asset: Token
      const gnosisTransactions: PartialTransaction[] = []
      console.log(
        `useDeployMarket :: isTestnet: ${isTestnet} :: isConnectedToSafe: ${isConnectedToSafe} :: gnosisSafeSDK: ${!!gnosisSafeSDK}`,
      )
      if (isTestnet) {
        if (gnosisSafeSDK) {
          const { chainId } = controller
          const address = await signer.getAddress()
          asset = new Token(
            chainId,
            await getNextTokenAddress(chainId, signer, address),
            assetData.name,
            assetData.symbol,
            18,
            true,
            signer,
          )
          gnosisTransactions.push(
            await populateDeployToken(
              chainId,
              signer,
              assetData.name,
              assetData.symbol,
            ),
          )
        } else {
          asset = await toastifyRequest(
            deployToken(
              TargetChainId,
              signer,
              assetData.name,
              assetData.symbol,
            ).then((t) => t.token),
            {
              pending: "Step 1/2: Deploying Mock Token...",
              success: "Step 1/2: Mock Token Deployed Successfully!",
              error: "Step 1/2: Mock Token Deployment Failed.",
            },
          )
        }
      } else {
        asset = assetData
      }

      const maxTotalSupply = new TokenAmount(
        parseUnits(marketParams.maxTotalSupply.toString(), asset.decimals),
        asset,
      )

      const marketParameters: MarketParameters = {
        asset,
        namePrefix: marketParams.namePrefix,
        symbolPrefix: marketParams.symbolPrefix,
        maxTotalSupply,
        annualInterestBips: marketParams.annualInterestBips,
        delinquencyFeeBips: marketParams.delinquencyFeeBips,
        withdrawalBatchDuration: marketParams.withdrawalBatchDuration,
        reserveRatioBips: marketParams.reserveRatioBips,
        delinquencyGracePeriod: marketParams.delinquencyGracePeriod,
      }

      // 1. Ensure borrower is registered on the arch-controller.
      // For the testnet deployment, anyone can register a borrower
      if (!controller.isRegisteredBorrower) {
        if (isTestnet) {
          if (gnosisSafeSDK) {
            gnosisTransactions.push(await controller.populateRegisterBorrower())
          } else {
            await toastifyRequest(controller.registerBorrower(), {
              pending: "Adjusting: Registering Borrower...",
              success: "Adjusting: Borrower Registered Successfully",
              error: "Adjusting: Borrower Registration Failed",
            })
          }
        } else {
          toastifyError("Must Be Registered Borrower")
          throw Error("Not Registered Borrower")
        }
      }

      // 2. Ensure the `asset, namePrefix, symbolPrefix` are unique.
      if (controller.getExistingMarketForParameters(marketParameters)) {
        toastifyError("Market Not Unique: Modify Either Prefix")
        throw Error("Market Not Unique")
      }

      const stepPrefix = isTestnet && !isConnectedToSafe ? "Step 2/2: " : ""
      const send = async () => {
        if (useGnosisMultiSend) {
          gnosisTransactions.push(
            controller.encodeDeployMarket(marketParameters),
          )
          console.log(`Sending gnosis transactions...`)
          console.log(gnosisTransactions)
          const tx = await sendGnosisTransactions(gnosisTransactions)
          console.log(
            `Got gnosis transaction:\n\tsafeTxHash: ${tx.safeTxHash}\n\ttxHash: ${tx.txHash}`,
          )
          const receipt = await tx.wait()
          return receipt
        }
        const { receipt, transaction } =
          await controller.deployMarket(marketParameters)

        await transaction.wait()

        return receipt
      }
      // 3. Deploy market
      const receipt = await toastifyRequest(send(), {
        pending: `${stepPrefix}Deploying Market...`,
        success: `${stepPrefix}Market Deployed - Redirecting To Market List...`,
        error: `${stepPrefix}Market Deployment Failed`,
      })
      await waitForSubgraphSync(receipt.blockNumber)
    },
    onSuccess: () => {
      client
        .invalidateQueries({ queryKey: [GET_BORROWER_MARKETS_LIST_KEY] })
        .then(() => {
          navigate(`${BASE_PATHS.Borrower}/`)
        })
    },
    onError(error) {
      console.log(error)
    },
  })

  return {
    deployNewMarket,
    isDeploying,
  }
}
