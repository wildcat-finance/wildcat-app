import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { TargetNetwork } from "../../../../config/networks"
import { toastifyInfo } from "../../../../components/toasts"
import {
  GET_CONTROLLER_CONTRACT_KEY,
  GET_CONTROLLER_KEY,
  GET_CONTROLLER_UPDATED_KEY,
} from "../../../../hooks/useGetController"
import { GET_BORROWER_MARKET_ACCOUNT_LEGACY_KEY } from "../../../../hooks/useGetMarketAccount"
import { USE_BORROWER_INVITE_KEY } from "../../../../hooks/useBorrowerInvitation"
import { USE_BORROWER_INVITES_KEY } from "../../../admin/hooks/useBorrowerInvites"
import { LENDERS_PATH } from "../../routes/constants"
import { useAgreementStore } from "../../../../store/useAgreementStore"
import { API_URL } from "../../../../config/api"
import { BASE_PATHS } from "../../../../routes/constants"
import { HAS_SIGNED_SLA_KEY } from "../../../../hooks/useHasSignedSla"

export interface SignatureSubmissionProps {
  address: string
  signature: string
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

      await fetch(`${url}/sla`, {
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
      signatures.setSlaSignature(input.address, input.signature)
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [GET_CONTROLLER_KEY] })
      client.invalidateQueries({ queryKey: [GET_CONTROLLER_CONTRACT_KEY] })
      client.invalidateQueries({ queryKey: [GET_CONTROLLER_UPDATED_KEY] })
      client.invalidateQueries({
        queryKey: [GET_BORROWER_MARKET_ACCOUNT_LEGACY_KEY],
      })
      client.invalidateQueries({ queryKey: [USE_BORROWER_INVITE_KEY] })
      client.invalidateQueries({ queryKey: [USE_BORROWER_INVITES_KEY] })
      client.invalidateQueries({ queryKey: [HAS_SIGNED_SLA_KEY] })
      setTimeout(() => {
        toastifyInfo(`Redirecting to Markets List...`)
        navigate(`${BASE_PATHS.Lender}/${LENDERS_PATH.IndexPage}`)
      }, 3000)
    },
    onError(error) {
      console.log(error)
    },
  })
}
