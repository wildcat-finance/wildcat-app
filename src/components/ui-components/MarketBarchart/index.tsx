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
          backgroundColor: `${chartItem.color}`,
        }}
      >
        {chartItem.value} {chartItem.asset}
      </div>
    ))}
  </div>
)
