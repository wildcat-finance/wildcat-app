import cn from "classnames"
import { CardProps } from "./interface"

export function Paper({ className, children }: CardProps) {
  const cardClassName = cn(className, "rounded-md border border-border-black")
  return <div className={cardClassName}>{children}</div>
}
