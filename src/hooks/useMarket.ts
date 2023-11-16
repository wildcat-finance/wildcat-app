import { useQuery } from "@tanstack/react-query"
import {
  Market,
  SignerOrProvider,
  SubgraphClient,
  getLensContract,
  TwoStepQueryHookResult,
} from "@wildcatfi/wildcat-sdk"
import {
  GetMarketDocument,
  SubgraphGetMarketQuery,
  SubgraphGetMarketQueryVariables,
} from "@wildcatfi/wildcat-sdk/dist/gql/graphql"

const GET_MARKET_KEY = "get-market"

export type UseMarketProps = {
  address: string | undefined
  provider: SignerOrProvider | undefined
  enabled: boolean
} & Omit<SubgraphGetMarketQueryVariables, "market">

export function useMarket({
  address,
  provider,
  enabled,
  ...filters
}: UseMarketProps): TwoStepQueryHookResult<Market | undefined> {
  const marketAddress = address?.toLowerCase()
  async function queryMarket() {
    if (!marketAddress || !provider) throw Error()
    const result = await SubgraphClient.query<
      SubgraphGetMarketQuery,
      SubgraphGetMarketQueryVariables
    >({
      query: GetMarketDocument,
      variables: {
        market: marketAddress,
        ...filters,
      },
    })
    return Market.fromSubgraphMarketData(provider, result.data.market!)
  }

  const {
    data,
    isLoading: isLoadingInitial,
    refetch: refetchInitial,
    isError: isErrorInitial,
    failureReason: errorInitial,
  } = useQuery({
    queryKey: [GET_MARKET_KEY, "initial", marketAddress],
    queryFn: queryMarket,
    enabled: !!marketAddress && !!provider && enabled,
    refetchOnMount: false,
  })
  async function updateMarket() {
    if (!data || !marketAddress || !provider) throw Error()
    const lens = getLensContract(provider)
    const update = await lens.getMarketData(marketAddress)
    data.updateWith(update)
    return data
  }

  const {
    data: updatedMarket,
    isLoading: isLoadingUpdate,
    isPaused: isPendingUpdate,
    refetch: refetchUpdate,
    isError: isErrorUpdate,
    failureReason: errorUpdate,
  } = useQuery({
    queryKey: [GET_MARKET_KEY, "update", marketAddress],
    queryFn: updateMarket,
    enabled: !!data,
    refetchOnMount: false,
  })

  return {
    data: updatedMarket ?? data,
    isLoadingInitial,
    isErrorInitial,
    errorInitial: errorInitial as Error | null,
    refetchInitial,
    isLoadingUpdate,
    isPendingUpdate,
    isErrorUpdate,
    errorUpdate: errorUpdate as Error | null,
    refetchUpdate,
  }
}
