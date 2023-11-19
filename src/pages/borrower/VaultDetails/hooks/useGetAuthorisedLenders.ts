import { useQuery } from "@tanstack/react-query"
import { SubgraphClient } from "@wildcatfi/wildcat-sdk"
import {
  GetAuthorizedLendersByMarketDocument,
  SubgraphGetAuthorizedLendersByMarketQuery,
  SubgraphGetAuthorizedLendersByMarketQueryVariables,
} from "@wildcatfi/wildcat-sdk/dist/gql/graphql"
import { logger } from "@wildcatfi/wildcat-sdk/dist/utils/logger"

export const GET_LENDERS_BY_MARKET_KEY = "get-authorised-lenders-by-market"
export const useGetAuthorisedLendersByMarket = (
  marketAddress: string | undefined,
) => {
  const getAuthorisedLendersByMarket = async () => {
    if (!marketAddress) throw Error()

    logger.debug(`Getting authorised lenders batches...`)

    const res = await SubgraphClient.query<
      SubgraphGetAuthorizedLendersByMarketQuery,
      SubgraphGetAuthorizedLendersByMarketQueryVariables
    >({
      query: GetAuthorizedLendersByMarketDocument,
      variables: { market: marketAddress?.toLowerCase() },
    })

    logger.debug(
      `Got authorised lenders : ${res.data.market?.controller.authorizedLenders}`,
    )

    return res.data?.market?.controller.authorizedLenders
  }

  return useQuery({
    queryKey: [GET_LENDERS_BY_MARKET_KEY, marketAddress],
    queryFn: getAuthorisedLendersByMarket,
    enabled: !!marketAddress,
    refetchOnMount: false,
  })
}
