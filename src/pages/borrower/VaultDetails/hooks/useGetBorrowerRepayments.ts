import { useQuery } from "@tanstack/react-query"
import { gql, useApolloClient } from "@apollo/client"
import { SubgraphDebtRepaid } from "@wildcatfi/subgraph-hooks"

export const GET_BORROWER_REPAYMENTS_KEY = "get_borrower_repayments"

const GET_BORROWER_REPAYMENTS = gql`
  query getBorrowerRepayments($marketId: String!, $from: Int!, $to: Int!) {
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

export const useGetBorrowerRepayments = (
  marketId: string,
  fromTimestamp: number,
  toTimestamp: number,
) => {
  const client = useApolloClient()

  async function getBorrowerRepayments() {
    const res = await client.query<QueryResponse, QueryVariables>({
      query: GET_BORROWER_REPAYMENTS,
      variables: {
        marketId: marketId.toLowerCase(),
        from: fromTimestamp,
        to: toTimestamp,
      },
    })

    return res.data?.market?.repaymentRecords
  }

  return useQuery({
    queryKey: [
      GET_BORROWER_REPAYMENTS_KEY,
      marketId,
      toTimestamp,
      fromTimestamp,
    ],
    queryFn: getBorrowerRepayments,
    refetchOnMount: false,
  })
}
