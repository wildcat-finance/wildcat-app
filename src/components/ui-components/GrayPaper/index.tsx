import cn from "classnames"
import { CardProps } from "./interface"

export function GrayPaper({ className, children }: CardProps) {
  const cardClassName = cn(
    className,
    "bg-gray p-2.5 flex justify-center items-center gap-10",
  )
  return <div className={cardClassName}>{children}</div>
}
