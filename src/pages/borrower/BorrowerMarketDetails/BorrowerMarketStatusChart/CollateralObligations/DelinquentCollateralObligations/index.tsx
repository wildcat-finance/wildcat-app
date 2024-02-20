import { useState } from "react"
import { CollateralObligationsData } from "../CollateralObligationsData"
import { DelinquentCollateralObligationsProps } from "./interface"
import { MARKET_BAR_DATA } from "../../constants"
import { formatTokenWithCommas } from "../../../../../../utils/formatters"
import "./styles.css"
import { ExpandMore } from "../../../../../../components/ui-components/icons"

export const DelinquentCollateralObligations = ({
  market,
  legendItem,
  withdrawals,
}: DelinquentCollateralObligationsProps) => {
  const breakdown = market.getTotalDebtBreakdown()
  const reserves = breakdown.status === "delinquent" && breakdown.reserves

  const [expanded, setExpanded] = useState(false)

  const toggleExpanded = (value: boolean) => {
    setExpanded(!value)
  }

  return (
    <div className="barchart__legend-item">
      <div
        className="barchart__legend-header"
        style={{
          justifyContent: "space-between",
          marginBottom: "12px",
        }}
        onClick={() => toggleExpanded(expanded)}
      >
        <div className="barchart__legend-title-expandable">
          Collateral Obligations
        </div>
        {expanded ? (
          <ExpandMore className="transform rotate-180 h-[18px] w-[18px]" />
        ) : (
          <ExpandMore className="h-[18px] w-[18px]" />
        )}
      </div>
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
            {formatTokenWithCommas(market.delinquentDebt, {
              withSymbol: true,
            })}
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
              {reserves &&
                formatTokenWithCommas(reserves, {
                  withSymbol: true,
                })}
            </div>
          </div>
        </div>
      </div>
      {expanded && (
        <>
          <div>
            <CollateralObligationsData
              market={market}
              withdrawals={withdrawals}
              doubleDivider
            />
          </div>
          <div>
            {formatTokenWithCommas(legendItem.value, {
              withSymbol: true,
            })}
          </div>
        </>
      )}
    </div>
  )
}
