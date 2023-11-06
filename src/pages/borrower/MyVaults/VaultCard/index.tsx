import { useNavigate } from "react-router-dom"
import cn from "classnames"

import { Button, Chip, TableItem } from "../../../../components/ui-components"
import { VaultCardProps } from "./interface"
import {
  formatBps,
  formatToken,
  getMarketStatus,
  getVaultStatusColor,
} from "../../../../utils/helpers"

function VaultCard({ market, className }: VaultCardProps) {
  const navigate = useNavigate()
  const status = getMarketStatus(
    market.isClosed,
    market.isDelinquent,
    market.isIncurringPenalties,
  )

  return (
    <div
      className={cn(
        "border border-tint-8 border-solid border-1 rounded-lg pt-4 pad",
        className,
      )}
    >
      <div className="w-full flex justify-between items-center flex-row px-3 mb-4">
        <div className="inline text-black text-xs font-bold">{market.name}</div>
        <Chip
          color={getVaultStatusColor(status)}
          className="h-auto justify-center px-1 p-1"
        >
          {status}
        </Chip>
      </div>

      <div>
        <TableItem
          title="Underlying Asset"
          value={`${market.underlyingToken.symbol}`}
        />
        <TableItem
          title="Lender APR"
          value={`${formatBps(market.annualInterestBips)}%`}
        />
        <TableItem
          title="Current Reserve Ratio"
          value={`${formatBps(market.reserveRatioBips)}%`}
        />
        <TableItem
          title="Total Credit Extended"
          value={`${formatToken(market.maxTotalSupply.raw)}`}
        />
        <TableItem
          title="Available To Borrow"
          value={`${formatToken(market.totalSupply.raw)}`}
        />
      </div>

      <div className="w-full p-3 bg-tint-10">
        <Button
          onClick={() =>
            navigate(`/borrower/market-details/${market.controller}`)
          }
          className="w-full"
          variant="black"
        >
          Go To Market
        </Button>
      </div>
    </div>
  )
}

export default VaultCard
