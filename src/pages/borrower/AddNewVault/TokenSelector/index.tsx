import { forwardRef, useState } from "react"

import { Combobox } from "../../../../components/ui-components"
import { useTokensList } from "../../../../hooks/useTokensList"
import { TokenMeta } from "../../../../types/tokens"
import { TokenSelectorProps } from "./interface"
import { ComboboxItem } from "../../../../components/ui-components/Combobox/interface"

function tokensToOptions(tokens: TokenMeta[]) {
  return tokens.map((token) => ({
    id: token.address,
    label: token.name,
    value: token.address,
    icon: token.logoURI,
  }))
}

export const TokenSelector = forwardRef<HTMLInputElement, TokenSelectorProps>(
  ({ className, onChange, onBlur, error }, ref) => {
    const [selectedTokenAddress, setSelectedTokenAddress] =
      useState<ComboboxItem | null>(null)
    const { filterByName, filteredTokens } = useTokensList()

    const options = tokensToOptions(filteredTokens)

    const handleSelect = (option: ComboboxItem) => {
      setSelectedTokenAddress(option)
      onChange(option.value)
    }

    return (
      <div className={className}>
        <Combobox
          ref={ref}
          onSelect={handleSelect}
          onSearch={filterByName}
          onBlur={onBlur}
          value={selectedTokenAddress}
          error={error}
          options={options}
        />
      </div>
    )
  },
)
