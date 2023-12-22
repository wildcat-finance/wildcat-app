import React, { ReactNode } from "react"

export function TableRow({ children }: { children: ReactNode }) {
  return <tr className="h-9 bg-tint-10">{children}</tr>
}
