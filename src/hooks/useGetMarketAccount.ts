import { getMarketAccount, Market, Signer } from "@wildcatfi/wildcat-sdk"
import { useAccount } from "wagmi"

import { useQuery } from "@tanstack/react-query"
import { useEthersSigner } from "../modules/hooks"
import { useCurrentNetwork } from "./useCurrentNetwork"
import { useMarketAccount } from "./useMarketAccount"
import { TargetChainId } from "../config/networks"

export const GET_MARKET_ACCOUNT_KEY = "get-market-account"

export const useGetMarketAccount = (market: Market | undefined) => {
  const { address } = useAccount()
  const signer = useEthersSigner()
  const { isWrongNetwork } = useCurrentNetwork()

  return useMarketAccount({
    market,
    lender: address,
    provider: signer,
    enabled: !!market && !!address && !!signer && !isWrongNetwork,
  })
}

export const GET_BORROWER_MARKET_ACCOUNT_LEGACY_KEY =
  "get-borrower-market-account-legacy"

export const useGetMarketAccountForBorrowerLegacy = (
  market: Market | undefined,
) => {
  const { address } = useAccount()
  const signer = useEthersSigner()
  const { isWrongNetwork } = useCurrentNetwork()

  async function getMarketAccountFn() {
    const marketAccount = await getMarketAccount(
      TargetChainId,
      signer as Signer,
      address as string,
      market as Market,
    )
    return marketAccount
  }

  return useQuery({
    queryKey: [GET_BORROWER_MARKET_ACCOUNT_LEGACY_KEY, address, market],
    queryFn: getMarketAccountFn,
    enabled: !!market && !!address && !!signer && !isWrongNetwork,
    keepPreviousData: true,
    refetchOnMount: false,
  })
}
