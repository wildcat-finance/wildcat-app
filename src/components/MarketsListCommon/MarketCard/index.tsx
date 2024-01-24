import { Link } from "react-router-dom"
import cn from "classnames"

import dayjs from "dayjs"
import { Button, Chip, TableItem } from "../../ui-components"
import { MarketCardProps } from "./interface"
import {
  getMarketStatus,
  getVaultStatusColor,
} from "../../../utils/marketStatus"
import {
  DATE_FORMAT,
  formatBps,
  formatTokenWithCommas,
  TOKEN_FORMAT_DECIMALS,
  trimAddress,
} from "../../../utils/formatters"
import { EtherscanBaseUrl } from "../../../config/networks"
import { getLenderRoleIcon } from "../../../utils/lenderRole"
import { getBorrowerRoleIcon } from "../../../utils/borrowerRole"
import { useBorrowerNameOrAddress } from "../../../hooks/useBorrowerNames"

function MarketCard({
  market: _market,
  account,
  className,
  showBorrower,
  showBalance,
  basePath,
  variant,
  showRole,
}: MarketCardProps) {
  const market = _market ?? account.market
  const status = getMarketStatus(
    market.isClosed,
    market.isDelinquent,
    market.isIncurringPenalties,
  )
  const marketBalance = account?.marketBalance
  const borrowerName = useBorrowerNameOrAddress(market.borrower)

  return (
    <div
      className={cn(
        "border border-tint-8 border-solid border-1 rounded-lg pt-4 pad",
        className,
      )}
    >
      <div className="w-full flex justify-between items-center flex-row px-3 mb-4">
        <div className="inline text-black text-xs font-bold items-center flex">
          {showRole &&
            (variant === "borrower"
              ? getBorrowerRoleIcon(market)
              : getLenderRoleIcon(account))}
          <span className="ml-2">{market.name}</span>
        </div>
        <Chip
          color={getVaultStatusColor(status)}
          className="h-auto justify-center px-1 p-1"
        >
          {status}
        </Chip>
      </div>

      <div>
        {showBorrower && (
          <TableItem
            title="Borrower"
            value={
              <a
                className="hover:underline text-xs"
                href={`${EtherscanBaseUrl}/address/${market.borrower}`}
                target="_blank"
                rel="noreferrer"
              >
                {borrowerName || trimAddress(market.borrower)}
              </a>
            }
          />
        )}
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
          value={`${formatTokenWithCommas(market.maxTotalSupply)} ${
            market.underlyingToken.symbol
          }`}
        />
        {showBalance && marketBalance && (
          <TableItem
            title="Loaned Amount"
            value={`${marketBalance.format(TOKEN_FORMAT_DECIMALS)} ${
              market.underlyingToken.symbol
            }`}
          />
        )}
        {variant === "borrower" && (
          <TableItem
            title="Available To Borrow"
            value={market.borrowableAssets.format(TOKEN_FORMAT_DECIMALS, true)}
          />
        )}
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
        <Link to={`${basePath}/market-details/${market.address.toLowerCase()}`}>
          <Button className="w-full" variant="black">
            Go To Market Details
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default MarketCard
