import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
  MarketParameters,
  deployToken,
  TokenAmount,
} from "@wildcatfi/wildcat-sdk"
import { parseUnits } from "ethers/lib/utils"

import { useNavigate } from "react-router-dom"
import {
  GET_CONTROLLER_KEY,
  useGetController,
} from "../../../../hooks/useGetController"
import { useEthersSigner } from "../../../../modules/hooks"
import { DeployNewMarketParams } from "./interface"
import { toastifyError, toastifyRequest } from "../../../../components/toasts"
import { BORROWER_PATHS } from "../../routes/constants"
import { BASE_PATHS } from "../../../../routes/constants"

export const useDeployMarket = () => {
  const { data: controller } = useGetController()
  const signer = useEthersSigner()
  const navigate = useNavigate()
  const client = useQueryClient()

  const { mutate: deployNewMarket, isLoading: isDeploying } = useMutation({
    mutationFn: async (marketParams: DeployNewMarketParams) => {
      if (!signer || !controller || !marketParams) {
        return
      }

      const { assetData } = marketParams

      const asset = await toastifyRequest(
        deployToken(signer, assetData.name, assetData.symbol),
        {
          pending: "Step 1/2: Deploying Mock Token...",
          success: "Step 1/2: Mock Token Deployed Successfully!",
          error: "Step 1/2: Mock Token Deployment Failed.",
        },
      )

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
        await toastifyRequest(controller.registerBorrower(), {
          pending: "Adjusting: Registering Borrower...",
          success: "Adjusting: Borrower Registered Successfully",
          error: "Adjusting: Borrower Registration Failed",
        })
      }

      // 2. Ensure the `asset, namePrefix, symbolPrefix` are unique.
      if (controller.getExistingMarketForParameters(marketParameters)) {
        toastifyError("Market Not Unique: Modify Either Prefix")
        throw Error("Market Not Unique")
      }

      // 3. Deploy market
      await toastifyRequest(controller.deployMarket(marketParameters), {
        pending: "Step 2/2: Deploying Market...",
        success: "Step 2/2: Market Deployed - Redirecting To Market List...",
        error: "Step 2/2: Market Deployment Failed",
      })
    },
    onSuccess: () => {
      setTimeout(() => {
        navigate(`${BASE_PATHS.Borrower}/${BORROWER_PATHS.MyVaults}`)
      }, 3000)
      client.invalidateQueries({ queryKey: [GET_CONTROLLER_KEY] })
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
