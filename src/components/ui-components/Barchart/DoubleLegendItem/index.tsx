import { useState } from "react"
import { ExpandMore } from "../../icons"
import { DoubleLegendItemProps } from "./interface"
import "./styles.css"

export const DoubleLegendItem = ({ chartItem }: DoubleLegendItemProps) => {
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
        <div>Collateral Obligations</div>
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
                backgroundColor: `${chartItem.color}`,
              }}
            />
          </div>
          <div>
            {chartItem.value} {chartItem.asset}
          </div>
        </div>
        <div className="double-item__divider-vertical" />
        <div style={{ width: "100%" }}>
          <div className="double-item__header">
            <div>Delinquent Debt</div>
            <div
              className="double-item__dot"
              style={{
                backgroundColor: `${chartItem.color}`,
              }}
            />
          </div>
          <div>
            {chartItem.value} {chartItem.asset}
          </div>
        </div>
      </div>
      {expanded && (
        <div className="double-item__values-container">
          <div className="double-item__divider-horizontal" />
          <div className="double-item__value">
            <div>{chartItem.asset}</div>
            <div>Min Reserves</div>
          </div>
          <div className="double-item__value">
            <div>{chartItem.asset}</div>
            <div>Ongoing WDs</div>
          </div>
          <div className="double-item__value">
            <div>{chartItem.asset}</div>
            <div>Claimable WDs</div>
          </div>
          <div className="double-item__value">
            <div>{chartItem.asset}</div>
            <div>Outstanding WDs</div>
          </div>
          <div className="double-item__divider-horizontal" />
          <div style={{ fontSize: "12px" }}>
            {chartItem.value} {chartItem.asset}
          </div>
        </div>
      )}
    </div>
  )
}
