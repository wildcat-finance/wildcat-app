import { useQuery } from "@tanstack/react-query"
import { gql, useApolloClient } from "@apollo/client"
import {
  SubgraphWithdrawalBatch,
  SubgraphWithdrawalRequest,
} from "@wildcatfi/subgraph-hooks"
import { BigNumber } from "ethers"
import { useAccount } from "wagmi"

export const GET_LENDER_WITHDRAWALS_KEY = "get_lender_withdrawals"

const GET_LENDER_WITHDRAWALS = gql`
  query getLenderWithdrawals($marketId: String!, $lender: String!) {
    market(id: $marketId) {
      lenders(where: { address: $lender }) {
        withdrawals {
          isExpired
          scaledTotalAmount

          batch {
            id
            blockTimestamp
            transactionHash
            scaledAmount
            account {
              address
            }
          }
        }
      }
    }
  }
`

type QueryResponse = {
  market: {
    withdrawalBatches: {
      isExpired: SubgraphWithdrawalBatch["isExpired"]
      scaledTotalAmount: SubgraphWithdrawalBatch["scaledTotalAmount"]
      requests: SubgraphWithdrawalRequest[]
    }[]
  }
}

type QueryVariables = {
  marketId: string
}

export const useGetWithdrawals = (marketId: string) => {
  const client = useApolloClient()
  const { address } = useAccount()

  async function getLenderWithdrawals() {
    const res = await client.query<QueryResponse, QueryVariables>({
      query: GET_LENDER_WITHDRAWALS,
      variables: {
        marketId: marketId.toLowerCase(),
      },
    })

    let expiredScaledTotalAmount = BigNumber.from(0)
    let activeTotalAmount = BigNumber.from(0)
    const expiredBatches: SubgraphWithdrawalRequest[] = []
    const activeBatches: SubgraphWithdrawalRequest[] = []

    // eslint-disable-next-line array-callback-return
    res.data?.market?.withdrawalBatches.map((batch) => {
      // eslint-disable-next-line array-callback-return
      batch.requests.map((request) => {
        if (batch.isExpired) {
          expiredBatches.push(request)
        } else {
          activeBatches.push(request)
        }
      })

      if (batch.isExpired) {
        expiredScaledTotalAmount = expiredScaledTotalAmount.add(
          batch.scaledTotalAmount,
        )
      } else {
        activeTotalAmount = activeTotalAmount.add(batch.scaledTotalAmount)
      }
    })

    return {
      expiredScaledTotalAmount,
      activeTotalAmount,
      expiredBatches,
      activeBatches,
    }
  }

  return useQuery({
    queryKey: [GET_LENDER_WITHDRAWALS_KEY, marketId],
    queryFn: getLenderWithdrawals,
    enabled: !!address,
    refetchOnMount: false,
  })
}
