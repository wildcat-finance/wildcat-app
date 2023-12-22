import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useEthersSigner } from "../../../modules/hooks"
import { toastifyRequest } from "../../../components/toasts"
import { USE_BORROWER_INVITES_KEY } from "./useBorrowerInvites"
import { useApiTokenStore } from "./useTokenStore"
import { USE_BORROWER_INVITE_KEY } from "../../../hooks/useBorrowerInvitation"
import { API_URL } from "../../../config/api"

export const useLoginToApi = () => {
  const { setApiToken } = useApiTokenStore()
  const signer = useEthersSigner()
  const url = API_URL
  const client = useQueryClient()
  return useMutation({
    mutationFn: async () => {
      if (!signer) {
        throw Error(`No signer`)
      }

      const sign = async () => {
        const signature = await signer.signMessage(
          `Log into wildcat.finance/admin`,
        )
        if (!url) throw Error(`API url not defined`)

        const response = await fetch(`${url}/login`, {
          method: "POST",
          body: JSON.stringify({ signature }),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        })
        const cookie = response.headers.get("set-cookie")
        console.log(response.headers)
        if (cookie) {
          console.log(`Cookie: ${cookie}`)
          setApiToken(cookie)
        } else {
          // console.log(`Cookie: ${cookie}`)
          console.log(`Did not receive cookie from server`)
          setApiToken("x")
        }
      }
      await toastifyRequest(sign(), {
        pending: `Waiting for signature...`,
        success: `Service agreement signed!`,
        error: `Failed to login to API server`,
      })
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [USE_BORROWER_INVITES_KEY] })
      client.invalidateQueries({ queryKey: [USE_BORROWER_INVITE_KEY] })
    },
    onError(error) {
      console.log(error)
    },
  })
}
