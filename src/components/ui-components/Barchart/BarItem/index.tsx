import { useLayoutEffect, useRef, useState } from "react"
import cn from "classnames"

import { BarItemProps } from "./interface"

import "./style.css"
import { formatTokenWithCommas } from "../../../../utils/formatters"

export const BarItem = ({ chartItem, isOnlyBarItem }: BarItemProps) => {
  const [shouldDisplayValue, setShouldDisplayValue] = useState(true)

  const outerContainerRef = useRef<HTMLDivElement>(null)
  const innerContainerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const outerContainerWidth =
      outerContainerRef.current?.getBoundingClientRect().width
    const innerContainerWidth =
      innerContainerRef.current?.getBoundingClientRect().width

    if (outerContainerWidth && innerContainerWidth) {
      if (innerContainerWidth > outerContainerWidth) {
        setShouldDisplayValue(false)
      } else {
        setShouldDisplayValue(true)
      }
    }
  }, [chartItem.width])

  return (
    <div
      ref={outerContainerRef}
      className="barchart__item"
      style={
        isOnlyBarItem
          ? {
              width: "100%",
              minWidth: "0.6%",
              backgroundColor: `${chartItem.color}`,
              position: "relative",
              borderRadius: "8px",
            }
          : {
              width: `${chartItem.width}%`,
              minWidth: "0.6%",
              backgroundColor: `${chartItem.color}`,
              position: "relative",
            }
      }
    >
      {chartItem.overlayClassName && (
        <div
          className={cn("barchart__overlay", chartItem.overlayClassName)}
          style={{
            width: chartItem.overlayWidth,
          }}
        />
      )}
      <div
        ref={innerContainerRef}
        style={{
          color: `${chartItem.textColor}`,
          width: "min-content",
        }}
      >
        {shouldDisplayValue && (
          <div>
            {formatTokenWithCommas(chartItem.value, {
              forceSignificantDigits: true,
            })}
          </div>
        )}
      </div>
    </div>
  )
}
