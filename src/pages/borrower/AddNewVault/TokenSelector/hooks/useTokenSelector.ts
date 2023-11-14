import { useState } from "react"

import { utils } from "ethers"
import { Signer, Token } from "@wildcatfi/wildcat-sdk"

import { useEthersSigner } from "../../../../../modules/hooks"
import { useTokensList } from "../../../../../hooks/useTokensList"

import { TokenMeta } from "../../../../../types/tokens"
import { ComboboxItem } from "../../../../../components/ui-components/Combobox/interface"

function tokensToOptions(tokens: TokenMeta[]) {
  return tokens.map((token) => ({
    id: token.address,
    label: token.name,
    value: token.address,
    icon: token.logoURI,
  }))
}

export const useTokenSelector = (
  onChange: (option: ComboboxItem) => void,
  setError: (message: string) => void,
) => {
  const { tokensByChainId } = useTokensList()
  const [options, setOptions] = useState<ComboboxItem[]>(
    tokensToOptions(tokensByChainId),
  )

  const signer = useEthersSigner()

  const onTokenSearch = (input: string) => {
    if (input === "") {
      setOptions(tokensToOptions(tokensByChainId))
      onChange({ id: "", label: "", value: "", icon: "" })
      return
    }
    if (utils.isAddress(input)) {
      Token.getTokenData(input, signer as Signer)
        .then((tokenData) => {
          const newToken = {
            id: tokenData.address,
            label: tokenData.name,
            value: tokenData.address,
            icon: "",
          }
          setOptions([newToken])
        })
        .catch(() => {
          setOptions([])
          setError("Token address is not valid")
        })
    } else if (input.toLowerCase().startsWith("0x")) {
      const optionData = tokensToOptions(tokensByChainId)?.filter((option) =>
        option.value.toLowerCase().startsWith(input.toLowerCase()),
      )
      setOptions(optionData)
    } else {
      const optionData = tokensToOptions(tokensByChainId)?.filter((option) =>
        option.label.toLowerCase().startsWith(input.toLowerCase()),
      )
      setOptions(optionData)
    }
  }

  return {
    options,
    onTokenSearch,
  }
}
