import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import {
  getAllVaultAccountsForUser,
  Signer,
  VaultAccount,
} from "@wildcatfi/wildcat-sdk";
import { useEthersSigner } from "../../common/hooks";

export function useAllVaultsForUser() {
  const { address } = useAccount();
  const signer = useEthersSigner();

  async function getVaultsForUser() {
    return (await getAllVaultAccountsForUser(
      signer as Signer
    )) as VaultAccount[];
  }

  return useQuery({
    queryKey: ["vaultsForUser", address],
    queryFn: getVaultsForUser,
    enabled: !!address && !!signer,
    initialData: [] as VaultAccount[],
    refetchOnMount: false,
  });
}
