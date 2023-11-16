import { useQuery } from "@tanstack/react-query"
import { useAccount } from "wagmi"
import { getWithdrawalForLender, Market } from "@wildcatfi/wildcat-sdk"

import { useCurrentNetwork } from "./useCurrentNetwork"

export const GET_WITHDRAWAL_FOR_LENDER_KEY = "withdrawal-for-lender"

export const useGetWithdrawalForLender = (
  market: Market | undefined,
  expiry: number | undefined,
) => {
  const { address } = useAccount()
  const { isWrongNetwork } = useCurrentNetwork()

  async function getWithdrawalForLenderReq() {
    const withdrawalForLender = await getWithdrawalForLender(
      market as Market,
      expiry as number,
      address as string,
    )
    console.log(withdrawalForLender)
    return withdrawalForLender
  }

  return useQuery({
    queryKey: [GET_WITHDRAWAL_FOR_LENDER_KEY, address],
    queryFn: getWithdrawalForLenderReq,
    enabled: !!address && !!market && !!expiry && !isWrongNetwork,
    refetchOnMount: false,
  })
}
