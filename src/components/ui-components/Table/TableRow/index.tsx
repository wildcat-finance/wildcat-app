import React, { ReactNode } from "react"

export default function TableRow({ children }: { children: ReactNode }) {
  return <tr className="h-9 odd:bg-tint-9 even:bg-tint-10">{children}</tr>
}
