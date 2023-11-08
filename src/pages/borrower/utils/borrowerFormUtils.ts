import { MarketParameterConstraints } from "@wildcatfi/wildcat-sdk"

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
    min: constraints && constraints[minKey] ? constraints[minKey] / 100 : 0,
    max:
      constraints && constraints[maxKey]
        ? constraints[maxKey] / 100
        : undefined,
  }
}