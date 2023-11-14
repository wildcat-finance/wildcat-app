import { useGetAuthorizedLendersByMarketLazyQuery } from "@wildcatfi/subgraph-hooks"
import { useQuery } from "@tanstack/react-query"

export const GET_LENDERS_BY_MARKET_KEY = "get-authorised-lenders-by-market"
export const useGetAuthorisedLenders = (marketAddress: string | undefined) => {
  const [fetch] = useGetAuthorizedLendersByMarketLazyQuery()

  const getLenders = async () => {
    const res = await fetch({ variables: { market: marketAddress as string } })
    return res.data?.market?.controller.authorizedLenders
  }

  return useQuery({
    queryKey: [GET_LENDERS_BY_MARKET_KEY, marketAddress],
    queryFn: getLenders,
    enabled: !!marketAddress,
    refetchOnMount: false,
  })
}
