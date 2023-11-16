import { useQuery } from "@tanstack/react-query"
import {
  Market,
  MarketAccount,
  SignerOrProvider,
  TwoStepQueryHookResult,
  SubgraphClient,
  getLensContract,
} from "@wildcatfi/wildcat-sdk"
import {
  GetLenderAccountForMarketDocument,
  SubgraphGetLenderAccountForMarketQuery,
  SubgraphGetLenderAccountForMarketQueryVariables,
  SubgraphGetMarketQueryVariables,
} from "@wildcatfi/wildcat-sdk/dist/gql/graphql"

export const GET_MARKET_ACCOUNT_KEY = "get-market-account"

export type UseLenderProps = {
  market: Market | undefined
  lender: string | undefined
  provider: SignerOrProvider | undefined
  enabled: boolean
} & Omit<SubgraphGetMarketQueryVariables, "market">

export function useMarketAccount({
  market,
  lender,
  provider,
  enabled,
  ...filters
}: UseLenderProps): TwoStepQueryHookResult<MarketAccount | undefined> {
  const marketAddress = market?.address.toLowerCase()
  const lenderAddress = lender?.toLowerCase()
  async function queryMarketAccount() {
    const result = await SubgraphClient.query<
      SubgraphGetLenderAccountForMarketQuery,
      SubgraphGetLenderAccountForMarketQueryVariables
    >({
      query: GetLenderAccountForMarketDocument,
      variables: {
        market: marketAddress as string,
        lender: lenderAddress as string,
        ...filters,
      },
    })
    return MarketAccount.fromSubgraphAccountData(
      market as Market,
      result.data.market!.lenders[0]!,
    )
  }

  const {
    data,
    isLoading: isLoadingInitial,
    refetch: refetchInitial,
    isError: isErrorInitial,
    failureReason: errorInitial,
  } = useQuery({
    queryKey: [GET_MARKET_ACCOUNT_KEY, "initial", marketAddress, lenderAddress],
    queryFn: queryMarketAccount,
    enabled: !!market && !!lenderAddress && !!provider && enabled,
    refetchOnMount: false,
  })
  async function updateMarketAccount() {
    if (!data || !provider) throw Error()
    const lens = getLensContract(provider)
    const update = await lens.getMarketDataWithLenderStatus(
      lenderAddress as string,
      marketAddress as string,
    )
    data.updateWith(update.lenderStatus)
    data.market.updateWith(update.market)
    return data
  }

  const {
    data: updatedLender,
    isLoading: isLoadingUpdate,
    isPaused: isPendingUpdate,
    refetch: refetchUpdate,
    isError: isErrorUpdate,
    failureReason: errorUpdate,
  } = useQuery({
    queryKey: [GET_MARKET_ACCOUNT_KEY, "update", marketAddress, lenderAddress],
    queryFn: updateMarketAccount,
    enabled: !!data,
    refetchOnMount: false,
  })

  return {
    data: updatedLender ?? data,
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
