import cn from "classnames"
import { CardProps } from "./interface"

export function BluePaper({ className, children }: CardProps) {
  const cardClassName = cn(
    className,
    "bg-cian p-2.5 flex justify-center items-center gap-10",
  )
  return <div className={cardClassName}>{children}</div>
}
