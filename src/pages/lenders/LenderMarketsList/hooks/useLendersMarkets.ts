/* eslint-disable camelcase */
import { useQuery } from "@tanstack/react-query"
import {
  GetAllMarketsForLenderViewDocument,
  SubgraphBorrow_OrderBy,
  SubgraphDebtRepaid_OrderBy,
  SubgraphDeposit_OrderBy,
  SubgraphGetAllMarketsForLenderViewQuery,
  SubgraphGetAllMarketsForLenderViewQueryVariables,
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
import { constants } from "ethers"
import { SubgraphClient } from "../../../../config/subgraph"
import { TargetChainId } from "../../../../config/networks"
import { POLLING_INTERVAL } from "../../../../config/polling"
import { useEthersProvider } from "../../../../modules/hooks/useEthersSigner"

export type LenderMarketsQueryProps = {
  lenderAddress?: string
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
  const { isWrongNetwork, provider, signer, address } = useEthersProvider()
  const signerOrProvider = signer ?? provider

  const lender = address?.toLowerCase()

  async function queryMarketsForLender() {
    logger.debug(`Getting all markets...`)
    const {
      data: {
        markets: _markets,
        controllerAuthorizations,
        lenderAccounts: _lenderAccounts,
      },
    } = await SubgraphClient.query<
      SubgraphGetAllMarketsForLenderViewQuery,
      SubgraphGetAllMarketsForLenderViewQueryVariables
    >({
      query: GetAllMarketsForLenderViewDocument,
      variables: {
        ...filters,
        lender,
      },
      fetchPolicy: "network-only",
    })
    const authorizedMarkets = controllerAuthorizations
      .map((auth) => auth.controller.markets)
      .flat()
    const markets = _markets.map((market) =>
      Market.fromSubgraphMarketData(
        TargetChainId,
        signerOrProvider as SignerOrProvider,
        market,
        address,
      ),
    )
    const lenderAccounts = markets.map((market) => {
      const lenderAccount = _lenderAccounts.find(
        (account) =>
          account.market.id.toLowerCase() === market.address.toLowerCase(),
      )
      if (lenderAccount) {
        return MarketAccount.fromSubgraphAccountData(market, lenderAccount)
      }
      const authorization = authorizedMarkets.find(
        (auth) => auth.id.toLowerCase() === market.address.toLowerCase(),
      )
      if (authorization) {
        return MarketAccount.fromMarketDataOnly(market, lender as string, true)
      }
      return MarketAccount.fromMarketDataOnly(
        market,
        lender ?? constants.AddressZero,
        false,
      )
    })
    lenderAccounts.sort(
      (a, b) =>
        (b.market.deployedEvent?.blockNumber ?? 0) -
        (a.market.deployedEvent?.blockNumber ?? 0),
    )
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
    queryFn: queryMarketsForLender,
    refetchInterval: POLLING_INTERVAL,
    enabled: !!signerOrProvider && !isWrongNetwork,
    refetchOnMount: false,
  })

  const accounts = data ?? []

  async function getLenderUpdates() {
    logger.debug(`Getting lender updates...`)
    const lens = getLensContract(
      TargetChainId,
      signerOrProvider as SignerOrProvider,
    )
    if (lender) {
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
      logger.debug(`getLenderUpdates:: Got lender updates: ${accounts.length}`)
    } else {
      const marketUpdates = await lens.getMarketsData(
        accounts.map((x) => x.market.address),
      )
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < accounts.length; i++) {
        const account = accounts[i]
        const update = marketUpdates[i]
        account.market.updateWith(update)
      }
      logger.debug(`getLenderUpdates:: Got market updates: ${accounts.length}`)
    }
    return accounts
  }

  const updateQueryKeys = useMemo(
    () => accounts.map((b) => [b.market.address, b.account]),
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
