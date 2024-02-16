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
}: CollateralObligationsDataProps) => (
  <div className="obligations__container">
    {doubleDivider && <div className="obligations__divider" />}
    <div className="obligations__value">
      <div>
        {formatTokenWithCommas(market.minimumReserves, {
          fractionDigits: TOKEN_FORMAT_DECIMALS,
        })}{" "}
        {market.underlyingToken.symbol}
      </div>
      <div>Min Reserves</div>
    </div>
    <div className="obligations__value">
      <div>
        {formatTokenWithCommas(withdrawals.activeWithdrawalsTotalOwed, {
          fractionDigits: TOKEN_FORMAT_DECIMALS,
        })}{" "}
        {market.underlyingToken.symbol}
      </div>
      <div>Ongoing WDs</div>
    </div>
    <div className="obligations__value">
      <div>
        {formatTokenWithCommas(withdrawals.expiredWithdrawalsTotalOwed, {
          fractionDigits: TOKEN_FORMAT_DECIMALS,
        })}{" "}
        {market.underlyingToken.symbol}
      </div>
      <div>Claimable WDs</div>
    </div>
    <div className="obligations__value">
      <div>
        {formatTokenWithCommas(withdrawals.expiredWithdrawalsTotalOwed, {
          fractionDigits: TOKEN_FORMAT_DECIMALS,
        })}{" "}
        {market.underlyingToken.symbol}
      </div>
      <div>Outstanding WDs</div>
    </div>
    <div
      className="obligations__divider"
      style={{ margin: doubleDivider ? "12px 0 12px 0" : "12px 0 8px 0" }}
    />
  </div>
)
