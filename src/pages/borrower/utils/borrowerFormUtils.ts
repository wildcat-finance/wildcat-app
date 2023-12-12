import { MarketParameterConstraints } from "@wildcatfi/wildcat-sdk"
import { formatConstrainToNumber } from "../../../utils/formatters"

export function getMinMaxFromConstraints(
  constraints: MarketParameterConstraints | undefined,
  field: string,
) {
  const fieldNameFormatted = `${field[0].toUpperCase()}${field.slice(1)}`
  const minKey =
    `minimum${fieldNameFormatted}` as keyof MarketParameterConstraints
  const maxKey =
    `maximum${fieldNameFormatted}` as keyof MarketParameterConstraints

  return {
    min:
      constraints && constraints[minKey]
        ? formatConstrainToNumber(constraints, minKey)
        : 0,
    max:
      constraints && constraints[maxKey]
        ? formatConstrainToNumber(constraints, maxKey)
        : undefined,
  }
}
