import { TooltipProps as AriaTooltipProps } from "react-aria-components"

export type TooltipContentProps = Omit<AriaTooltipProps, "children"> & {
  children: React.ReactNode
}

export type TooltipProps = Omit<AriaTooltipProps, "children"> & {
  children?: React.ReactNode
  content: React.ReactNode
}
