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
import { EtherscanBaseUrl } from "../../../../config/networks"

const localize = (
  tokenAmount: TokenAmount,
  decimals = TOKEN_FORMAT_DECIMALS,
  withSymbol = false,
) => {
  const text = tokenAmount.format(decimals)
  const [beforeDecimal, afterDecimal] = text.split(".")
  const beforeDecimalWithCommas = Number(beforeDecimal).toLocaleString("en-US")
  return [
    beforeDecimalWithCommas,
    ...(afterDecimal !== undefined ? [".", afterDecimal] : []),
    ...(withSymbol ? [" ", tokenAmount.symbol] : []),
  ].join("")
}

const toTokenAmountProps = (
  tokenAmount: TokenAmount | undefined,
  defaultText = "-",
) => ({
  value: tokenAmount
    ? localize(tokenAmount, TOKEN_FORMAT_DECIMALS, true)
    : defaultText,
  valueTooltip: tokenAmount?.format(tokenAmount.decimals, true),
})

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
  } = market

  const availableGracePeriod =
    timeDelinquent > delinquencyGracePeriod
      ? 0
      : delinquencyGracePeriod - timeDelinquent

  const totalInterestAccrued = (
    market.totalDelinquencyFeesAccrued ?? underlyingToken.getAmount(0)
  ).add(market.totalBaseInterestAccrued ?? 0)

  return (
    <div>
      <div className="text-base font-bold">Market Details</div>
      <div className="flex w-full mt-5 mb-14">
        <div className="w-full">
          <TableItem title="Market Address" className="pl-6 pr-24">
            <a
              className="hover:underline text-xs"
              href={`${EtherscanBaseUrl}/address/${address}`}
              target="_blank"
              rel="noreferrer"
            >
              {trimAddress(address)}
            </a>
          </TableItem>
          <TableItem title="Underlying Asset" className="pl-6 pr-24">
            <a
              className="hover:underline text-xs"
              href={`${EtherscanBaseUrl}/address/${underlyingToken.address}`}
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
              href={`${EtherscanBaseUrl}/address/${marketToken.address}`}
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
          <TableItem
            title="Available Grace Period"
            value={formatSecsToHours(availableGracePeriod)}
            className="pl-6 pr-24"
          />
        </div>
        <div className="w-full">
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
            valueTooltip={`${totalSupply.format(totalSupply.decimals)} ${
              underlyingToken.symbol
            }`}
            className="pr-6 pl-24"
          />
          <TableItem
            title="Available to Borrow"
            {...toTokenAmountProps(borrowableAssets)}
            className="pr-6 pl-24"
          />
          <TableItem
            title="Liquid Reserves"
            {...toTokenAmountProps(liquidReserves)}
            className="pr-6 pl-24"
          />
          <TableItem
            title="Current Min. Reserve Required"
            {...toTokenAmountProps(coverageLiquidity)}
            className="pr-6 pl-24"
          />
          <TableItem
            title="Reserves Owed"
            {...toTokenAmountProps(delinquentDebt)}
            className="pr-6 pl-24"
          />
          <TableItem
            title="Unclaimed Withdrawals"
            {...toTokenAmountProps(normalizedUnclaimedWithdrawals)}
            titleTooltip="Withdrawals that have been reserved but not yet claimed"
            className="pr-6 pl-24"
          />
          <TableItem
            title="Total Interest Accrued"
            className="pr-6 pl-24"
            {...toTokenAmountProps(totalInterestAccrued)}
            titleTooltip="Total accrued from delinquency fees and base interest"
          />
          <TableItem
            title="Total Protocol Fees"
            className="pr-6 pl-24"
            {...toTokenAmountProps(market.totalProtocolFeesAccrued)}
            titleTooltip="Total accrued in protocol fees"
          />
        </div>
      </div>
    </div>
  )
}

export default BorrowerMarketOverview
