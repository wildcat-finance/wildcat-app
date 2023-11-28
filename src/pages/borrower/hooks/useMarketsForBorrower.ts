import { useQuery } from "@tanstack/react-query"
import {
  GetMarketsForBorrowerDocument,
  SubgraphGetMarketsForBorrowerQuery,
  SubgraphGetMarketsForBorrowerQueryVariables,
} from "@wildcatfi/wildcat-sdk/dist/gql/graphql"
import {
  Market,
  SubgraphClient,
  getLensContract,
  SignerOrProvider,
} from "@wildcatfi/wildcat-sdk"
import { logger } from "@wildcatfi/wildcat-sdk/dist/utils/logger"
import { useAccount } from "wagmi"
import { useEthersSigner } from "../../../modules/hooks"
import { useCurrentNetwork } from "../../../hooks/useCurrentNetwork"
import { POLLING_INTERVAL } from "../../../config/polling"

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

  async function queryMarketsForBorrower() {
    const result = await SubgraphClient.query<
      SubgraphGetMarketsForBorrowerQuery,
      SubgraphGetMarketsForBorrowerQueryVariables
    >({
      query: GetMarketsForBorrowerDocument,
      variables: { borrower: borrower as string, ...filters },
      fetchPolicy: "network-only",
    })
    return (
      result.data.controllers[0].markets.map((market) =>
        Market.fromSubgraphMarketData(provider as SignerOrProvider, market),
      ) ?? []
    )
  }

  async function updateMarkets(markets: Market[]) {
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

  async function getMarketsForBorrower() {
    const subgrpahMarkets = await queryMarketsForBorrower()
    return updateMarkets(subgrpahMarkets)
  }

  return useQuery({
    queryKey: [GET_BORROWER_MARKETS_LIST_KEY],
    queryFn: getMarketsForBorrower,
    refetchInterval: POLLING_INTERVAL,
    enabled,
    refetchOnMount: false,
  })
}

export const useMarketsForBorrower = () => {
  const { address } = useAccount()
  const signer = useEthersSigner()
  const { isWrongNetwork } = useCurrentNetwork()

  return useMarketsForBorrowerQuery({
    borrower: address,
    provider: signer,
    enabled: !!address && !!signer && !isWrongNetwork,
  })
}
