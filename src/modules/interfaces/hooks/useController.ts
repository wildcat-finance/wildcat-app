import { useCallback, useEffect, useRef, useMemo } from "react";
import { VaultController } from "@wildcatfi/wildcat-sdk";
import { useAllVaultsQuery } from "./useAllVaultsQuery";
import { useProvider } from "./useProvider";
import { useEthersSigner } from "../../common/hooks/useEthersSigner";

export function useController() {
  const controllerRef = useRef<VaultController | undefined>(undefined);
  const { data: vaults } = useAllVaultsQuery();
  const provider = useProvider();
  const signer = useEthersSigner();

  const controllerAddress = useMemo(() => {
    return vaults.length ? vaults[0].controller : "";
  }, [vaults]);

  const handleController = useCallback(() => {
    if (controllerAddress !== "") {
      controllerRef.current = new VaultController(
        controllerAddress,
        signer ?? provider
      );
    }
  }, [controllerAddress, provider, signer]);

  useEffect(() => {
    if (!controllerRef.current && controllerAddress && vaults.length) {
      handleController();
    }
  }, [controllerRef, controllerAddress, handleController, vaults]);

  return controllerRef.current;
}
