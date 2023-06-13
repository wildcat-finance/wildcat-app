import { useCallback, useEffect, useReducer } from "react";
import { getAllVaults, Vault } from "@wildcatfi/wildcat-sdk";
import { useProvider } from "./useProvider";

interface State {
  status: "idle" | "pending" | "resolved" | "rejected";
  vaults: Vault[];
}

export function useAllVaults() {
  const provider = useProvider();

  const initState = {
    status: "idle",
    vaults: [],
  } as State;

  function reducer(
    state: State,
    action:
      | { type: "started"; payload?: undefined }
      | {
          type: "error";
          payload?: undefined | { type: "success"; payload?: undefined };
        }
      | {
          type: "success";
          payload: Vault[];
        }
  ): State {
    switch (action.type) {
      case "started":
        return { ...state, status: "pending" };
      case "error":
        return { ...state, status: "rejected" };
      case "success":
        return { ...state, status: "resolved", vaults: action.payload };
      default:
        throw new Error("unsupported action type on useController reducer");
    }
  }

  const [state, dispatch] = useReducer(reducer, initState);

  const handleVaults = useCallback(async () => {
    try {
      dispatch({ type: "started" });
      const vaults = await getAllVaults(provider);
      dispatch({ type: "success", payload: vaults });
    } catch (e) {
      console.log(e);
      dispatch({ type: "error" });
    }
  }, [provider]);

  useEffect(() => {
    if (state.status === "idle") {
      handleVaults();
    }
  }, [state, handleVaults]);

  return state;
}
