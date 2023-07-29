import { useQuery } from "@tanstack/react-query";
import {
  Token,
  Signer,
} from "@wildcatfi/wildcat-sdk";
import { useEthersSigner } from "../../common/hooks";

export function useTokenMetadata({ address } : { address: string | undefined }) {
  const signer = useEthersSigner();

  async function getToken() {
    console.log(`Getting token metadata for ${address}`)
    if (address !== undefined && signer !== undefined && address.length === 42) {
      const token = await Token.getTokenData(address, signer as Signer);
      console.log(token);
      return token;
    }
    return undefined;
  }

  return useQuery({
    queryKey: ["tokenMetadata", address],
    queryFn: getToken,
    enabled: address !== undefined && signer !== undefined && address.length === 42,
    initialData: undefined as Token | undefined,
    refetchOnMount: false,
  });
}
