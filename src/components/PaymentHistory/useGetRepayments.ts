import { useQuery } from "@tanstack/react-query"
import { gql, useApolloClient } from "@apollo/client"
import { SubgraphDebtRepaid } from "@wildcatfi/subgraph-hooks"

export const GET_REPAYMENTS_KEY = "get_repayments"

const GET_REPAYMENTS = gql`
  query getRepayments($marketId: String!, $from: Int!, $to: Int!) {
    market(id: $marketId) {
      repaymentRecords(
        where: { blockTimestamp_gte: $from, blockTimestamp_lte: $to }
      ) {
        assetAmount
        from
        transactionHash
        blockTimestamp
      }
    }
  }
`

type QueryResponse = {
  market: {
    repaymentRecords: SubgraphDebtRepaid[]
  }
}

type QueryVariables = {
  marketId: string
  from: number
  to: number
}

export const useGetRepayments = (
  marketId: string,
  fromTimestamp: number,
  toTimestamp: number,
) => {
  const client = useApolloClient()

  async function getRepayments() {
    const res = await client.query<QueryResponse, QueryVariables>({
      query: GET_REPAYMENTS,
      variables: {
        marketId: marketId.toLowerCase(),
        from: fromTimestamp,
        to: toTimestamp,
      },
    })

    return res.data?.market?.repaymentRecords
  }

  return useQuery({
    queryKey: [GET_REPAYMENTS_KEY, marketId, toTimestamp, fromTimestamp],
    queryFn: getRepayments,
    refetchOnMount: false,
  })
}
