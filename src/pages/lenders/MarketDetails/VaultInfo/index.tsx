import { MarketProps } from "./interface"

import { TableItem } from "../../../../components/ui-components"
import {
  formatBps,
  formatSecsToHours,
  MARKET_PARAMS_DECIMALS,
  TOKEN_FORMAT_DECIMALS,
} from "../../../../utils/formatters"

export function VaultInfo({ market }: MarketProps) {
  return (
    <div>
      <div className="text-base font-bold mb-5">Details</div>
      <TableItem className="grid grid-cols-2 gap-x-36">
        <div className="w-full flex px-3 items-center flex-row leading-8 justify-between">
          <div className="inline text-black text-xs font-bold">
            Annual Interest Rate
          </div>
          <div className="inline text-black text-xs">
            {market.annualInterestBips}%
          </div>
        </div>

        <div className="w-full flex px-3 items-center flex-row leading-8 justify-between">
          <div className="inline text-black text-xs font-bold">
            Grace Period
          </div>
          <div className="inline text-black text-xs">23:12:38</div>
        </div>
      </TableItem>
      <TableItem className="grid grid-cols-2 gap-x-36">
        <div className="w-full flex px-3 items-center flex-row leading-8 justify-between">
          <div className="inline text-black text-xs font-bold">
            Maximum Capacity
          </div>
          <div className="inline text-black text-xs">
            {market.maxTotalSupply.format(TOKEN_FORMAT_DECIMALS)}{" "}
            {market.underlyingToken.symbol}
          </div>
        </div>

        <div className="w-full flex px-3 items-center flex-row leading-8 justify-between">
          <div className="inline text-black text-xs font-bold">
            Withdrawal Cycle
          </div>
          <div className="inline text-black text-xs">
            {formatSecsToHours(market.pendingWithdrawalExpiry)} hours
          </div>
        </div>
      </TableItem>
      <TableItem className="grid grid-cols-2 gap-x-36">
        <div className="w-full flex px-3 items-center flex-row leading-8 justify-between">
          <div className="inline text-black text-xs font-bold">Deposits</div>
          <div className="inline text-black text-xs" />
        </div>

        <div className="w-full flex px-3 items-center flex-row leading-8 justify-between">
          <div className="inline text-black text-xs font-bold">
            Reserved Assets
          </div>
          <div className="inline text-black text-xs">
            {String(market.borrowableAssets.raw)}{" "}
            {market.underlyingToken.symbol}
          </div>
        </div>
      </TableItem>
      <TableItem className="grid grid-cols-2 gap-x-36">
        <div className="w-full flex px-3 items-center flex-row leading-8 justify-between">
          <div className="inline text-black text-xs font-bold">
            Amount Borrowed
          </div>
          <div className="inline text-black text-xs" />
        </div>

        <div className="w-full flex px-3 items-center flex-row leading-8 justify-between">
          <div className="inline text-black text-xs font-bold">
            Pending Withdrawals
          </div>
          <div className="inline text-black text-xs">
            {formatSecsToHours(market.pendingWithdrawalExpiry)}
          </div>
        </div>
      </TableItem>
      <TableItem className="grid grid-cols-2 gap-x-36">
        <div className="w-full flex px-3 items-center flex-row leading-8 justify-between">
          <div className="inline text-black text-xs font-bold">
            Current Reserves
          </div>
          <div className="inline text-black text-xs">
            {`${formatBps(market.temporaryReserveRatioExpiry)}`}{" "}
            {market.underlyingToken.symbol}
          </div>
        </div>

        <div className="w-full flex px-3 items-center flex-row leading-8 justify-between">
          <div className="inline text-black text-xs font-bold">
            Accured Protocol Fees
          </div>
          <div className="inline text-black text-xs">
            {`5 ${market.underlyingToken.symbol}`}
          </div>
        </div>
      </TableItem>
      <TableItem className="grid grid-cols-2 gap-x-36">
        <div className="w-full flex px-3 items-center flex-row leading-8 justify-between">
          <div className="inline text-black text-xs font-bold">
            Current Reserve Ratio
          </div>
          <div className="inline text-black text-xs">
            {formatBps(market.reserveRatioBips)}%
          </div>
        </div>

        <div className="w-full flex px-3 items-center flex-row leading-8 justify-between">
          <div className="inline text-black text-xs font-bold">
            Withdrawal Cycle Countdown
          </div>
          <div className="inline text-black text-xs">23:12:38</div>
        </div>
      </TableItem>
      <TableItem className="grid grid-cols-2 gap-x-36">
        <div className="w-full flex px-3 items-center flex-row leading-8 justify-between">
          <div className="inline text-black text-xs font-bold">
            Required Reserves
          </div>
          <div className="inline text-black text-xs">
            {market.coverageLiquidity.format(TOKEN_FORMAT_DECIMALS, true)}
          </div>
        </div>

        <div className="w-full flex px-3 items-center flex-row leading-8 justify-between">
          <div className="inline text-black text-xs font-bold">
            Master Loan Agreement
          </div>
          <div className="inline text-black text-xs" />
        </div>
      </TableItem>
      <TableItem className="grid grid-cols-2 gap-x-36">
        <div className="w-full flex px-3 items-center flex-row leading-8 justify-between">
          <div className="inline text-black text-xs font-bold">
            Minimum Reserve Ratio
          </div>
          <div className="inline text-black text-xs">
            {`${formatBps(
              market.reserveRatioBips,
              MARKET_PARAMS_DECIMALS.reserveRatioBips,
            )}%`}
          </div>
        </div>
      </TableItem>
    </div>
  )
}
