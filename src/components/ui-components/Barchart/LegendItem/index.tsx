import { useState } from "react"
import cn from "classnames"
import { ExpandMore } from "../../icons"
import { LegendItemProps } from "./interface"
import "./styles.css"
import {
  formatTokenWithCommas,
  TOKEN_FORMAT_DECIMALS,
} from "../../../../utils/formatters"

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
      return <div className="barchart__legend-item-extended">{children}</div>
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
            <div className="barchart__legend-title-expandable">
              {chartItem.label}
              <div
                className={cn(
                  "barchart__legend-dot",
                  chartItem.legendDotClassName,
                )}
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
            {formatTokenWithCommas(chartItem.value, {
              fractionDigits: TOKEN_FORMAT_DECIMALS,
            })}{" "}
            {chartItem.asset}
          </div>
        </div>
      )
    default:
      return (
        <div className="barchart__legend-item">
          <div className="barchart__legend-header">
            {chartItem.label}
            <div
              className={cn(
                "barchart__legend-dot",
                chartItem.legendDotClassName,
              )}
              style={{
                backgroundColor: `${chartItem.color}`,
              }}
            />
          </div>
          <div>
            {formatTokenWithCommas(chartItem.value, {
              fractionDigits: TOKEN_FORMAT_DECIMALS,
            })}{" "}
            {chartItem.asset}
          </div>
        </div>
      )
  }
}
