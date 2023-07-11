import { useCallback, useEffect, useState, useMemo } from "react";
import { VaultController } from "@wildcatfi/wildcat-sdk";
import { useAllVaultsQuery } from "./useAllVaultsQuery";
import { useProvider } from "./useProvider";
import { useEthersSigner } from "../../common/hooks/useEthersSigner";

export function useController() {
  const [controller, setController] = useState<VaultController | undefined>(
    undefined
  );
  const { data: vaults } = useAllVaultsQuery();
  const provider = useProvider();
  const signer = useEthersSigner();

  const controllerAddress = useMemo(() => {
    return vaults.length ? vaults[0].controller : "";
  }, [vaults]);

  const handleController = useCallback(() => {
    console.log("calling handleController()");
    if (controllerAddress !== "") {
      setController(new VaultController(controllerAddress, signer ?? provider));
    }
  }, [controllerAddress, provider, signer]);

  useEffect(() => {
    if (!controller && controllerAddress && vaults.length) {
      handleController();
    }
  }, [controller, controllerAddress, handleController, vaults]);

  return controller;
}
