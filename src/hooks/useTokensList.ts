import { useState, useMemo } from "react"

import TOKENS_LIST from "../config/tokenlist.json"
import { TokenMeta } from "../types/tokens"
import { useCurrentNetwork } from "./useCurrentNetwork"

function sortingFunctionByName(a: TokenMeta, b: TokenMeta) {
  const nameA = a.name.toLowerCase()
  const nameB = b.name.toLowerCase()

  if (nameA < nameB) {
    return -1
  }
  if (nameA > nameB) {
    return 1
  }
  return 0
}

export const useTokensList = () => {
  const [initialTokensList] = useState<TokenMeta[]>(TOKENS_LIST.tokens)
  const [filteredTokens, setFilteredTokens] = useState<TokenMeta[]>([])
  const { chainId } = useCurrentNetwork()

  const tokensByChainId = useMemo(
    () => initialTokensList.filter((token) => token.chainId === chainId),
    [initialTokensList, chainId],
  )

  const filterByName = (searchName: string) => {
    if (searchName.length > 1) {
      const filtered = tokensByChainId
        .filter((token) =>
          token.name.toLowerCase().includes(searchName.toLowerCase()),
        )
        .sort(sortingFunctionByName)

      setFilteredTokens(filtered)
    } else if (filteredTokens.length > 0) {
      setFilteredTokens([])
    }
  }

  return {
    tokensByChainId,
    filterByName,
    filteredTokens,
    allTokens: tokensByChainId,
  }
}
