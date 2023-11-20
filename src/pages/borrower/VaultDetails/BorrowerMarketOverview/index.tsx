import { TokenAmount } from "@wildcatfi/wildcat-sdk"
import { TableItem } from "../../../../components/ui-components"
import {
  formatBps,
  formatSecsToHours,
  MARKET_PARAMS_DECIMALS,
  TOKEN_FORMAT_DECIMALS,
  trimAddress,
} from "../../../../utils/formatters"

import type { BorrowerMarketOverviewProps } from "./interface"

function getMinReserveRatio(
  reserveRatioBips: number,
  coverageLiquidity: TokenAmount,
  totalSupply: TokenAmount,
) {
  if (totalSupply.raw.isZero() || coverageLiquidity.raw.isZero()) {
    return reserveRatioBips
  }

  return Math.min(
    reserveRatioBips,
    coverageLiquidity.raw.div(totalSupply.raw).toNumber(),
  )
}

const BorrowerMarketOverview = ({ market }: BorrowerMarketOverviewProps) => {
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
    borrowableAssets,
    liquidReserves,
    delinquentDebt,
    normalizedUnclaimedWithdrawals,
    normalizedPendingWithdrawals,
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
          <TableItem
            title="Market Address"
            value={trimAddress(address)}
            className="pl-6 pr-24"
          />
          <TableItem
            title="Underlying Asset"
            value={`${underlyingToken.symbol} (${trimAddress(
              underlyingToken.address,
            )})`}
            className="pl-6 pr-24"
          />
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
          <TableItem
            title="Market Token Name"
            value={marketToken.name}
            className="pl-6 pr-24"
          />
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
            title="Available to Borrow"
            value={borrowableAssets.format(TOKEN_FORMAT_DECIMALS, true)}
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
            title="Reserves Owed"
            value={delinquentDebt.format(TOKEN_FORMAT_DECIMALS, true)}
            className="pr-6 pl-24"
          />
          <TableItem
            title="Unclaimed Withdrawals"
            value={normalizedUnclaimedWithdrawals.format(
              TOKEN_FORMAT_DECIMALS,
              true,
            )}
            className="pr-6 pl-24"
          />
        </div>
      </div>
    </div>
  )
}

export default BorrowerMarketOverview
