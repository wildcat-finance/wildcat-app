import { useQuery } from "@tanstack/react-query"
import {
  GetMarketsForBorrowerDocument,
  SubgraphGetMarketsForBorrowerQuery,
  SubgraphGetMarketsForBorrowerQueryVariables,
} from "@wildcatfi/wildcat-sdk/dist/gql/graphql"
import {
  Market,
  TwoStepQueryHookResult,
  SubgraphClient,
  getLensContract,
  SignerOrProvider,
} from "@wildcatfi/wildcat-sdk"
import { useMemo } from "react"
import { logger } from "@wildcatfi/wildcat-sdk/dist/utils/logger"

export type MarketsForBorrowerProps = {
  borrower: string | undefined
  provider: SignerOrProvider | undefined
  enabled: boolean
} & Omit<SubgraphGetMarketsForBorrowerQueryVariables, "borrower">

export function useMarketsForBorrower({
  borrower: _borrower,
  provider,
  enabled,
  ...filters
}: MarketsForBorrowerProps): TwoStepQueryHookResult<Market[]> {
  const borrower = _borrower?.toLowerCase()

  async function queryMarketsForBorrower() {
    const result = await SubgraphClient.query<
      SubgraphGetMarketsForBorrowerQuery,
      SubgraphGetMarketsForBorrowerQueryVariables
    >({
      query: GetMarketsForBorrowerDocument,
      variables: { borrower: borrower as string, ...filters },
    })
    return (
      result.data.controllers[0].markets.map((market) =>
        Market.fromSubgraphMarketData(provider as SignerOrProvider, market),
      ) ?? []
    )
  }

  const {
    data,
    isLoading: isLoadingInitial,
    refetch: refetchInitial,
    isError: isErrorInitial,
    failureReason: errorInitial,
  } = useQuery({
    queryKey: ["marketsForBorrower/initial", borrower],
    queryFn: queryMarketsForBorrower,
    enabled: !!borrower && !!provider && enabled,
    refetchOnMount: false,
  })

  const markets = data ?? []
  async function updateMarkets() {
    const lens = getLensContract(provider as SignerOrProvider)
    const updatedMarkets = await lens.getMarketsData(
      markets.map((x) => x.address),
    )
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < markets.length; i++) {
      const market = markets[i]
      const update = updatedMarkets[i]
      market.updateWith(update)
    }
    logger.debug(`Got ${markets.length} market updates`)
    return markets
  }

  const updateQueryKeys = useMemo(
    () => markets.map((b) => [b.address]),
    [markets],
  )

  const {
    data: updatedMarkets,
    isLoading: isLoadingUpdate,
    refetch: refetchUpdate,
    isPaused: isPendingUpdate,
    isError: isErrorUpdate,
    failureReason: errorUpdate,
  } = useQuery({
    queryKey: ["marketsForBorrower/update", updateQueryKeys],
    queryFn: updateMarkets,
    enabled: !!data,
    refetchOnMount: false,
  })

  return {
    data: updatedMarkets ?? markets,
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
