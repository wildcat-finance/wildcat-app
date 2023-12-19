import cn from "classnames"

import { useNavigate } from "react-router-dom"
import dayjs from "dayjs"
import { Button, Chip, TableItem } from "../../../../components/ui-components"
import { VaultCardProps } from "./interface"
import {
  TOKEN_FORMAT_DECIMALS,
  formatBps,
  DATE_FORMAT,
} from "../../../../utils/formatters"
import {
  getMarketStatus,
  getVaultStatusColor,
} from "../../../../utils/marketStatus"
import { useLenderMarketAccount } from "../../hooks/useLenderMarketAccount"

function VaultCard({ market, className }: VaultCardProps) {
  const { data: marketAccount } = useLenderMarketAccount(market)

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
          title="Maximum Capacity"
          value={`${market.maxTotalSupply.format(TOKEN_FORMAT_DECIMALS)} ${
            market.underlyingToken.symbol
          }`}
        />
        <TableItem
          title="Loaned Amount"
          value={`${marketAccount?.marketBalance.format(
            TOKEN_FORMAT_DECIMALS,
          )} ${market.underlyingToken.symbol}`}
        />
        {market.deployedEvent && (
          <TableItem
            title="Deployed"
            value={dayjs(market.deployedEvent.blockTimestamp * 1000).format(
              DATE_FORMAT,
            )}
          />
        )}
      </div>

      <div className="w-full p-3 bg-tint-10">
        <Button
          className="w-full"
          variant="black"
          onClick={() =>
            navigate(`/lender/market-details/${market.address.toLowerCase()}`)
          }
        >
          Go To Market Details
        </Button>
      </div>
    </div>
  )
}

export default VaultCard
