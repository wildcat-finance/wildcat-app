/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
  getArchControllerContract,
  getMockArchControllerOwnerContract,
} from "@wildcatfi/wildcat-sdk"
import { toastifyRequest } from "../../../components/toasts"
import { useEthersSigner } from "../../../modules/hooks"
import {
  GET_CONTROLLER_CONTRACT_KEY,
  GET_CONTROLLER_KEY,
  GET_CONTROLLER_UPDATED_KEY,
} from "../../../hooks/useGetController"
import { GET_BORROWER_MARKET_ACCOUNT_LEGACY_KEY } from "../../../hooks/useGetMarketAccount"
import { USE_BORROWER_INVITE_KEY } from "../../../hooks/useBorrowerInvitation"
import { USE_BORROWER_INVITES_KEY } from "./useBorrowerInvites"
import { TargetChainId } from "../../../config/networks"

export type SignAgreementProps = {
  organizationName: string
  dateSigned: string
}

export const useRegisterBorrower = () => {
  const signer = useEthersSigner()
  const client = useQueryClient()

  const { mutate: registerBorrower, isLoading: isRegistering } = useMutation({
    mutationFn: async (address: string) => {
      if (!signer) {
        throw Error(`No signer`)
      }
      if (!address) throw Error(`No address`)

      const register = async () => {
        const contract =
          TargetChainId === 1
            ? getArchControllerContract(1, signer)
            : getMockArchControllerOwnerContract(TargetChainId, signer)
        const tx = await contract.registerBorrower(address)
        await tx.wait()
      }

      await toastifyRequest(register(), {
        pending: `Submitting on-chain registration for borrower...`,
        success: `Borrower registered!`,
        error: `Failed to register borrower`,
      })
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
    },
    onError(error) {
      console.log(error)
    },
  })

  return {
    registerBorrower,
    isRegistering,
  }
}
