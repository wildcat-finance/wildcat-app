import "./styles.css"

import { MarketBarchartProps } from "./type"

export const MarketBarchart = ({ data }: { data: MarketBarchartProps[] }) => (
  <div className="component__container">
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

    <div className="barchart__legend">
      {data.map((chartItem) => (
        <div key={chartItem.label} className="barchart__legend-item">
          <div
            className="barchart__legend-dot"
            style={{
              backgroundColor: `${chartItem.color}`,
            }}
          />
          {chartItem.label}: {chartItem.value} {chartItem.asset}
        </div>
      ))}
    </div>
  </div>
)
