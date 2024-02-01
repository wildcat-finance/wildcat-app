import { useState } from "react"
import { ExpandMore } from "../../../../../../components/ui-components/icons"

import "./styles.css"
import { DelinquentCollateralObligationsProps } from "./interface"

export const DelinquentCollateralObligations = ({
  market,
  legendItem,
  children,
}: DelinquentCollateralObligationsProps) => {
  const [expanded, setExpanded] = useState(false)

  const toggleExpanded = (value: boolean) => {
    setExpanded(!value)
  }

  return (
    <div className="double-item__container">
      <div
        className="double-item__header"
        style={{ justifyContent: "space-between", marginBottom: "12px" }}
        onClick={() => toggleExpanded(expanded)}
      >
        <div>{legendItem.label}</div>
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
                backgroundColor: "#F1464B",
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
                backgroundColor: "#F7BEC1",
              }}
            />
          </div>
          <div>
            <div>
              {market.coverageLiquidity.toFixed(2)} {legendItem.asset}
            </div>
          </div>
        </div>
      </div>
      {expanded && (
        <div className="double-item__values-container">
          {children}
          <div style={{ fontSize: "12px" }}>
            {legendItem.value} {legendItem.asset}
          </div>
        </div>
      )}
    </div>
  )
}
