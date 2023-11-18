/* eslint-disable camelcase */
import { useAccount } from "wagmi"

import { useQuery } from "@tanstack/react-query"
import {
  GetAccountsWhereLenderAuthorizedOrActiveDocument,
  SubgraphBorrow_OrderBy,
  SubgraphDebtRepaid_OrderBy,
  SubgraphDeposit_OrderBy,
  SubgraphGetAccountsWhereLenderAuthorizedOrActiveQuery,
  SubgraphGetAccountsWhereLenderAuthorizedOrActiveQueryVariables,
  SubgraphOrderDirection,
} from "@wildcatfi/wildcat-sdk/dist/gql/graphql"
import { useMemo } from "react"
import {
  SignerOrProvider,
  Market,
  MarketAccount,
  SubgraphClient,
  getLensContract,
  TwoStepQueryHookResult,
} from "@wildcatfi/wildcat-sdk"
import { logger } from "@wildcatfi/wildcat-sdk/dist/utils/logger"
import { useCurrentNetwork } from "../../../../hooks/useCurrentNetwork"
import { useEthersSigner } from "../../../../modules/hooks"

export type LenderMarketsQueryProps = {
  numDeposits?: number
  skipDeposits?: number
  orderDeposits?: SubgraphDeposit_OrderBy
  directionDeposits?: SubgraphOrderDirection
  numWithdrawals?: number
  skipWithdrawals?: number
  numBorrows?: number
  skipBorrows?: number
  orderBorrows?: SubgraphBorrow_OrderBy
  directionBorrows?: SubgraphOrderDirection
  numRepayments?: number
  skipRepayments?: number
  orderRepayments?: SubgraphDebtRepaid_OrderBy
  directionRepayments?: SubgraphOrderDirection
}

export const GET_LENDERS_ACCOUNTS_KEY = "lenders_accounts_list"

export function useLendersMarkets({
  ...filters
}: LenderMarketsQueryProps = {}): TwoStepQueryHookResult<MarketAccount[]> {
  const provider = useEthersSigner()
  const { isWrongNetwork } = useCurrentNetwork()
  const { address } = useAccount()

  const lender = address?.toLowerCase()
  async function queryLenders() {
    logger.debug(`Getting lenders...`)
    const result = await SubgraphClient.query<
      SubgraphGetAccountsWhereLenderAuthorizedOrActiveQuery,
      SubgraphGetAccountsWhereLenderAuthorizedOrActiveQueryVariables
    >({
      query: GetAccountsWhereLenderAuthorizedOrActiveDocument,
      variables: {
        lender: lender as string,
        ...filters,
        numWithdrawals: 1,
      },
    })
    logger.debug(`Got ${result.data.lenderAccounts.length} lenders...`)
    return result.data.lenderAccounts.map((account) => {
      const market = Market.fromSubgraphMarketData(
        provider as SignerOrProvider,
        account.market,
      )
      return MarketAccount.fromSubgraphAccountData(market, account)
    })
  }

  const {
    data,
    isLoading: isLoadingInitial,
    refetch: refetchInitial,
    isError: isErrorInitial,
    failureReason: errorInitial,
  } = useQuery({
    queryKey: [GET_LENDERS_ACCOUNTS_KEY, "initial", lender],
    queryFn: queryLenders,
    enabled: !!provider && !isWrongNetwork && !!lender,
    refetchOnMount: false,
  })

  const accounts = data ?? []

  async function getLenderUpdates() {
    logger.debug(`Getting lender updates...`)
    const lens = getLensContract(provider as SignerOrProvider)
    const accountUpdates = await lens.getMarketsDataWithLenderStatus(
      lender as string,
      accounts.map((x) => x.market.address),
    )
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < accounts.length; i++) {
      const account = accounts[i]
      const update = accountUpdates[i]
      account.market.updateWith(update.market)
      account.updateWith(update.lenderStatus)
    }
    logger.debug(`Got lender updates: ${accounts.length}`)
    return accounts
  }

  const updateQueryKeys = useMemo(
    () => accounts.map((b) => [b.market.address]),
    [accounts],
  )

  const {
    data: updatedLenders,
    isLoading: isLoadingUpdate,
    isPaused: isPendingUpdate,
    refetch: refetchUpdate,
    isError: isErrorUpdate,
    failureReason: errorUpdate,
  } = useQuery({
    queryKey: [GET_LENDERS_ACCOUNTS_KEY, "update", updateQueryKeys],
    queryFn: getLenderUpdates,
    enabled: !!data,
    refetchOnMount: false,
  })

  return {
    data: updatedLenders ?? accounts,
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
