import {
  Market,
  MarketRecordKind,
  getMarketRecords,
} from "@wildcatfi/wildcat-sdk"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { SubgraphClient } from "../../../../../config/subgraph"

const GET_MARKET_RECORDS_KEY = "get-market-records"

export type UseMarketRecordsProps = {
  market: Market
  page: number
  pageSize: number
  kinds?: MarketRecordKind[]
}

export function useMarketRecords({
  market,
  page,
  pageSize,
  kinds,
}: UseMarketRecordsProps) {
  const [finalEventIndex, setFinalEventIndex] = useState(market.eventIndex)
  const getMarketRecordsInternal = async () => {
    if (finalEventIndex === undefined) {
      console.error(
        `Failed to retrieve market records: Market event index is undefined`,
      )
      throw Error(
        `Failed to retrieve market records, likely an error in the subgraph`,
      )
    }
    const endEventIndex = Math.max(0, finalEventIndex - page * pageSize)
    const records = await getMarketRecords(SubgraphClient, {
      market,
      fetchPolicy: "network-only",
      endEventIndex,
      limit: pageSize,
      kinds: kinds?.length ? kinds : undefined,
    })
    const newestEventIndex = Math.max(...records.map((r) => r.eventIndex + 1))
    if (newestEventIndex > finalEventIndex) {
      setFinalEventIndex(newestEventIndex)
    }
    return records
  }
  const { data, isLoading, error, isError } = useQuery({
    queryKey: [GET_MARKET_RECORDS_KEY, market.address, page, pageSize, kinds],
    queryFn: getMarketRecordsInternal,
    enabled: true,
    refetchOnMount: false,
  })
  return {
    data,
    isLoading,
    pagesCount:
      finalEventIndex === undefined
        ? undefined
        : Math.ceil(finalEventIndex / pageSize),
    isError,
    error,
    finalEventIndex,
  }
}
