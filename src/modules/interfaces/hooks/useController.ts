import { useCallback, useEffect, useState,  } from "react";
import { VaultController } from "@wildcatfi/wildcat-sdk";
import { ControllerAddress } from "@wildcatfi/wildcat-sdk/dist/constants";
import { useProvider } from "./useProvider";
import { useEthersSigner } from "../../common/hooks/useEthersSigner";

// @todo update when signer changes
export function useController() {
  const provider = useProvider();
  const signer = useEthersSigner();
  const [controller, setController] = useState<VaultController>(
    new VaultController(ControllerAddress, signer ?? provider)
  );

  const handleController = useCallback(() => {
    console.log("calling handleController()");
    setController(new VaultController(ControllerAddress, signer ?? provider));
  }, [provider, signer, setController]);

  useEffect(() => {
    if (controller.provider !== (signer ?? provider)) {
      handleController();
    }
  }, [controller, handleController, signer, provider ]);

  return controller;
}
