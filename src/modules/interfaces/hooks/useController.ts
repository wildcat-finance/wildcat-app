import { useCallback, useEffect, useState, useMemo } from "react";
import { VaultController } from "@wildcatfi/wildcat-sdk";
import { useAllVaults } from "./useAllVaults";
import { useProvider } from "./useProvider";

export function useController() {
  const [controller, setController] = useState<VaultController | undefined>(
    undefined
  );
  const { vaults, status: vaultStatus } = useAllVaults();
  const provider = useProvider();

  const controllerAddress = useMemo(() => {
    return vaults.length ? vaults[0].controller : "";
  }, [vaults]);

  const handleController = useCallback(() => {
    if (controllerAddress !== "") {
      setController(new VaultController(controllerAddress, provider));
    }
  }, [controllerAddress, provider]);

  useEffect(() => {
    if (!controller && controllerAddress !== "" && vaultStatus === "resolved") {
      handleController();
    }
  }, [controller, controllerAddress, vaultStatus, handleController]);

  return controller;
}
