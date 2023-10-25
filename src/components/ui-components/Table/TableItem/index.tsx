import React, { ReactNode } from "react"
import cn from "classnames"

export function TableItem({
  children,
  justify,
}: {
  children: ReactNode
  justify: "start" | "center" | "end"
}) {
  return (
    <td className="first:pl-6 last:pr-6">
      <div
        className={cn(
          "flex items-center text-black text-xs",
          `justify-${justify}`,
        )}
      >
        <div>{children}</div>
      </div>
    </td>
  )
}
