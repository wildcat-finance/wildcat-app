import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
  LenderWithdrawalStatus,
  Market,
  MarketAccount,
  Token,
  TokenAmount,
} from "@wildcatfi/wildcat-sdk"
import { parseUnits } from "ethers/lib/utils"

import { WildcatMarketController } from "@wildcatfi/wildcat-sdk/dist/typechain"
import { useAccount } from "wagmi"
import { useEthersSigner } from "../../../../modules/hooks"
import {
  toastifyError,
  toastifyInfo,
  toastifyRequest,
} from "../../../../components/toasts"
import { GET_MARKET_KEY } from "../../../../hooks/useGetMarket"
import { useGetControllerContract } from "../../../../hooks/useGetController"
import { GET_AUTHORISED_LENDERS_KEY } from "../Modals/RemoveLendersModal/hooks/useGetAuthorizedLenders"
import { useGetWithdrawals } from "../LenderWithdrawalRequests/hooks/useGetWithdrawals"
import { TOKEN_FORMAT_DECIMALS } from "../../../../utils/formatters"

export const useBorrow = (marketAccount: MarketAccount) => {
  const signer = useEthersSigner()
  const client = useQueryClient()

  return useMutation({
    mutationFn: async (amount: string) => {
      if (!marketAccount || !signer) {
        return
      }

      const tokenAmount = new TokenAmount(
        parseUnits(amount, marketAccount.market.underlyingToken.decimals),
        marketAccount.market.underlyingToken,
      )

      await marketAccount.borrow(tokenAmount)
    },
    onSuccess() {
      toastifyInfo("Processing Borrow...")
      client.invalidateQueries({ queryKey: [GET_MARKET_KEY] })
    },
    onError(error) {
      console.log(error)
    },
  })
}

export const useGetAllowance = (token: Token) => {
  const signer = useEthersSigner()
  const client = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      if (!signer) {
        return
      }

      const getAllowance = async () => {
        const allowance = await token.contract.allowance(
          token.address,
          signer.getAddress(),
        )
        return allowance
      }

      getAllowance()
    },
    onSuccess() {
      client.invalidateQueries({ queryKey: [GET_MARKET_KEY] })
    },
  })
}

export const useApprove = (token: Token, market: Market) => {
  const client = useQueryClient()

  return useMutation({
    mutationFn: async (amount: string) => {
      if (!market) {
        return
      }

      const tokenAmount = new TokenAmount(
        parseUnits(amount, token.decimals),
        token,
      )

      const approve = async () => {
        const tx = await token.contract.approve(
          market.address.toLowerCase(),
          tokenAmount.raw,
        )
        await tx.wait()
      }

      await toastifyRequest(approve(), {
        pending: `Approving ${amount} ${token.symbol}...`,
        success: `Successfully Approved ${amount} ${token.symbol}!`,
        error: `Error: ${token.symbol} Approval Failed`,
      })
    },
    onSuccess() {
      client.invalidateQueries({ queryKey: [GET_MARKET_KEY] })
    },
  })
}

export const useDeposit = (
  marketAccount: MarketAccount,
  onSuccess?: () => void,
) => {
  const signer = useEthersSigner()
  const client = useQueryClient()

  return useMutation({
    mutationFn: async (amount: string) => {
      if (!marketAccount || !signer) throw Error()

      const tokenSymbol = marketAccount.market.underlyingToken.symbol

      const tokenAmount = new TokenAmount(
        parseUnits(amount, marketAccount.market.underlyingToken.decimals),
        marketAccount.market.underlyingToken,
      )

      const checkCanDeposit = marketAccount.checkDepositStep(tokenAmount)

      const deposit = async () => {
        const tx = await marketAccount.deposit(tokenAmount)
        await tx.wait()
      }

      await toastifyRequest(deposit(), {
        pending: `Depositing ${amount} ${tokenSymbol}...`,
        success: `Successfully Deposited ${amount} ${tokenSymbol}!`,
        error: `Error: ${checkCanDeposit.status}`,
      })
    },
    onSuccess() {
      if (onSuccess) onSuccess()
      client.invalidateQueries({ queryKey: [GET_MARKET_KEY] })
    },
    onError(error) {
      console.log(error)
    },
  })
}

export const useClaim = (
  market: Market,
  withdrawals: LenderWithdrawalStatus[],
) => {
  const client = useQueryClient()
  const { address } = useAccount()
  return useMutation({
    mutationFn: async () => {
      const claimableWithdrawals = withdrawals.filter((w) =>
        w.availableWithdrawalAmount.gt(0),
      )
      if (!market || !claimableWithdrawals.length || !address) throw Error

      const claim = async () => {
        const tx =
          claimableWithdrawals.length === 1
            ? await market.executeWithdrawal(claimableWithdrawals[0])
            : await market.executeWithdrawals(claimableWithdrawals)
        await tx?.wait()
      }

      await toastifyRequest(claim(), {
        pending: "Executing Claim...",
        success: "Claim Successful!",
        error: `Error: Claim Execution Failed`,
      })
    },
    onSuccess() {
      client.invalidateQueries({ queryKey: [GET_MARKET_KEY] })
    },
    onError(error) {
      console.log(error)
    },
  })
}

export const useClaimSeveral = (market: Market | undefined) => {
  const client = useQueryClient()
  const { address } = useAccount()
  const { data } = useGetWithdrawals(market!.address)
  console.log(data?.expiredBatches)

  return useMutation({
    mutationFn: async () => {
      if (!market || !address || !data?.expiredBatches.length) {
        return
      }

      const withdrawals = data?.expiredBatches.map((expiredBatch) => ({
        expiry: expiredBatch.blockTimestamp,
        lender: address.toLowerCase(),
      }))

      const claim = async () => {
        const tx = await market.executeWithdrawals(withdrawals)
        await tx?.wait()
      }

      await toastifyRequest(claim(), {
        pending: "Executing Claim...",
        success: "Claim Successful!",
        error: `Error: Claim Execution Failed`,
      })
    },
    onSuccess() {
      client.invalidateQueries({ queryKey: [GET_MARKET_KEY] })
    },
    onError(error) {
      console.log(error)
    },
  })
}

export const useWithdraw = (marketAccount: MarketAccount) => {
  const { address } = useAccount()
  const client = useQueryClient()
  // TODO: add call canWithdraw

  return useMutation({
    mutationFn: async (amount: string) => {
      if (!marketAccount || !address) {
        return
      }

      const tokenAmount = new TokenAmount(
        parseUnits(amount, marketAccount.market.underlyingToken.decimals),
        marketAccount.market.underlyingToken,
      )

      const withdraw = async () => {
        await marketAccount.queueWithdrawal(tokenAmount)
      }

      // const { symbol } = marketAccount.market.underlyingToken

      await withdraw()

      // await toastifyRequest(withdraw(), {
      //   pending: `Add ${amount} ${symbol} to withdrawal queue`,
      //   success: `${amount} ${symbol} successfully added to withdrawal queue`,
      //   error: "Error adding to withdrawal queue",
      // })
    },
    onSuccess(_, amount) {
      toastifyInfo(`${amount} Successfully Requested!`)
      client.invalidateQueries({ queryKey: [GET_MARKET_KEY] })
    },
    onError(error, amount) {
      console.log(error, amount)
    },
  })
}

export const useRepay = (marketAccount: MarketAccount) => {
  const signer = useEthersSigner()
  const client = useQueryClient()

  return useMutation({
    mutationFn: async (amount: TokenAmount) => {
      if (!marketAccount || !signer) {
        return
      }

      const repay = async () => {
        const tx = await marketAccount.repay(amount.raw)
        await tx?.wait()
      }

      const { symbol } = marketAccount.market.underlyingToken

      const tokenAmountFormatted = amount.format(TOKEN_FORMAT_DECIMALS)

      await toastifyRequest(repay(), {
        pending: `${tokenAmountFormatted} ${symbol} Repayment In Progress...`,
        success: `Successfully Repaid ${tokenAmountFormatted} ${symbol}!`,
        error: `Error: Repayment Attempt Failed`,
      })
    },
    onSuccess() {
      client.invalidateQueries({ queryKey: [GET_MARKET_KEY] })
    },
    onError(error) {
      console.log(error)
    },
  })
}

export const useRepayOutstandingDebt = (marketAccount: MarketAccount) => {
  const signer = useEthersSigner()
  const client = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      if (!marketAccount || !signer) {
        return
      }

      const repayOutstandingDebt = async () => {
        const tx = await marketAccount.repayOutstandingDebt()
        await tx?.wait()
      }

      await toastifyRequest(repayOutstandingDebt(), {
        pending: "Repaying Outstanding Debt...",
        success: "Outstanding Debt Successfully Repaid!",
        error: `Error Repaying Outstanding Debt`,
      })
    },
    onSuccess() {
      toastifyInfo("Repayment In Progress...")
      client.invalidateQueries({ queryKey: [GET_MARKET_KEY] })
    },
    onError(error) {
      console.log(error)
    },
  })
}

export const useAdjustAPR = (marketAccount: MarketAccount) => {
  const signer = useEthersSigner()
  const client = useQueryClient()

  return useMutation({
    mutationFn: async (amount: number) => {
      if (!marketAccount || !signer) {
        return
      }

      const setApr = async () => {
        const tx = await marketAccount.setAnnualInterestBips(amount * 100)
        await tx.wait()
      }

      await toastifyRequest(setApr(), {
        pending: `Adjusting Lender APR...`,
        success: `Lender APR Successfully Adjusted`,
        error: "Error adjusting Lender APR",
      })
    },
    onSuccess() {
      client.invalidateQueries({ queryKey: [GET_MARKET_KEY] })
    },
    onError(error) {
      console.log(error)
    },
  })
}

export const useTerminateMarket = (marketAccount: MarketAccount) => {
  const signer = useEthersSigner()
  const client = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      if (!signer) {
        return
      }

      await marketAccount.closeMarket()
    },
    onSuccess() {
      toastifyInfo("Market Successfully Closed")
      client.invalidateQueries({ queryKey: [GET_MARKET_KEY] })
    },
    onError(error) {
      console.log(error)
    },
  })
}

async function updateLenderAuthorizationForAll(
  controller: WildcatMarketController | undefined,
  lenders: string[],
  market: string,
) {
  if (controller) {
    await toastifyRequest(
      Promise.all(
        lenders.map(async (lender) => {
          const tx = await controller.updateLenderAuthorization(
            lender.toLowerCase(),
            [market],
          )

          await tx.wait()
        }),
      ),
      {
        pending: "Step 2/2: Updating Lender Roles...",
        success: "Step 2/2: Roles Successfully Updated!",
        error: "Error Authorising Lenders",
      },
    )
  }
}

export const useAuthoriseLenders = (
  lenders: string[],
  controllerAddress: string,
) => {
  const { data: controller } = useGetControllerContract(controllerAddress)
  const client = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      if (!lenders.length) {
        toastifyError("Add At Least One Lender Address")
        return
      }
      const authoriseLenders = async () => {
        const tx = await controller?.authorizeLenders(lenders)
        await tx?.wait()
      }

      await toastifyRequest(authoriseLenders(), {
        pending: "Authorising Lenders...",
        success: "Lenders Successfully Authorised!",
        error: "Error authorising lenders",
      })
    },
    onSuccess() {
      client.invalidateQueries({
        queryKey: [GET_AUTHORISED_LENDERS_KEY],
      })
    },
    onError(error) {
      toastifyError(`Error Authorising Lenders: ${error}`)
    },
  })
}

export const useDeauthorizeLenders = (
  authorizedLenders: string[],
  controllerAddress: string,
) => {
  const { data: controller } = useGetControllerContract(controllerAddress)
  const client = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      if (!authorizedLenders.length) {
        toastifyError("Error: No Addresses Provided")
        return
      }

      const deauthorizeLenders = async () => {
        const tx = await controller?.deauthorizeLenders(authorizedLenders)
        await tx?.wait()
      }

      await toastifyRequest(deauthorizeLenders(), {
        pending: "Removing Lenders...",
        success: "Lenders successfully removed!",
        error: "Error removing lenders",
      })
    },
    onSuccess() {
      client.invalidateQueries({
        queryKey: [GET_AUTHORISED_LENDERS_KEY],
      })
    },
    onError(error) {
      toastifyError(`Error Removing Lenders: ${error}`)
    },
  })
}
