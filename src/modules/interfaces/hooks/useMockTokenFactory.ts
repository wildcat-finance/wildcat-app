import { useCallback, useEffect, useState } from "react";
import { TokenFactory } from "@wildcatfi/wildcat-sdk/dist/mockerc20factory";
import { Signer } from "@wildcatfi/wildcat-sdk/dist/types";
import { useProvider } from "./useProvider";
import { useEthersSigner } from "../../common/hooks/useEthersSigner";

// @todo update when signer changes
export function useMockTokenFactory() {
  const provider = useProvider();
  const signer = useEthersSigner();
  const [factory, setFactory] = useState<TokenFactory>(
    TokenFactory.getFactory(signer ?? provider)
  );

  const handleSetTokenFactory = useCallback(() => {
    console.log("calling handleSetTokenFactory()");
    setFactory(TokenFactory.getFactory(signer ?? provider));
  }, [provider, signer]);

  useEffect(() => {
    // if (!!signer && !(factory.provider instanceof Signer) || factory.signer.) 
    if (factory.provider !== (signer ?? provider)) {
      handleSetTokenFactory();
    }
  }, [factory, handleSetTokenFactory, signer, provider ]);

  return factory;
}
