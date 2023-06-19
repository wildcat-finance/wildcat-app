import { useQuery } from "@tanstack/react-query";
import { getAllVaults, Vault } from "@wildcatfi/wildcat-sdk";
import { useProvider } from "./useProvider";

export function useAllVaultsQuery() {
  const provider = useProvider();

  const handleVaults = async () => await getAllVaults(provider);

  return useQuery({
    queryKey: ["allVaults"],
    queryFn: handleVaults,
    initialData: [] as Vault[],
    refetchOnMount: false,
  });
}
