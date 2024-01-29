import { useState } from "react"
import { ExpandMore } from "../../icons"
import { LegendItemProps } from "./type"
import "./styles.css"

export const LegendItem = ({ chartItem, expandable }: LegendItemProps) => {
  const [expanded, setExpanded] = useState(false)

  const toggleExpanded = (value: boolean) => {
    setExpanded(!value)
  }

  switch (expandable) {
    case true:
      return (
        <div className="barchart__legend-item">
          <div
            className="barchart__legend-header"
            style={{
              justifyContent: "space-between",
              marginBottom: `${expanded ? "8px" : "24px"}`,
            }}
            onClick={() => toggleExpanded(expanded)}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                columnGap: "8px",
              }}
            >
              {chartItem.label}
              <div
                className="barchart__legend-dot"
                style={{
                  backgroundColor: `${chartItem.color}`,
                }}
              />
            </div>
            {expanded ? (
              <ExpandMore className="transform rotate-180 h-[18px] w-[18px]" />
            ) : (
              <ExpandMore className="h-[18px] w-[18px]" />
            )}
          </div>
          {expanded && (
            <div className="barchart__legend-obligations-values-container">
              <div className="barchart__legend-obligations-value">
                <div>{chartItem.asset}</div>
                <div>Min Reserves</div>
              </div>
              <div className="barchart__legend-obligations-value">
                <div>{chartItem.asset}</div>
                <div>Ongoing WDs</div>
              </div>
              <div className="barchart__legend-obligations-value">
                <div>{chartItem.asset}</div>
                <div>Claimable WDs</div>
              </div>
              <div className="barchart__legend-obligations-value">
                <div>{chartItem.asset}</div>
                <div>Outstanding WDs</div>
              </div>
              <div className="barchart__legend-divider" />
            </div>
          )}
          <div>
            {chartItem.value} {chartItem.asset}
          </div>
        </div>
      )
    default:
      return (
        <div className="barchart__legend-item">
          <div className="barchart__legend-header">
            {chartItem.label}
            <div
              className="barchart__legend-dot"
              style={{
                backgroundColor: `${chartItem.color}`,
              }}
            />
          </div>
          <div>
            {chartItem.value} {chartItem.asset}
          </div>
        </div>
      )
  }
}
