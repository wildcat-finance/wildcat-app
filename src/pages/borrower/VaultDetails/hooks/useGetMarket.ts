import { getMarket, Signer } from "@wildcatfi/wildcat-sdk"
import { useQuery } from "@tanstack/react-query"
import { useEthersSigner } from "../../../../modules/hooks"
import { useCurrentNetwork } from "../../../../hooks/useCurrentNetwork"

const GET_MARKET_KEY = "get-market"

export const useGetMarket = (marketAddress: string | undefined) => {
  const signer = useEthersSigner()
  const { isWrongNetwork } = useCurrentNetwork()

  async function getMarketByAddress() {
    const markets = await getMarket(marketAddress as string, signer as Signer)
    return markets || []
  }

  return useQuery({
    queryKey: [GET_MARKET_KEY, marketAddress],
    queryFn: getMarketByAddress,
    enabled: !!marketAddress && !!signer && !isWrongNetwork,
    refetchOnMount: false,
  })
}
