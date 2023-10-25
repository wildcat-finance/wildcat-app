import React from "react"
import cn from "classnames"

export default function Table({
  headers,
  children,
}: {
  headers: {
    title: string
    align: "start" | "center" | "end"
    className?: string
  }[]
  children?: React.ReactNode
}) {
  return (
    <table className="w-full border-collapse">
      <tr className="bg-tint-9 h-9">
        {headers.map((header) => (
          <th
            className={cn(
              `${header.className}`,
              "text-black first:pl-6 last:pr-6 text-xs font-bold",
            )}
          >
            <div className={cn("flex items-center", `justify-${header.align}`)}>
              {header.title}
            </div>
          </th>
        ))}
      </tr>
      {children}
    </table>
  )
}
