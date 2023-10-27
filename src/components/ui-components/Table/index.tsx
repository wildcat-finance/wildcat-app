import React from "react"
import cn from "classnames"

export default function Table({
  headers,
  children,
  showHeader = true,
}: {
  showHeader?: boolean
  headers:
    | {
        title: string
        align: string
        className?: string
      }[]
    | number
  children?: React.ReactNode
}) {
  return (
    <table className="w-full border-collapse">
      {showHeader && (
        <tr className="bg-tint-9 h-9">
          {Array.isArray(headers)
            ? headers.map((header) => (
                <th
                  className={cn(
                    `${header.className}`,
                    "text-black first:pl-6 last:pr-6 text-xs font-bold",
                  )}
                >
                  <div
                    className={cn(
                      `justify-${header.align}`,
                      "flex items-center",
                    )}
                  >
                    <div>{header.title}</div>
                  </div>
                </th>
              ))
            : Array.from(Array(headers).keys()).map((item) => (
                <th
                  className="text-black first:pl-6 last:pr-6 text-xs font-bold"
                  key={item}
                >
                  {item}
                </th>
              ))}
        </tr>
      )}
      {children}
    </table>
  )
}
