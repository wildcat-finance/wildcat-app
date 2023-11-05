import { useState } from "react"

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

export function TokenSelector({ className, onChange }: TokenSelectorProps) {
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
        onSelect={handleSelect}
        onSearch={filterByName}
        value={selectedTokenAddress}
        options={options}
      />
    </div>
  )
}
