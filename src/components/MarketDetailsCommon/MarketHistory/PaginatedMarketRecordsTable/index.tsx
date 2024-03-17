import { Market, MarketRecordKind } from "@wildcatfi/wildcat-sdk"
import { useMemo, useState } from "react"
import { MarketRecordsTable } from "./MarketRecordsTable"
import { ExpandMore } from "../../../ui-components/icons"
import "./index.css"
import { CheckboxGrid } from "../../../ui-components/CheckboxGrid"
import { CheckboxOption } from "../../../ui-components/CheckboxGrid/interface"
import { useMarketRecords } from "./hooks/useMarketRecords"

const MarketRecordFilters: CheckboxOption<MarketRecordKind>[] = (
  [
    ["AnnualInterestBipsUpdated", "APR Change"],
    ["Borrow", "Borrow"],
    ["DebtRepaid", "Repayment"],
    ["DelinquencyStatusChanged", "Delinquency"],
    ["Deposit", "Deposit"],
    ["FeesCollected", "Fees"],
    ["MarketClosed", "Market Closed"],
    ["MaxTotalSupplyUpdated", "Capacity Change"],
    ["WithdrawalRequest", "Withdrawal"],
  ] as [MarketRecordKind, string][]
).map(([value, label]) => ({ id: `check-filter-${value}`, value, label }))

export function PaginatedMarketRecordsTable({ market }: { market: Market }) {
  const pageSize = 10
  const [page, setPage] = useState(0)
  const [selectedFilters, setSelectedFilters] = useState<MarketRecordKind[]>(
    MarketRecordFilters.map((f) => f.value),
  )

  const { data, isLoading, pagesCount, finalEventIndex } = useMarketRecords({
    market,
    page,
    pageSize,
    kinds: selectedFilters as MarketRecordKind[],
  })
  const options = MarketRecordFilters

  const handleChange = (
    o: CheckboxOption<MarketRecordKind>,
    checked: boolean,
  ) => {
    const otherSelectedFilters = selectedFilters.filter((f) => f !== o.value)

    if (checked) {
      setSelectedFilters([...otherSelectedFilters, o.value])
    } else {
      setSelectedFilters(otherSelectedFilters)
    }
  }

  const [startEventIndex, endEventIndex] = useMemo(() => {
    if (
      finalEventIndex === undefined ||
      data === undefined ||
      data.length === 0
    ) {
      return [undefined, undefined]
    }
    return [
      finalEventIndex - data[0].eventIndex,
      finalEventIndex - data[data.length - 1].eventIndex,
    ]
  }, [data, finalEventIndex])

  return (
    <>
      <CheckboxGrid
        onChange={handleChange}
        selected={selectedFilters}
        options={options}
      />
      <MarketRecordsTable
        market={market}
        records={data}
        isLoading={isLoading}
      />

      <div className="h-9 flex justify-between items-center bg-tint-9 px-6">
        {startEventIndex !== undefined && (
          <div className="inline text-black text-xs font-bold">
            Viewing records {startEventIndex} to {endEventIndex}
          </div>
        )}
        <div className="flex gap-x-4 items-center flex-row">
          {page > 0 && (
            <ExpandMore
              className="transform rotate-90 hover:rotate-90 page-btn-left hover:scale-150"
              onClick={() => setPage(page - 1)}
            />
          )}
          Page {page + 1} {pagesCount === undefined ? "" : `of ${pagesCount}`}
          {pagesCount && pagesCount - 1 > page && data?.length === pageSize && (
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
