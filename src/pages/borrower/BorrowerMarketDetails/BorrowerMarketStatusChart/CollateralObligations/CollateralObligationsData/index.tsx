import { formatTokenWithCommas } from "../../../../../../utils/formatters"
import { CollateralObligationsDataProps } from "./interface"
import "./style.css"
import { TokenAmountTooltip } from "../../../../../../components/ui-components/TokenAmountTooltip"

export const CollateralObligationsData = ({
  market,
  withdrawals,
  doubleDivider,
}: CollateralObligationsDataProps) => {
  const {
    normalizedUnclaimedWithdrawals,
    normalizedPendingWithdrawals,
    minimumReserves,
  } = market
  const { activeWithdrawalsTotalOwed } = withdrawals
  const { activeWithdrawal } = withdrawals

  const claimableWDs = activeWithdrawal
    ? normalizedUnclaimedWithdrawals.sub(activeWithdrawal.normalizedAmountPaid)
    : normalizedUnclaimedWithdrawals

  const outstandingWDs = activeWithdrawal
    ? normalizedPendingWithdrawals.sub(activeWithdrawal.normalizedAmountPaid)
    : normalizedPendingWithdrawals

  return (
    <div className="obligations__container">
      {doubleDivider && <div className="obligations__divider" />}
      <div className="obligations__value">
        <TokenAmountTooltip value={minimumReserves}>
          {formatTokenWithCommas(minimumReserves, { withSymbol: true })}
        </TokenAmountTooltip>
        <div>Min Reserves</div>
      </div>
      <div className="obligations__value">
        <TokenAmountTooltip value={activeWithdrawalsTotalOwed}>
          {formatTokenWithCommas(activeWithdrawalsTotalOwed, {
            withSymbol: true,
          })}
        </TokenAmountTooltip>
        <div>Ongoing WDs</div>
      </div>
      <div className="obligations__value">
        <TokenAmountTooltip value={claimableWDs}>
          {formatTokenWithCommas(claimableWDs, { withSymbol: true })}
        </TokenAmountTooltip>
        <div>Claimable WDs</div>
      </div>
      <div className="obligations__value">
        <TokenAmountTooltip value={outstandingWDs}>
          {formatTokenWithCommas(outstandingWDs, { withSymbol: true })}
        </TokenAmountTooltip>
        <div>Outstanding WDs</div>
      </div>
      <div
        className="obligations__divider"
        style={{ margin: doubleDivider ? "12px 0 12px 0" : "12px 0 8px 0" }}
      />
    </div>
  )
}
