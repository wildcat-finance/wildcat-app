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
  className,
  valueTooltip,
  titleTooltip,
}: TableItemProps) {
  const itemClassName = cn(
    className,
    "w-full flex px-3 items-center flex-row h-9 leading-8 odd:bg-tint-9 even:bg-tint-10 justify-between",
  )

  return (
    <div className={itemClassName}>
      {(title || value) && (
        <>
          <div className="inline text-black text-xs font-bold">
            {titleTooltip ? (
              <Tooltip content={titleTooltip}>{title}</Tooltip>
            ) : (
              title
            )}
          </div>
          <div className="inline text-black text-xs text-right">
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
