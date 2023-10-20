import {
  Button,
  OverlayArrow,
  TooltipTrigger,
  Tooltip as TooltipArea,
} from "react-aria-components"

import { HelpIcon } from "../icons"
import { TooltipContentProps, TooltipProps } from "./interface"

export function TooltipContent({ children, ...props }: TooltipContentProps) {
  return (
    <TooltipArea
      {...props}
      className="w-48 ml-4 p-3 text-xxs bg-silver-200 shadow-xl"
    >
      <OverlayArrow>
        <div className="relative -top-1/2 -right-1/2 w-5 h-5 -rotate-45 bg-silver-200" />
      </OverlayArrow>
      {children}
    </TooltipArea>
  )
}

export function Tooltip({ content, placement, ...props }: TooltipProps) {
  return (
    <TooltipTrigger delay={0}>
      <Button className="w-3 outline-none">
        <HelpIcon />
      </Button>
      <TooltipContent {...props} placement={placement || "right"}>
        {content}
      </TooltipContent>
    </TooltipTrigger>
  )
}
