import { useMutation, useQueryClient } from "@tanstack/react-query"
import { MarketAccount, TokenAmount } from "@wildcatfi/wildcat-sdk"
import { parseUnits } from "ethers/lib/utils"
import { BigNumber } from "ethers"

import { WildcatMarketController } from "@wildcatfi/wildcat-sdk/dist/typechain"
import { useEthersSigner } from "../../../../modules/hooks"
import {
  toastifyError,
  toastifyInfo,
  toastifyRequest,
  toastifySuccess,
} from "../../../../components/toasts"
import { GET_MARKET_ACCOUNT_KEY } from "./useGetMarket"
import { useGetControllerContract } from "../../../../hooks/useGetController"
import { GET_AUTHORIZED_LENDERS_KEY } from "../Modals/RemoveLendersModal/hooks/useGetAuthorizedLenders"
import { GET_LENDERS_BY_MARKET_KEY } from "./useGetAuthorisedLenders"

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

export const useDeposit = (marketAccount: MarketAccount) => {
  const signer = useEthersSigner()
  const client = useQueryClient()
  // TODO: add call canDeposit

  return useMutation({
    mutationFn: async (amount: string) => {
      if (!marketAccount || !signer) {
        return
      }

      const tokenAmount = new TokenAmount(
        parseUnits(amount, marketAccount.market.underlyingToken.decimals),
        marketAccount.market.underlyingToken,
      )

      await marketAccount.deposit(tokenAmount)
    },
    onSuccess() {
      toastifyInfo("Deposit in progress... Check your wallet transaction")
      client.invalidateQueries({ queryKey: [GET_MARKET_ACCOUNT_KEY] })
    },
    onError(error) {
      console.log(error)
    },
  })
}

export const useWithdraw = (marketAccount: MarketAccount) => {
  const signer = useEthersSigner()
  const client = useQueryClient()
  // TODO: add call canWithdraw

  return useMutation({
    mutationFn: async (amount: string) => {
      if (!marketAccount || !signer) {
        return
      }

      const tokenAmount = new TokenAmount(
        parseUnits(amount, marketAccount.market.underlyingToken.decimals),
        marketAccount.market.underlyingToken,
      )

      await marketAccount.queueWithdrawal(tokenAmount)
    },
    onSuccess() {
      toastifyInfo("Withdrawal in progress... Check your wallet transaction")
      client.invalidateQueries({ queryKey: [GET_MARKET_ACCOUNT_KEY] })
    },
    onError(error) {
      console.log(error)
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

      await marketAccount.setAPR(amount)
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

export const useTerminateMarket = () => {
  const signer = useEthersSigner()
  const client = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      if (!signer) {
        return
      }

      await new Promise((resolve) => {
        setTimeout(resolve, 3000)
      })
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
