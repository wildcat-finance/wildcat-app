import { useQuery } from "@tanstack/react-query"
import { Token, Signer } from "@wildcatfi/wildcat-sdk"
import { useEthersSigner } from "../../../modules/hooks"

const TOKEN_METADATA_KEY = "tokenMetadata"

export function useTokenMetadata({ address }: { address: string | undefined }) {
  const signer = useEthersSigner()

  async function getToken() {
    if (
      address !== undefined &&
      signer !== undefined &&
      address.length === 42
    ) {
      const token = await Token.getTokenData(address, signer as Signer)
      return token
    }
    return undefined
  }

  return useQuery({
    queryKey: [TOKEN_METADATA_KEY, address],
    queryFn: getToken,
    enabled:
      address !== undefined && signer !== undefined && address.length === 42,
    initialData: undefined as Token | undefined,
    refetchOnMount: false,
  })
}
