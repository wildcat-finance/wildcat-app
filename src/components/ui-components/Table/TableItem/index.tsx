import React, { ReactNode } from "react"
import cn from "classnames"

export function TableItem({
  children,
  align,
}: {
  children: ReactNode
  align: "start" | "center" | "end"
}) {
  return (
    <td className="first:pl-6 last:pr-6">
      <div
        className={cn(
          "flex items-center inline text-black text-xs",
          `justify-${align}`,
        )}
      >
        {children}
      </div>
    </td>
  )
}
