import cn from "classnames"

import { useNavigate } from "react-router-dom"
import { Button, Chip, TableItem } from "../../../../components/ui-components"
import { VaultCardProps } from "./interface"
import { formatBps, formatToken } from "../../../../utils/formatters"
import {
  getMarketStatus,
  getVaultStatusColor,
} from "../../../../utils/marketStatus"

function VaultCard({ market, className }: VaultCardProps) {
  const status = getMarketStatus(
    market.isClosed,
    market.isDelinquent,
    market.isIncurringPenalties,
  )

  const navigate = useNavigate()

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
          value={`${formatToken(market.totalSupply.raw)}`}
        />
      </div>

      <div className="w-full p-3 bg-tint-10">
        <Button
          className="w-full"
          variant="black"
          onClick={() =>
            navigate(`/lender/market-details/${market.address.toLowerCase()}`)
          }
        >
          Go To Market
        </Button>
      </div>
    </div>
  )
}

export default VaultCard