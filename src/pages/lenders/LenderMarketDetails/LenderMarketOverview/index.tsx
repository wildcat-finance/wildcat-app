import humanizeDuration from "humanize-duration"
import { useMemo } from "react"
import { FaExclamationCircle } from "react-icons/fa"
import { TableItem } from "../../../../components/ui-components"
import { EtherscanLink } from "../../../../components/ui-components/EtherscanLink"
import { useBorrowerNameOrAddress } from "../../../../hooks/useBorrowerNames"
import {
  formatBps,
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
          "Remaining Time With Delinquency Fees",
          humanizeDuration((timeDelinquent - delinquencyGracePeriod) * 1000, {
            round: true,
            largest: 2,
          }),
        ]
      : [
          "Available Grace Period",
          formatSecsToHours(delinquencyGracePeriod - timeDelinquent),
        ]

  const warningText = useMemo(() => {
    const breakdown = market.getTotalDebtBreakdown()
    const willBeDelinquent = breakdown.status === "delinquent"
    if (!market.isDelinquent && willBeDelinquent) {
      return "The delinquency timer will only begin ticking after a market update."
    }
    if (!willBeDelinquent && timeDelinquent > delinquencyGracePeriod) {
      return "The market is not currently delinquent, but penalty fees will apply until the delinquency timer is below the grace period."
    }
    return undefined
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
            valueTooltip={warningText}
            value={
              warningText ? (
                <span className="flex justify-center items-center gap-2">
                  {gracePeriodTimer}
                  <FaExclamationCircle height={12} color="orange" />
                </span>
              ) : (
                gracePeriodTimer
              )
            }
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
