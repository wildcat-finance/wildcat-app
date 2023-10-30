import React, { ReactNode } from "react"
import cn from "classnames"

export function TableCell({
  children,
  justify,
}: {
  children: ReactNode
  justify: string
}) {
  return (
    <td className="first:pl-6 last:pr-6">
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
