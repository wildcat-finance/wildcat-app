import { forwardRef, useState } from "react"

import { Combobox } from "../../../../components/ui-components"
import { TokenSelectorProps } from "./interface"
import { ComboboxItem } from "../../../../components/ui-components/Combobox/interface"
import { useTokenSelector } from "./hooks/useTokenSelector"

export const TokenSelector = forwardRef<HTMLInputElement, TokenSelectorProps>(
  ({ className, onChange, onBlur, error, setError }, ref) => {
    const [selectedToken, setSelectedTokenAddress] =
      useState<ComboboxItem | null>(null)

    const handleSelect = (option: ComboboxItem) => {
      setSelectedTokenAddress(option)
      onChange(option.value)
    }
    const { options, onTokenSearch } = useTokenSelector(handleSelect, setError)

    return (
      <div className={className}>
        <Combobox
          ref={ref}
          onSelect={handleSelect}
          onSearch={onTokenSearch}
          onBlur={onBlur}
          value={selectedToken}
          error={error}
          options={options}
        />
      </div>
    )
  },
)
