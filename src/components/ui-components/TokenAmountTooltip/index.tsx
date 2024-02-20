import { Tooltip } from "../Tooltip"
import { formatTokenWithCommas } from "../../../utils/formatters"
import { TokenAmountTooltipProps } from "./interface"

export const TokenAmountTooltip = ({
  children,
  value,
  withSymbol = true,
  symbol,
}: TokenAmountTooltipProps) => (
  <Tooltip
    content={
      <div>
        {formatTokenWithCommas(value, {
          withSymbol,
          fractionDigits: value.decimals,
        })}{" "}
        {symbol}
      </div>
    }
  >
    <div style={{ display: "flex" }}>{children}</div>
  </Tooltip>
)
