import {
  formatTokenWithCommas,
  TOKEN_FORMAT_DECIMALS,
} from "../../../../../../utils/formatters"
import { CollateralObligationsDataProps } from "./interface"
import "./style.css"

export const CollateralObligationsData = ({
  market,
  withdrawals,
  doubleDivider,
}: CollateralObligationsDataProps) => {
  const {
    normalizedUnclaimedWithdrawals,
    normalizedPendingWithdrawals,
    underlyingToken,
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
        <div>
          {formatTokenWithCommas(minimumReserves, {
            fractionDigits: TOKEN_FORMAT_DECIMALS,
          })}{" "}
          {underlyingToken.symbol}
        </div>
        <div>Min Reserves</div>
      </div>
      <div className="obligations__value">
        <div>
          {formatTokenWithCommas(activeWithdrawalsTotalOwed, {
            fractionDigits: TOKEN_FORMAT_DECIMALS,
          })}{" "}
          {underlyingToken.symbol}
        </div>
        <div>Ongoing WDs</div>
      </div>
      <div className="obligations__value">
        <div>
          {formatTokenWithCommas(claimableWDs, {
            fractionDigits: TOKEN_FORMAT_DECIMALS,
          })}{" "}
          {underlyingToken.symbol}
        </div>
        <div>Claimable WDs</div>
      </div>
      <div className="obligations__value">
        <div>
          {formatTokenWithCommas(outstandingWDs, {
            fractionDigits: TOKEN_FORMAT_DECIMALS,
          })}{" "}
          {underlyingToken.symbol}
        </div>
        <div>Outstanding WDs</div>
      </div>
      <div
        className="obligations__divider"
        style={{ margin: doubleDivider ? "12px 0 12px 0" : "12px 0 8px 0" }}
      />
    </div>
  )
}
