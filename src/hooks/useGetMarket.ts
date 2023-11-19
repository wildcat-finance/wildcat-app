import { useQuery } from "@tanstack/react-query"
import { Market, SubgraphClient, getLensContract } from "@wildcatfi/wildcat-sdk"
import {
  GetMarketDocument,
  SubgraphGetMarketQuery,
  SubgraphGetMarketQueryVariables,
} from "@wildcatfi/wildcat-sdk/dist/gql/graphql"
import { useEthersSigner } from "../modules/hooks"
import { useCurrentNetwork } from "./useCurrentNetwork"

export const GET_MARKET_KEY = "get-market"

export type UseMarketProps = {
  marketAddress: string | undefined
} & Partial<Omit<SubgraphGetMarketQueryVariables, "market">>

export function useGetMarket({ marketAddress, ...filters }: UseMarketProps) {
  const signer = useEthersSigner()
  const { isWrongNetwork } = useCurrentNetwork()
  const marketAddressFormatted = marketAddress?.toLowerCase()

  async function queryMarket() {
    if (!marketAddressFormatted || !signer) throw Error()

    const result = await SubgraphClient.query<
      SubgraphGetMarketQuery,
      SubgraphGetMarketQueryVariables
    >({
      query: GetMarketDocument,
      variables: {
        market: marketAddressFormatted,
        ...filters,
      },
    })

    return Market.fromSubgraphMarketData(signer, result.data.market!)
  }

  async function updateMarket(market: Market | undefined) {
    if (!market || !marketAddress || !signer) throw Error()

    const lens = getLensContract(signer)
    const update = await lens.getMarketData(marketAddress)
    market.updateWith(update)

    return market
  }

  async function queryFn() {
    const marketFromSubgraph = await queryMarket()
    return updateMarket(marketFromSubgraph)
  }

  return useQuery({
    queryKey: [GET_MARKET_KEY, marketAddress],
    queryFn,
    enabled: !!marketAddress || !signer || isWrongNetwork,
    refetchOnMount: false,
  })
}
