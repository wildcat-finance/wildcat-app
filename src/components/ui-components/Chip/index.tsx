import cn from "classnames"

import { ChipProps } from "./interface"

const CHIP_COLORS = {
  default: "bg-tint-9",
  gray: "bg-gray",
  red: "bg-red text-white",
  yellow: "bg-yellow",
  green: "bg-green",
  white: "bg-white",
  "tint-9": "bg-tint-9",
}

export function Chip(props: ChipProps) {
  const { className, color = "default", children } = props

  const cssClass = cn(
    CHIP_COLORS[color],
    "h-8 px-2 flex items-center text-xxs",
    className,
  )

  return (
    <div onClick={props.onClick} className={cssClass}>
      {children}
    </div>
  )
}
