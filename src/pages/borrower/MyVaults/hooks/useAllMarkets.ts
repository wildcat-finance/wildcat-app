import { useQuery } from "@tanstack/react-query"
import { getAllMarkets, Signer } from "@wildcatfi/wildcat-sdk"
import { useEthersSigner } from "../../../../modules/hooks"
import { useCurrentNetwork } from "../../../../hooks/useCurrentNetwork"

export const GET_MARKETS_KEY = "my_markets_list"
export const useAllMarkets = () => {
  const signer = useEthersSigner()
  const { isWrongNetwork } = useCurrentNetwork()
  async function getMarkets() {
    const markets = await getAllMarkets(signer as Signer)
    return markets || []
  }
  return useQuery({
    queryKey: [GET_MARKETS_KEY],
    queryFn: getMarkets,
    enabled: !!signer && !isWrongNetwork,
    refetchOnMount: false,
  })
}
