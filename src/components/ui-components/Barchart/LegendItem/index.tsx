import { useState } from "react"
import { ExpandMore } from "../../icons"
import { LegendItemProps } from "./interface"
import "./styles.css"

export const LegendItem = ({
  chartItem,
  type = "default",
  children,
}: LegendItemProps) => {
  const [expanded, setExpanded] = useState(false)

  const toggleExpanded = (value: boolean) => {
    setExpanded(!value)
  }

  switch (type) {
    case "extended":
      return <div style={{ width: "50%" }}>{children}</div>
    case "expandable":
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

          {expanded && children}

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
