import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

type NewToken = {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
};

export function useAddToken() {
  const { address } = useAccount();
  const [ethereumClient, setEthereumClient] = useState((window as any).ethereum);

  useEffect(() => {
    const checkWindowValue = () => {
      if (address && !!(window as any).ethereum) {
        setEthereumClient((window as any).ethereum);
        clearInterval(intervalId);
      }
    };

    const intervalId = setInterval(checkWindowValue, 1000); // Check every second

    // Cleanup function to clear the interval when the hook is unmounted
    return () => {
      clearInterval(intervalId);
    };
  }, []); // Remove ethereumClient dependency to prevent re-running of the effect

  const canAddToken = !!ethereumClient;

  const { mutate: handleAddToken, isLoading: isAddingToken } = useMutation({
    mutationFn: async (token: NewToken) => {
      if (!ethereumClient) {
        throw Error("No ethereum client found");
      }
      const result = await ethereumClient.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: token
        }
      });

      return result;
    },
    onSuccess(result) {
      console.log(`Added token!`);
      console.log(result);
    },
    onError(e) {
      console.log(e);
      window.alert("Error adding new token!");
    },

  });

  return {
    canAddToken,
    handleAddToken,
    isAddingToken
  };
}