import { useQuery } from "@tanstack/react-query"
import {
  GetMarketsForBorrowerDocument,
  SubgraphGetMarketsForBorrowerQuery,
  SubgraphGetMarketsForBorrowerQueryVariables,
  SubgraphGetMarketsForAllBorrowersQuery,
  SubgraphGetMarketsForAllBorrowersQueryVariables,
  GetMarketsForAllBorrowersDocument,
} from "@wildcatfi/wildcat-sdk/dist/gql/graphql"
import {
  Market,
  getLensContract,
  SignerOrProvider,
} from "@wildcatfi/wildcat-sdk"
import { logger } from "@wildcatfi/wildcat-sdk/dist/utils/logger"
import { POLLING_INTERVAL } from "../../../config/polling"
import { TargetChainId } from "../../../config/networks"
import { SubgraphClient } from "../../../config/subgraph"
import { useEthersProvider } from "../../../modules/hooks/useEthersSigner"

export const GET_BORROWER_MARKETS_LIST_KEY = "get-borrower-markets-list"

export type MarketsForBorrowerProps = {
  borrower: string | undefined
  provider: SignerOrProvider | undefined
  enabled: boolean
} & Omit<SubgraphGetMarketsForBorrowerQueryVariables, "borrower">

export function useMarketsForBorrowerQuery({
  borrower: _borrower,
  provider,
  enabled,
  ...filters
}: MarketsForBorrowerProps) {
  const borrower = _borrower?.toLowerCase()

  async function queryMarketsForAllBorrowers() {
    const result = await SubgraphClient.query<
      SubgraphGetMarketsForAllBorrowersQuery,
      SubgraphGetMarketsForAllBorrowersQueryVariables
    >({
      query: GetMarketsForAllBorrowersDocument,
      variables: { ...filters },
      fetchPolicy: "network-only",
    })

    return (
      result.data.markets.map((market) =>
        Market.fromSubgraphMarketData(
          TargetChainId,
          provider as SignerOrProvider,
          market,
        ),
      ) ?? []
    )
  }

  async function queryMarketsForBorrower() {
    const result = await SubgraphClient.query<
      SubgraphGetMarketsForBorrowerQuery,
      SubgraphGetMarketsForBorrowerQueryVariables
    >({
      query: GetMarketsForBorrowerDocument,
      variables: { borrower: borrower as string, ...filters },
      fetchPolicy: "network-only",
    })

    const controller = result.data.controllers[0]
    if (controller) {
      return (
        controller.markets.map((market) =>
          Market.fromSubgraphMarketData(
            TargetChainId,
            provider as SignerOrProvider,
            market,
          ),
        ) ?? []
      )
    }

    return []
  }

  async function updateMarkets(markets: Market[]) {
    const lens = getLensContract(TargetChainId, provider as SignerOrProvider)
    const updatedMarkets = markets.map(async (market) => {
      const update = await lens.getMarketData(market.address)
      await market.updateWith(update)
    })
    await Promise.all(updateMarkets)
    logger.debug(`Got ${markets.length} market updates`)
    return markets
  }

  async function getMarketsForBorrower() {
    const subgraphMarkets = await (borrower
      ? queryMarketsForBorrower
      : queryMarketsForAllBorrowers)()
    return updateMarkets(subgraphMarkets)
  }

  return useQuery({
    queryKey: [GET_BORROWER_MARKETS_LIST_KEY, borrower],
    queryFn: getMarketsForBorrower,
    refetchInterval: POLLING_INTERVAL,
    enabled,
    refetchOnMount: false,
  })
}

export const useMarketsForBorrower = (borrower?: string) => {
  const { isWrongNetwork, provider, signer } = useEthersProvider()

  const signerOrProvider = signer ?? provider
  console.log(
    `logging from useMarketsForBorrower.ts: ${borrower} | have provider: ${!!provider} | isWrongNetwork: ${isWrongNetwork}`,
  )

  return useMarketsForBorrowerQuery({
    borrower,
    provider: signerOrProvider,
    enabled: !!signerOrProvider && !isWrongNetwork,
  })
}
