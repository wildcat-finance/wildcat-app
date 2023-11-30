import { TableItem } from "../../../../components/ui-components"
import {
  formatBps,
  formatSecsToHours,
  MARKET_PARAMS_DECIMALS,
  TOKEN_FORMAT_DECIMALS,
  trimAddress,
} from "../../../../utils/formatters"

import type { BorrowerMarketOverviewProps } from "./interface"
import { getEtherscanLink } from "../../../../utils/links"

const LenderMarketOverview = ({
  marketAccount,
}: BorrowerMarketOverviewProps) => {
  const { marketBalance, market } = marketAccount
  const {
    address,
    underlyingToken,
    annualInterestBips,
    maxTotalSupply,
    reserveRatioBips,
    totalSupply,
    coverageLiquidity,
    timeDelinquent,
    delinquencyGracePeriod,
    marketToken,
    withdrawalBatchDuration,
    delinquencyFeeBips,
    totalAssets,
    liquidReserves,
    delinquentDebt,
  } = market

  const availableGracePeriod =
    timeDelinquent > delinquencyGracePeriod
      ? 0
      : delinquencyGracePeriod - timeDelinquent

  return (
    <div>
      <div className="text-base font-bold">Market Details</div>
      <div className="flex w-full mt-5 mb-14">
        <div className="w-full">
          <TableItem title="Market Address" className="pl-6 pr-24">
            <a
              className="hover:underline text-xs"
              href={getEtherscanLink(address, "address")}
              target="_blank"
              rel="noreferrer"
            >
              {trimAddress(address)}
            </a>
          </TableItem>
          <TableItem title="Underlying Asset" className="pl-6 pr-24">
            <a
              className="hover:underline text-xs"
              href={getEtherscanLink(underlyingToken.address, "address")}
              target="_blank"
              rel="noreferrer"
            >
              {underlyingToken.symbol} ({trimAddress(underlyingToken.address)})
            </a>
          </TableItem>
          <TableItem
            title="Base APR"
            value={`${formatBps(
              annualInterestBips,
              MARKET_PARAMS_DECIMALS.annualInterestBips,
            )}%`}
            className="pl-6 pr-24"
          />
          <TableItem
            title="Max. Borrowing Capacity"
            value={`${Number(
              maxTotalSupply.format(TOKEN_FORMAT_DECIMALS),
            ).toLocaleString("en-US")} ${underlyingToken.symbol}`}
            className="pl-6 pr-24"
          />
          <TableItem
            title="Min. Reserve Ratio"
            value={`${formatBps(
              reserveRatioBips,
              MARKET_PARAMS_DECIMALS.reserveRatioBips,
            )}%`}
            className="pl-6 pr-24"
          />
          <TableItem title="Market Token Name" className="pl-6 pr-24">
            <a
              className="hover:underline text-xs"
              href={getEtherscanLink(marketToken.address, "address")}
              target="_blank"
              rel="noreferrer"
            >
              {marketToken.name}
            </a>
          </TableItem>
          <TableItem
            title="Withdrawal Cycle Duration"
            value={formatSecsToHours(withdrawalBatchDuration)}
            className="pl-6 pr-24"
          />
          <TableItem
            title="Max. Grace Period"
            value={formatSecsToHours(delinquencyGracePeriod)}
            className="pl-6 pr-24"
          />
        </div>
        <div className="w-full">
          <TableItem
            title="Available Grace Period"
            value={formatSecsToHours(availableGracePeriod)}
            className="pr-6 pl-24"
          />
          <TableItem
            title="Penalty APR"
            value={`${formatBps(
              delinquencyFeeBips,
              MARKET_PARAMS_DECIMALS.delinquencyFeeBips,
            )}%`}
            className="pr-6 pl-24"
          />
          <TableItem
            title="Total Outstanding Debt"
            value={`${totalSupply.format(TOKEN_FORMAT_DECIMALS)} ${
              underlyingToken.symbol
            }`}
            className="pr-6 pl-24"
          />
          <TableItem
            title="My Loaned Amount"
            value={`${marketBalance.format(TOKEN_FORMAT_DECIMALS)} ${
              underlyingToken.symbol
            }`}
            className="pr-6 pl-24"
          />
          <TableItem
            title="Total Reserves"
            value={totalAssets.format(TOKEN_FORMAT_DECIMALS, true)}
            className="pr-6 pl-24"
          />
          <TableItem
            title="Liquid Reserves"
            value={liquidReserves.format(TOKEN_FORMAT_DECIMALS, true)}
            className="pr-6 pl-24"
          />
          <TableItem
            title="Current Min. Reserve Required"
            value={coverageLiquidity.format(TOKEN_FORMAT_DECIMALS, true)}
            className="pr-6 pl-24"
          />
          <TableItem
            title="Delinquent Debt"
            value={delinquentDebt.format(TOKEN_FORMAT_DECIMALS, true)}
            className="pr-6 pl-24"
          />
        </div>
      </div>
    </div>
  )
}

export default LenderMarketOverview
