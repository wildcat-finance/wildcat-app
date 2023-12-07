import { useQuery } from "@tanstack/react-query"
import { useApiTokenStore } from "./useTokenStore"
import { API_URL } from "../../../config/api"

export const USE_BORROWER_INVITES_KEY = "use-borrower-invites"

export type BorrowerInvite = {
  address: string
  name?: string
  timeInvited: string
  timeAccepted?: string
  signature?: string
  messageHash?: string
  dateSigned?: string
  registeredMainnet?: number
  registeredSepolia?: number
}
export const useBorrowerInvites = () => {
  const { apiToken } = useApiTokenStore()
  const url = API_URL
  const getInvites = async () => {
    if (!url) throw Error(`API url not defined`)
    if (!apiToken) throw Error(`API token not defined`)
    const { data: borrowerInvites } = await fetch(`${url}/borrowers`, {
      credentials: "include",
    }).then((res) => res.json())
    return borrowerInvites as BorrowerInvite[]
  }
  return useQuery({
    enabled: !!apiToken && !!url,
    queryKey: [USE_BORROWER_INVITES_KEY],
    queryFn: getInvites,
    refetchOnMount: false,
  })
}
