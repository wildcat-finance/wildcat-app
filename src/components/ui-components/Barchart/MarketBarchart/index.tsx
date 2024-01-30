import "./styles.css"

import { MarketBarChartProps } from "./interface"

export const MarketBarchart = ({ data }: MarketBarChartProps) => (
  <div className="barchart__container">
    {data.map((chartItem) => (
      <div
        key={chartItem.label}
        className="barchart__item"
        style={{
          width: `${chartItem.width}`,
          minWidth: "5px",
          backgroundColor: `${chartItem.color}`,
        }}
      >
        <div style={{ color: `${chartItem.textColor}` }}>
          {chartItem.label === "Non-collateral Interest" ? (
            <div />
          ) : (
            <div>
              {chartItem.value} {chartItem.asset}
            </div>
          )}
        </div>
      </div>
    ))}
  </div>
)
