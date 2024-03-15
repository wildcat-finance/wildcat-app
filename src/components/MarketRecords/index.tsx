import { Market, getMarketRecords } from "@wildcatfi/wildcat-sdk"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { SubgraphClient } from "../../config/subgraph"
import { MarketRecordsTable } from "./MarketRecordsTable"
import { Chip, Spinner } from "../ui-components"
import { ExpandMore } from "../ui-components/icons"
import "./index.css"

const GET_MARKET_RECORDS_KEY = "get-market-records"

type UseMarketRecordsProps = {
  market: Market
  page: number
  pageSize: number
}

export function useMarketRecords({
  market,
  page,
  pageSize,
}: UseMarketRecordsProps) {
  const [finalEventIndex, setFinalEventIndex] = useState(market.eventIndex)
  const getMarketRecordsInternal = async () => {
    if (finalEventIndex === undefined) {
      throw Error(`No market event index and final event index provided`)
    }
    const endEventIndex = Math.max(0, finalEventIndex - page * pageSize)
    const records = await getMarketRecords(SubgraphClient, {
      market,
      fetchPolicy: "network-only",
      endEventIndex,
      limit: pageSize,
    })
    if (finalEventIndex === undefined) {
      setFinalEventIndex(Math.max(...records.map((r) => r.eventIndex + 1)))
    }
    return records
  }
  const { data, isLoading } = useQuery({
    queryKey: [GET_MARKET_RECORDS_KEY, market.address, page],
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
  }
}

export function MarketRecords({ market }: { market: Market }) {
  const pageSize = 50
  const [page, setPage] = useState(0)

  const { data, isLoading, pagesCount } = useMarketRecords({
    market,
    page,
    pageSize,
  })

  if (isLoading) {
    return <Spinner isLoading={isLoading} />
  }

  return (
    <>
      <MarketRecordsTable market={market} records={data} />

      <div className="h-9 flex justify-end items-center bg-tint-9 px-6">
        <div className="flex gap-x-4 items-center flex-row">
          {page > 0 && (
            <ExpandMore className="transform rotate-90 hover:rotate-90 page-btn-left hover:scale-150" />
          )}
          Page {page + 1} {pagesCount === undefined ? "" : `of ${pagesCount}`}
          {pagesCount && pagesCount - 1 > page && (
            <ExpandMore
              className="transform -rotate-90 hover:-rotate-90 page-btn-left hover:scale-150"
              onClick={() => setPage(page + 1)}
            />
          )}
        </div>
      </div>
    </>
  )
}
