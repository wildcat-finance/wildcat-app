import { useButton } from "react-aria"
import { useRef } from "react"
import cn from "classnames"

import "./styles.css"
import { ButtonProps } from "./interface"

export function Button({
  variant = "black",
  children,
  className,
  icon,
  onClick,
  ...restProps
}: ButtonProps) {
  const ref = useRef(null)
  const { buttonProps } = useButton(restProps, ref)

  const cssClass = cn(
    "text-white text-xxs min-w-18 h-8 px-5 rounded-full",
    "flex items-center justify-center",
    `wc-btn-${variant}`,
    { "bg-gray cursor-not-allowed": buttonProps.disabled },
    { "gap-2.5": icon },
    className,
  )

  return (
    <button {...buttonProps} ref={ref} className={cssClass} onClick={onClick}>
      {children}
      {icon}
    </button>
  )
}
