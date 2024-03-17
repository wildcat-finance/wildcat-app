import { useState } from "react"
import { ExpandMore } from "../../ui-components/icons"
import { MarketHistoryDetailsProps } from "./interface"
import { PaginatedMarketRecordsTable } from "./PaginatedMarketRecordsTable"

export const MarketHistory = ({ market }: MarketHistoryDetailsProps) => {
  const [showHistory, setShowHistory] = useState(false)

  const toggleDisplay = () => setShowHistory(!showHistory)

  return (
    <div className="mb-14">
      <div className="flex w-full justify-between content-center">
        <div className="text-base font-bold">Market History</div>
        <button
          className="flex items-center gap-x-2"
          onClick={() => toggleDisplay()}
        >
          <p className="text-xs font-normal underline cursor-pointer">
            {showHistory ? "Hide History" : "Show History"}
          </p>
          {showHistory ? (
            <ExpandMore
              className="transform rotate-180"
              onClick={() => toggleDisplay()}
            />
          ) : (
            <ExpandMore onClick={() => toggleDisplay()} />
          )}
        </button>
      </div>
      {showHistory && (
        <div className="mt-8">
          <PaginatedMarketRecordsTable market={market} />
        </div>
      )}
    </div>
  )
}

export default MarketHistory
