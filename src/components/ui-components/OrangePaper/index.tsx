import cn from "classnames"
import { CardProps } from "./interface"

export function OrangePaper({ className, children }: CardProps) {
  const cardClassName = cn(
    className,
    "p-2.5 flex justify-center items-center gap-10",
  )
  return (
    <div className={cardClassName} style={{ backgroundColor: "#FF5733" }}>
      {children}
    </div>
  )
}
