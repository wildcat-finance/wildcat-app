import { getDefaultProvider } from "ethers";

export function useProvider() {
  const provider = getDefaultProvider(
    `https://eth-sepolia.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`
  );

  return provider;
}
