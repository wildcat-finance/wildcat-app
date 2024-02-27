import { Tooltip } from "../Tooltip"
import { formatTokenWithCommas } from "../../../utils/formatters"
import { TokenAmountTooltipProps } from "./interface"

export const TokenAmountTooltip = ({
  children,
  value,
  symbol,
}: TokenAmountTooltipProps) => (
  <div className="flex">
    <Tooltip
      content={
        <div>
          {formatTokenWithCommas(value, {
            fractionDigits: value.decimals,
          })}
          {symbol && ` ${symbol}`}
        </div>
      }
    >
      <span>{children}</span>
    </Tooltip>
  </div>
)
