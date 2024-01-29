import { MarketBarChartProps } from "./interface"
import "./styles.css"
import { LegendItem } from "../LegendItem"
import { DoubleLegendItem } from "../DoubleLegendItem"

export const MarketBarchartLegend = ({ data }: MarketBarChartProps) => (
  <div className="barchart__legend">
    {data.map((chartItem) => (
      <LegendItem
        key={chartItem.label}
        chartItem={chartItem}
        expandable={chartItem.label === "Collateral Obligations"}
      />
    ))}
  </div>
)
