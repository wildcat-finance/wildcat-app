import humanizeDuration from "humanize-duration"
import { useMemo } from "react"
import { HiQuestionMarkCircle } from "react-icons/hi"
import { TableItem } from "../../../../components/ui-components"
import { EtherscanLink } from "../../../../components/ui-components/EtherscanLink"
import { useBorrowerNameOrAddress } from "../../../../hooks/useBorrowerNames"
import {
  formatBps,
  formatRayAsPercentage,
  formatSecsToHours,
  MARKET_PARAMS_DECIMALS,
  TOKEN_FORMAT_DECIMALS,
  trimAddress,
} from "../../../../utils/formatters"

import type { BorrowerMarketOverviewProps } from "./interface"

const LenderMarketOverview = ({
  marketAccount,
}: BorrowerMarketOverviewProps) => {
  const { market } = marketAccount
  const {
    address,
    underlyingToken,
    annualInterestBips,
    maxTotalSupply,
    reserveRatioBips,
    coverageLiquidity,
    timeDelinquent,
    delinquencyGracePeriod,
    marketToken,
    withdrawalBatchDuration,
    delinquencyFeeBips,
    delinquentDebt,
  } = market
  const [gracePeriodLabel, gracePeriodTimer] =
    timeDelinquent > delinquencyGracePeriod
      ? [
          "Remaining Time With Penalties",
          humanizeDuration((timeDelinquent - delinquencyGracePeriod) * 1000, {
            round: true,
            largest: 2,
          }),
        ]
      : [
          "Available Grace Period",
          formatSecsToHours(delinquencyGracePeriod - timeDelinquent),
        ]

  const gracePeriodTooltip = useMemo(() => {
    const breakdown = market.getTotalDebtBreakdown()
    const willBeDelinquent = breakdown.status === "delinquent"
    if (!market.isDelinquent) {
      if (willBeDelinquent) {
        // If the market is not currently delinquent but will be after the next update:
        return "This market has become delinquent since its last update and its delinquency timer will begin to increase once it is updated."
      }
      if (timeDelinquent > delinquencyGracePeriod) {
        // If the market is not currently delinquent (on-chain) but is incurring penalties:
        return "This market is not currently delinquent, but delinquency fees will apply until the timer is below the grace period."
      }
      return undefined
    }
    if (!willBeDelinquent) {
      // If the market will stop being delinquent after the next update:
      return "This market has become healthy since its last update and its delinquency timer will begin to decrease once it is updated."
    }
    // If the market will continue to be delinquent after the next update:
    return "The delinquency timer will continue to increase until this market is returned to a healthy state."
  }, [market])

  const borrowerName = useBorrowerNameOrAddress(market.borrower)

  return (
    <div>
      <div className="text-base font-bold">Market Details</div>
      <div className="flex w-full mt-5 mb-14">
        <div className="w-full">
          <TableItem title="Market Token" className="pl-6 pr-24">
            <EtherscanLink kind="token" value={address}>
              {marketToken.symbol} ({trimAddress(marketToken.address)})
            </EtherscanLink>
          </TableItem>
          <TableItem title="Underlying Asset" className="pl-6 pr-24">
            <EtherscanLink kind="token" value={underlyingToken.address}>
              {underlyingToken.symbol} ({trimAddress(underlyingToken.address)})
            </EtherscanLink>
          </TableItem>
          <TableItem title="Borrower" className="pl-6 pr-24">
            <EtherscanLink kind="address" value={market.borrower}>
              {borrowerName}
            </EtherscanLink>
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
        </div>
        <div className="w-full">
          <TableItem
            title="Withdrawal Cycle Duration"
            value={formatSecsToHours(withdrawalBatchDuration)}
            className="pr-6 pl-24"
          />
          <TableItem
            title="Max. Grace Period"
            value={formatSecsToHours(delinquencyGracePeriod)}
            className="pr-6 pl-24"
          />
          <TableItem
            title={gracePeriodLabel}
            valueTooltip={gracePeriodTooltip}
            value={
              gracePeriodTooltip ? (
                <span className="flex justify-center items-center gap-1">
                  {gracePeriodTimer}
                  <HiQuestionMarkCircle
                    className="text-base cursor-pointer"
                    color="orange"
                  />
                </span>
              ) : (
                gracePeriodTimer
              )
            }
            className="pr-6 pl-24"
            valueClassName={
              timeDelinquent > delinquencyGracePeriod
                ? "!text-red-400 font-bold"
                : ""
            }
          />
          <TableItem
            title="Penalty APR"
            value={
              market.isIncurringPenalties ? (
                <span className="flex justify-center items-center gap-1">
                  {`${formatBps(
                    delinquencyFeeBips,
                    MARKET_PARAMS_DECIMALS.delinquencyFeeBips,
                  )}%`}
                  <HiQuestionMarkCircle
                    className="text-base cursor-pointer"
                    color="orange"
                  />
                </span>
              ) : (
                `${formatBps(
                  delinquencyFeeBips,
                  MARKET_PARAMS_DECIMALS.delinquencyFeeBips,
                )}%`
              )
            }
            className="pr-6 pl-24"
            valueTooltip={
              market.isIncurringPenalties
                ? `This market is incurring delinquency fees, leading to a total APR of ${formatRayAsPercentage(
                    market.effectiveLenderAPR,
                    MARKET_PARAMS_DECIMALS.annualInterestBips,
                  )}%. Penalties will continue to apply until the delinquency timer is below the grace period.`
                : undefined
            }
            valueClassName={
              market.isIncurringPenalties ? "!text-red-400 font-bold" : ""
            }
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
