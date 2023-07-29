import { useQuery } from "@tanstack/react-query";
import { getAllVaultsData, Vault } from "@wildcatfi/wildcat-sdk";
import { useProvider } from "./useProvider";

export function useAllVaultsQuery() {
  const provider = useProvider();

  const handleVaults = async () => {
    const allVaults = await getAllVaultsData(provider);
    console.log(allVaults);
    return allVaults;
  };

  return useQuery({
    queryKey: ["allVaults"],
    queryFn: handleVaults,
    initialData: [] as Vault[],
    onError(e) {
      console.log(e);
    },
  });
}
