import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useEthersSigner } from "../../../modules/hooks"
import { toastifyRequest } from "../../../components/toasts"
import { USE_BORROWER_INVITES_KEY } from "./useBorrowerInvites"
import { USE_BORROWER_INVITE_KEY } from "../../../hooks/useBorrowerInvitation"
import { API_URL } from "../../../config/api"

export type InviteBorrowerInput = {
  address: string
  name: string
}

export const useInviteBorrower = () => {
  const signer = useEthersSigner()
  const url = API_URL
  const client = useQueryClient()
  return useMutation({
    mutationFn: async (input: InviteBorrowerInput) => {
      if (!signer) throw Error(`No signer`)
      if (!input.address) throw Error(`No address`)
      if (!input.name) throw Error(`No name`)
      if (!url) throw Error(`API url not defined`)

      const submit = async () => {
        await fetch(`${url}/invite`, {
          method: "POST",
          body: JSON.stringify({
            ...input,
            network: "mainnet",
          }),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        })
      }
      await toastifyRequest(submit(), {
        pending: `Submitting invite...`,
        success: `Invite sent!`,
        error: `Failed to submit invite to API server`,
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
