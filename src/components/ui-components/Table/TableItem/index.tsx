import React, { ReactNode } from "react"
import cn from "classnames"

export function TableCell({
  children,
  justify,
  rowSpan,
  className,
}: {
  children: ReactNode
  justify: string
  rowSpan?: number
  className?: string
}) {
  const cellClassName = cn(`${className}`, "first:pl-6 last:pr-6")

  return (
    <td className={cellClassName} rowSpan={rowSpan || 1}>
      <div
        className={cn(
          `justify-${justify}`,
          "flex items-center text-black text-xs",
        )}
      >
        <div>{children}</div>
      </div>
    </td>
  )
}
