import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import {
  getAllVaultAccounts,
  Signer,
  VaultAccount,
} from "@wildcatfi/wildcat-sdk";
import { useEthersSigner } from "../../common/hooks";

export function useAllVaultsForUser() {
  const { address } = useAccount();
  const signer = useEthersSigner();

  async function getVaultsForUser() {
    const vaultAccounts = (await getAllVaultAccounts(
      signer as Signer,
      address as string
    )) as VaultAccount[];
    const score = (acct: VaultAccount) => {
      const b = acct.isBorrower ? 4 : 0;
      const u = acct.userHasUnderlyingBalance ? 1 : 0;
      const v = acct.userHasBalance ? 2 : 0;
      return b + u + v;
    };
    vaultAccounts.sort((a, b) => {
      let aScore = score(a);
      let bScore = score(b);
      return bScore - aScore
    });
    return vaultAccounts;
  }

  return useQuery({
    queryKey: ["vaultsForUser", address],
    queryFn: getVaultsForUser,
    enabled: !!address && !!signer,
    initialData: [] as VaultAccount[],
    refetchOnMount: false,
  });
}
