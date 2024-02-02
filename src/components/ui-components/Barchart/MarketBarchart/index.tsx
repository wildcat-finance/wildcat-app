import "./styles.css"

import cn from "classnames"
import { MarketBarChartProps } from "./interface"

export const MarketBarchart = ({ data }: MarketBarChartProps) => (
  <div className="barchart__container">
    {data.map((chartItem) => (
      <div
        key={chartItem.label}
        className="barchart__item"
        style={{
          width: `${chartItem.width}`,
          minWidth: "0.6%",
          backgroundColor: `${chartItem.color}`,
          position: "relative",
        }}
      >
        {chartItem.overlayClassName && (
          <div
            className={cn("barchart__overlay", chartItem.overlayClassName)}
            style={{
              width: chartItem.overlayWidth,
            }}
          />
        )}
        <div style={{ color: `${chartItem.textColor}` }}>
          {!(Number(chartItem.width) <= 7.5) && (
            <div>
              {chartItem.value} {chartItem.asset}
            </div>
          )}
        </div>
      </div>
    ))}
  </div>
)
