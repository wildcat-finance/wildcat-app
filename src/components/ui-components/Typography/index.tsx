import cn from "classnames"

import "./styles.css"
import { TypographyProps } from "./interface"

export const Typography = ({
  variant,
  className,
  children,
}: TypographyProps) => {
  const rootClassname = cn(`wc-typo-${variant}`, className)

  return <div className={rootClassname}>{children}</div>
}
