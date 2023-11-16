import { useQuery } from "@tanstack/react-query"
import {
  Market,
  SubgraphClient,
  getLensContract,
  WithdrawalBatch,
  TwoStepQueryHookResult,
} from "@wildcatfi/wildcat-sdk"
import {
  GetAllPendingWithdrawalBatchesForMarketDocument,
  SubgraphGetAllPendingWithdrawalBatchesForMarketQuery,
  SubgraphGetAllPendingWithdrawalBatchesForMarketQueryVariables,
} from "@wildcatfi/wildcat-sdk/dist/gql/graphql"
import { logger } from "@wildcatfi/wildcat-sdk/dist/utils/logger"
import { useMemo } from "react"

export function useGetMarketWithdrawals({
  market,
  enabled,
}: {
  market: Market | undefined
  enabled: boolean
}): TwoStepQueryHookResult<WithdrawalBatch[]> {
  const address = market?.address.toLowerCase()
  async function getAllPendingWithdrawalBatches() {
    if (!address || !market) throw Error()
    logger.debug(`Getting withdrawal batches...`)
    const result = await SubgraphClient.query<
      SubgraphGetAllPendingWithdrawalBatchesForMarketQuery,
      SubgraphGetAllPendingWithdrawalBatchesForMarketQueryVariables
    >({
      query: GetAllPendingWithdrawalBatchesForMarketDocument,
      variables: { market: address },
    })
    logger.debug(
      `Got withdrawal batches: ${result.data.market?.withdrawalBatches.length}`,
    )
    return (
      result.data.market?.withdrawalBatches.map((batch) =>
        WithdrawalBatch.fromSubgraphWithdrawalBatch(market, batch),
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
    queryKey: ["allPendingWithdrawalBatches/initial", address],
    queryFn: getAllPendingWithdrawalBatches,
    enabled: !!market && enabled,
    refetchOnMount: false,
  })

  const batches = data ?? []
  async function getUpdatedBatches() {
    if (!address || !market) throw Error()
    logger.debug(`Getting batch updates...`)
    const lens = getLensContract(market.provider)
    const batchUpdates = await lens.getWithdrawalBatchesData(
      address,
      batches.map((x) => x.expiry),
    )
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i]
      const update = batchUpdates[i]
      logger.debug(
        `Batch last update: ${batch.lastUpdatedTimestamp} | Market last update: ${market.lastInterestAccruedTimestamp}`,
      )
      logger.debug(
        `Previous batch total value: ${batch.normalizedTotalAmount.format(
          18,
          true,
        )}`,
      )
      logger.debug(
        `Previous batch interest: ${batch.totalInterestEarned?.format(
          18,
          true,
        )}`,
      )
      batch.applyLensUpdate(update)
      logger.debug(
        `New batch total value: ${batch.normalizedTotalAmount.format(
          18,
          true,
        )}`,
      )
      logger.debug(
        `New batch interest: ${batch.totalInterestEarned?.format(18, true)}`,
      )
    }
    logger.debug(`Got withdrawal batch updates: ${batches.length}`)
    return batches
  }

  const updateQueryKeys = useMemo(
    () => batches.map((b) => [b.expiry]),
    [batches],
  )

  const {
    data: updatedBatches,
    isLoading: isLoadingUpdate,
    isPaused: isPendingUpdate,
    refetch: refetchUpdate,
    isError: isErrorUpdate,
    failureReason: errorUpdate,
  } = useQuery({
    queryKey: ["allPendingWithdrawalBatches/update", updateQueryKeys],
    queryFn: getUpdatedBatches,
    enabled: !!data,
    refetchOnMount: false,
  })

  return {
    data: updatedBatches ?? batches,
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
