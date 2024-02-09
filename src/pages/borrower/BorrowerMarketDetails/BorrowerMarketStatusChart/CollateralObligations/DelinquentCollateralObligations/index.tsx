import { CollateralObligationsData } from "../CollateralObligationsData"
import { DelinquentCollateralObligationsProps } from "./interface"
import { MARKET_BAR_DATA } from "../../constants"
import { formatTokenWithCommas } from "../../../../../../utils/formatters"
import "./styles.css"

export const DelinquentCollateralObligations = ({
  market,
  legendItem,
  withdrawals,
}: DelinquentCollateralObligationsProps) => {
  const breakdown = market.getTotalDebtBreakdown()

  const reserves = breakdown.status === "delinquent" && breakdown.reserves

  return (
    <>
      <div className="double-item__container-inner">
        <div style={{ width: "100%" }}>
          <div className="double-item__header">
            <div>Delinquent Debt</div>
            <div
              className="double-item__dot"
              style={{
                backgroundColor:
                  MARKET_BAR_DATA.delinquentDebt.delinquentBgColor,
              }}
            />
          </div>
          <div>
            {market.delinquentDebt.toFixed(2)} {legendItem.asset}
          </div>
        </div>
        <div className="double-item__divider-vertical" />
        <div style={{ width: "100%" }}>
          <div className="double-item__header">
            <div>Current Reserves</div>
            <div
              className="double-item__dot"
              style={{
                backgroundColor:
                  MARKET_BAR_DATA.currentReserves.delinquentBgColor,
              }}
            />
          </div>
          <div>
            <div>
              {reserves && formatTokenWithCommas(reserves)} {legendItem.asset}
            </div>
          </div>
        </div>
      </div>
      <div className="double-item__values-container">
        <CollateralObligationsData market={market} withdrawals={withdrawals} />
      </div>
    </>
  )
}
