import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { TargetNetwork } from "../../../../config/networks"
import { toastifyInfo } from "../../../../components/toasts"
import { HAS_SIGNED_SLA_KEY } from "../../../../hooks/useHasSignedSla"
import { LENDERS_PATH } from "../../../lenders/routes/constants"
import { useAgreementStore } from "../../../../store/useAgreementStore"
import { API_URL } from "../../../../config/api"

export interface SignatureSubmissionProps {
  address: string
  name: string
  signature: string
  messageHash?: string
  dateSigned?: string
}

export function useSubmitSignature() {
  const network = TargetNetwork.name
  const client = useQueryClient()
  const navigate = useNavigate()
  const url = API_URL
  const signatures = useAgreementStore()
  return useMutation({
    mutationFn: async (input: SignatureSubmissionProps) => {
      if (!url) throw Error(`API url not defined`)

      await fetch(`${url}/accept`, {
        method: "POST",
        body: JSON.stringify({
          ...input,
          network,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
      signatures.setBorrowerSignature(input.address, input.signature)
    },
    onSuccess: () => {
      setTimeout(() => {
        toastifyInfo(`Redirecting to Markets List...`)
        navigate(LENDERS_PATH.ActiveVaults)
      }, 3000)
      client.invalidateQueries({ queryKey: [HAS_SIGNED_SLA_KEY] })
    },
    onError(error) {
      console.log(error)
    },
  })
}
