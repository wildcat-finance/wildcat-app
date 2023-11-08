import { useMutation, useQueryClient } from "@tanstack/react-query"
import { MarketAccount, TokenAmount } from "@wildcatfi/wildcat-sdk"
import { parseUnits } from "ethers/lib/utils"
import { BigNumber } from "ethers"
import { useEthersSigner } from "../../../../modules/hooks"
import {
  toastifyError,
  toastifyInfo,
  toastifySuccess,
} from "../../../../components/toasts"
import { GET_MARKET_ACCOUNT_KEY } from "./useGetMarket"
import { useGetControllerContract } from "../../hooks/useGetController"
import { GET_AUTHORIZED_LENDERS_KEY } from "../Modals/RemoveLendersModal/hooks/useGetAuthorizedLenders"

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

export const useAuthorizedLenders = (lenders: string[], market: string) => {
  const { data: controller } = useGetControllerContract()
  const client = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      if (!lenders.length) {
        toastifyError("add lenders")
        return
      }
      await controller?.authorizeLenders(lenders)
      await controller?.updateLenderAuthorization(lenders[0], [market])
    },
    onSuccess() {
      toastifySuccess("lenders successfully authorized")
      client.invalidateQueries({ queryKey: [GET_MARKET_ACCOUNT_KEY] })
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
        toastifyError("select lenders")
        return
      }
      await controller?.deauthorizeLenders(authorizedLenders)
      await controller?.updateLenderAuthorization(authorizedLenders[0], [
        market,
      ])
    },
    onSuccess() {
      toastifySuccess("lenders successfully deauthorized")
      client.invalidateQueries({ queryKey: [GET_AUTHORIZED_LENDERS_KEY] })
    },
    onError(error) {
      toastifyError(`deauthorize lenders error: ${error}`)
    },
  })
}
