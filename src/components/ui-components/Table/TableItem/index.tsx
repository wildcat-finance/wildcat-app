import React, { ReactNode } from "react"
import cn from "classnames"

export function TableCell({
  children,
  justify,
  className,
  containerClassName,
  ...rest
}: {
  children?: ReactNode
  justify?: string
  className?: string
  rowSpan?: number
  colSpan?: number
  style?: React.CSSProperties
  containerClassName?: string
}) {
  const cellClassName = cn("first:pl-6 last:pr-6", className)

  return (
    <td className={cellClassName} {...rest}>
      <div
        className={cn(
          { [`justify-${justify}`]: justify },
          "flex items-center text-black text-xs",
        )}
      >
        <div className={containerClassName}>{children}</div>
      </div>
    </td>
  )
}
