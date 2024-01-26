import { useState } from "react"
import { ExpandMore } from "../icons"
import { MarketBarChartProps } from "./interface"
import "./styles.css"

export const MarketBarchartLegend = ({ data }: MarketBarChartProps) => {
  const [showObligations, setShowObligations] = useState(false)

  const toggleShowObligations = (value: boolean) => {
    setShowObligations(!value)
  }

  return (
    <div className="barchart__legend">
      {data.map((chartItem) => (
        <div key={chartItem.label} className="barchart__legend-item">
          {chartItem.label === "Collateral Obligations" ? (
            <>
              <div
                className="barchart__legend-header"
                style={{
                  justifyContent: "space-between",
                  marginBottom: `${showObligations ? "8px" : "24px"}`,
                }}
                onClick={() => toggleShowObligations(showObligations)}
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
                {showObligations ? (
                  <ExpandMore className="transform rotate-180 h-[18px] w-[18px]" />
                ) : (
                  <ExpandMore className="h-[18px] w-[18px]" />
                )}
              </div>
              {showObligations && (
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
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      ))}
    </div>
  )
}
