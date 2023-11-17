import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
  LenderWithdrawalStatus,
  Market,
  MarketAccount,
  Token,
  TokenAmount,
} from "@wildcatfi/wildcat-sdk"
import { parseUnits } from "ethers/lib/utils"
import { BigNumber } from "ethers"

import { WildcatMarketController } from "@wildcatfi/wildcat-sdk/dist/typechain"
import { useAccount } from "wagmi"
import { useEthersSigner } from "../../../../modules/hooks"
import {
  toastifyError,
  toastifyInfo,
  toastifyRequest,
  toastifySuccess,
} from "../../../../components/toasts"
import { GET_MARKET_ACCOUNT_KEY } from "../../../../hooks/useGetMarket"
import { useGetControllerContract } from "../../../../hooks/useGetController"
import { GET_AUTHORIZED_LENDERS_KEY } from "../Modals/RemoveLendersModal/hooks/useGetAuthorizedLenders"
import { GET_LENDERS_BY_MARKET_KEY } from "./useGetAuthorisedLenders"
import { useGetWithdrawalForLender } from "../../../../hooks/useGetWithdrawalForLender"
import { useGetWithdrawals } from "../LenderWithdrawalRequests/hooks/useGetWithdrawals"

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
      toastifyInfo("Borrowing in progress... Check your wallet transaction")
      client.invalidateQueries({ queryKey: [GET_MARKET_ACCOUNT_KEY] })
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
      client.invalidateQueries({ queryKey: [GET_MARKET_ACCOUNT_KEY] })
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
        pending: "Approving...",
        success: `${amount} successfully approved`,
        error: `Error`,
      })
    },
    onSuccess() {
      client.invalidateQueries({ queryKey: [GET_MARKET_ACCOUNT_KEY] })
    },
  })
}

export const useDeposit = (marketAccount: MarketAccount) => {
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

      const checkCanDeposit = marketAccount.checkDepositStep(tokenAmount)

      const deposit = async () => {
        const tx = await marketAccount.deposit(tokenAmount)
        await tx.wait()
      }

      await toastifyRequest(deposit(), {
        pending: "Depositing...",
        success: `${amount} successfully deposited`,
        error: `Error: ${checkCanDeposit.status}`,
      })
    },
    onSuccess(_, amount) {
      toastifyInfo(`${amount} successfully deposited`)
      client.invalidateQueries({ queryKey: [GET_MARKET_ACCOUNT_KEY] })
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
      if (!market || !claimableWithdrawals.length || !address) {
        return
      }

      const claim = async () => {
        const tx =
          claimableWithdrawals.length === 1
            ? await market.executeWithdrawal(claimableWithdrawals[0])
            : await market.executeWithdrawals(claimableWithdrawals)
        await tx?.wait()
      }

      await toastifyRequest(claim(), {
        pending: "Claiming...",
        success: "Successfully claimed",
        error: `Error`,
      })
    },
    onSuccess() {
      client.invalidateQueries({ queryKey: [GET_MARKET_ACCOUNT_KEY] })
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
        pending: "Executing withdrawals...",
        success: "Successfully executed",
        error: `Error`,
      })
    },
    onSuccess() {
      client.invalidateQueries({ queryKey: [GET_MARKET_ACCOUNT_KEY] })
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

      await toastifyRequest(withdraw(), {
        pending: `Add ${amount} to withdrawal queue`,
        success: `${amount} successfully added to withdrawal queue`,
        error: "Error",
      })
    },
    onSuccess(_, amount) {
      toastifyInfo(`${amount} successfully added to withdrawal queue`)
      client.invalidateQueries({ queryKey: [GET_MARKET_ACCOUNT_KEY] })
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
    mutationFn: async (amount: BigNumber) => {
      if (!marketAccount || !signer) {
        return
      }

      await marketAccount.repay(amount)
    },
    onSuccess() {
      toastifyInfo("Repaying in progress... Check your wallet transaction")
      client.invalidateQueries({ queryKey: [GET_MARKET_ACCOUNT_KEY] })
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

      await marketAccount.repayOutstandingDebt()
    },
    onSuccess() {
      toastifyInfo("Repaying in progress... Check your wallet transaction")
      client.invalidateQueries({ queryKey: [GET_MARKET_ACCOUNT_KEY] })
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

      await marketAccount.setAnnualInterestBips(amount)
    },
    onSuccess() {
      toastifyInfo("APR adjust in progress... Check your wallet transaction")
      client.invalidateQueries({ queryKey: [GET_MARKET_ACCOUNT_KEY] })
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
      toastifyInfo("Market is closing... Check your wallet transaction")
      client.invalidateQueries({ queryKey: [GET_MARKET_ACCOUNT_KEY] })
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
        pending: "Step 2. Authorizing lenders in markets...",
        success: "Step 2. Lenders successfully authorized",
        error: "Error authorizing lenders",
      },
    )
  }
}

export const useAuthorizedLenders = (lenders: string[], market: string) => {
  const { data: controller } = useGetControllerContract()
  const client = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      if (!lenders.length) {
        toastifyError("Add lenders")
        return
      }
      const authoriseLenders = async () => {
        const tx = await controller?.authorizeLenders(lenders)
        await tx?.wait()
      }

      await toastifyRequest(authoriseLenders(), {
        pending: "Step 1. Authorizing lenders on controller...",
        success: "Step 1. Lenders successfully authorized",
        error: "Error authorizing lenders",
      })

      await updateLenderAuthorizationForAll(controller, lenders, market)
    },
    onSuccess() {
      client.invalidateQueries({ queryKey: [GET_MARKET_ACCOUNT_KEY] })
      client.invalidateQueries({ queryKey: [GET_LENDERS_BY_MARKET_KEY] })
    },
    onError(error) {
      toastifyError(`authorize lenders error: ${error}`)
    },
  })
}

export const useDeauthorizedLenders = (
  authorizedLenders: string[],
  market: string,
) => {
  const { data: controller } = useGetControllerContract()
  const client = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      if (!authorizedLenders.length) {
        toastifyError("Please add lenders address")
        return
      }
      const tx = await controller?.deauthorizeLenders(authorizedLenders)
      await tx?.wait()
      await updateLenderAuthorizationForAll(
        controller,
        authorizedLenders,
        market,
      )
    },
    onSuccess() {
      toastifySuccess("Lenders successfully removed")
      client.invalidateQueries({
        queryKey: [GET_AUTHORIZED_LENDERS_KEY, GET_LENDERS_BY_MARKET_KEY],
      })
    },
    onError(error) {
      toastifyError(`Removing lenders error: ${error}`)
    },
  })
}
