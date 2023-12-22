import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { AccountDescription, describeAccount } from "@wildcatfi/wildcat-sdk"
import { useEthersSigner } from "../modules/hooks"

export const GET_ACCOUNT_CODE_KEY = "get-account-code"

export function useDescribeAccount(address: string | undefined): Omit<
  UseQueryResult<AccountDescription>,
  "data"
> & {
  account: AccountDescription | undefined
} {
  const signer = useEthersSigner()
  const { data, ...rest } = useQuery({
    queryKey: [GET_ACCOUNT_CODE_KEY, address],
    enabled: !!address && !!signer?.provider,
    refetchOnMount: false,
    queryFn: async () => {
      if (!address || !signer?.provider) throw Error()

      return describeAccount(signer, address)
    },
  })
  return { account: data, ...rest }
}
