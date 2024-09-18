/* eslint-disable react/jsx-no-script-url */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import cn from "classnames"
import { TableItemProps } from "./interface"
import { Tooltip } from "../Tooltip"

export function TableItem({
  children,
  title,
  value,
  className: _className,
  valueClassName: _valueClassName,
  valueTooltip,
  titleClassName: _titleClassName,
  titleTooltip,
}: TableItemProps) {
  const className = cn(
    _className,
    "w-full flex px-3 items-center flex-row h-9 leading-8 odd:bg-tint-9 even:bg-tint-10 justify-between",
  )
  const titleClassName = cn(
    _titleClassName,
    "inline text-black text-xs font-bold",
  )
  const valueClassName = cn(
    _valueClassName,
    "inline text-black text-xs text-right",
  )

  return (
    <div className={className}>
      {(title || value) && (
        <>
          <div className={titleClassName}>
            {titleTooltip ? (
              <Tooltip content={titleTooltip}>{title}</Tooltip>
            ) : (
              title
            )}
          </div>
          <div className={valueClassName}>
            {valueTooltip ? (
              <Tooltip content={valueTooltip}>{value}</Tooltip>
            ) : (
              value
            )}
          </div>
        </>
      )}
      {children}
    </div>
  )
}

export default TableItem
