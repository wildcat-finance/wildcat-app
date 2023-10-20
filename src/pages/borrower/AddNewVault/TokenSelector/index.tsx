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

export function TokenSelector({ className }: TokenSelectorProps) {
  const [selectedTokenAddress, setSelectedTokenAddress] =
    useState<ComboboxItem | null>(null)
  const { filterByName, filteredTokens } = useTokensList()

  const options = tokensToOptions(filteredTokens)

  return (
    <div className={className}>
      <Combobox
        onSelect={(option) => setSelectedTokenAddress(option)}
        onSearch={filterByName}
        value={selectedTokenAddress}
        options={options}
      />
    </div>
  )
}
