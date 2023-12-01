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
  getLensContract,
  TwoStepQueryHookResult,
} from "@wildcatfi/wildcat-sdk"
import { logger } from "@wildcatfi/wildcat-sdk/dist/utils/logger"
import { useCurrentNetwork } from "../../../../hooks/useCurrentNetwork"
import { useEthersSigner } from "../../../../modules/hooks"
import { SubgraphClient } from "../../../../config/subgraph"
import { TargetChainId } from "../../../../config/networks"
import { POLLING_INTERVAL } from "../../../../config/polling"

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
      fetchPolicy: "network-only",
    })
    logger.debug(
      `Got ${result.data.lenderAccounts.length} existing lender accounts...`,
    )

    const lenderAccounts = result.data.lenderAccounts.map((account) => {
      const market = Market.fromSubgraphMarketData(
        TargetChainId,
        provider as SignerOrProvider,
        account.market,
      )
      return MarketAccount.fromSubgraphAccountData(market, account)
    })
    result.data.controllerAuthorizations.forEach((controller) => {
      const markets = controller.controller.markets.filter((market) => {
        const marketAccount = lenderAccounts.find(
          (account) =>
            account.market.address.toLowerCase() === market.id.toLowerCase(),
        )
        return !marketAccount
      })
      logger.debug(`Got markets without account: ${markets.length}!`)
      markets.forEach((marketData) => {
        const market = Market.fromSubgraphMarketData(
          TargetChainId,
          provider as SignerOrProvider,
          marketData,
        )
        const account = MarketAccount.fromMarketDataOnly(
          market,
          lender as string,
          true,
        )
        lenderAccounts.push(account)
      })
    })
    logger.debug(`Got ${lenderAccounts.length} lender accounts...`)
    return lenderAccounts
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
    refetchInterval: POLLING_INTERVAL,
    enabled: !!provider && !isWrongNetwork && !!lender,
    refetchOnMount: false,
  })

  const accounts = data ?? []

  async function getLenderUpdates() {
    logger.debug(`Getting lender updates...`)
    const lens = getLensContract(TargetChainId, provider as SignerOrProvider)
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
