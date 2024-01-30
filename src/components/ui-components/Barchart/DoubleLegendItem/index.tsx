import { useState } from "react"
import { ExpandMore } from "../../icons"
import { DoubleLegendItemProps } from "./interface"
import "./styles.css"

export const DoubleLegendItem = ({
  firstChartItem,
  secondChartItem,
  total,
  children,
}: DoubleLegendItemProps) => {
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
            <div>{firstChartItem.label}</div>
            <div
              className="double-item__dot"
              style={{
                backgroundColor: `${firstChartItem.color}`,
              }}
            />
          </div>
          <div>
            {firstChartItem.value} {firstChartItem.asset}
          </div>
        </div>
        <div className="double-item__divider-vertical" />
        <div style={{ width: "100%" }}>
          <div className="double-item__header">
            <div>{secondChartItem.label}</div>
            <div
              className="double-item__dot"
              style={{
                backgroundColor: `${secondChartItem.color}`,
              }}
            />
          </div>
          <div>
            {secondChartItem.value} {secondChartItem.asset}
          </div>
        </div>
      </div>
      {expanded && (
        <div className="double-item__values-container">
          <div className="double-item__divider-horizontal" />
          {children}
          <div className="double-item__divider-horizontal" />
          <div style={{ fontSize: "12px" }}>
            {total} {firstChartItem.asset}
          </div>
        </div>
      )}
    </div>
  )
}
