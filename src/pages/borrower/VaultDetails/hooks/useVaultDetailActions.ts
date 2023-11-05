import { useMutation, useQueryClient } from "@tanstack/react-query"
import { MarketAccount, TokenAmount } from "@wildcatfi/wildcat-sdk"
import { parseUnits } from "ethers/lib/utils"
import { BigNumber } from "ethers"
import { useEthersSigner } from "../../../../modules/hooks"
import { toastifyInfo } from "../../../../components/toasts"
import { GET_MARKET_ACCOUNT_KEY } from "./useGetMarket"

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
