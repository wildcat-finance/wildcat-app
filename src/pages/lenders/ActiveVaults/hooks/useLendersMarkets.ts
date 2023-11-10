import { useQuery } from "@tanstack/react-query"
import { getAllMarketAccountsForLender, Signer } from "@wildcatfi/wildcat-sdk"
import { useAccount } from "wagmi"
import { useEthersSigner } from "../../../../modules/hooks"
import { useCurrentNetwork } from "../../../../hooks/useCurrentNetwork"

export const GET_LENDERS_ACCOUNTS_KEY = "lenders_accounts_list"

export const useLendersMarkets = () => {
  const signer = useEthersSigner()
  const { isWrongNetwork } = useCurrentNetwork()
  const { address } = useAccount()

  async function getLendersMarkets() {
    if (!signer || !address) {
      return []
    }

    const accounts = await getAllMarketAccountsForLender(
      signer as Signer,
      address,
    )

    return accounts || []
  }

  return useQuery({
    queryKey: [GET_LENDERS_ACCOUNTS_KEY],
    queryFn: getLendersMarkets,
    enabled: !!signer && !isWrongNetwork,
    refetchOnMount: false,
  })
}
