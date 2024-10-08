/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query"
import { toastifyRequest } from "../../../../components/toasts"
import { useGnosisSafeSDK } from "../../../../hooks/useGnosisSafeSDK"
import { useEthersSigner } from "../../../../modules/hooks"
import WildcatServiceAgreementAcknowledgement from "../../../../config/wildcat-service-agreement-acknowledgement.json"

export type SignAgreementProps = {
  address: string | undefined
  dateSigned: string | undefined
}

export const useSignAgreement = () => {
  const { sdk } = useGnosisSafeSDK()
  const signer = useEthersSigner()

  return useMutation({
    mutationFn: async ({ address, dateSigned }: SignAgreementProps) => {
      if (!signer) throw Error(`No signer`)
      if (!address) throw Error(`No address`)

      const sign = async () => {
        let agreementText = WildcatServiceAgreementAcknowledgement
        if (dateSigned) {
          agreementText = `${agreementText}\n\nDate: ${dateSigned}`
        }

        if (sdk) {
          const settings = {
            offChainSigning: true,
          }
          console.log(
            `Set safe settings: ${await sdk.eth.setSafeSettings([settings])}`,
          )
          const result = (await sdk.txs.signMessage(agreementText)) as any
          console.log(`Gnosis Result:`)
          console.log(result)
          if (result.safeTxHash) {
            return {
              signature: undefined,
              safeTxHash: result.safeTxHash as string,
            }
          }
          return {
            signature: result.signature as string,
            safeTxHash: undefined,
          }
        }
        const signatureResult = await signer.signMessage(agreementText)
        return { signature: signatureResult }
      }
      let result: { signature?: string; safeTxHash?: string } = {}
      await toastifyRequest(
        sign().then((res) => {
          result = res
        }),
        {
          pending: `Waiting for signature...`,
          success: `Service agreement signed!`,
          error: `Failed to sign service agreement!`,
        },
      )
      return result
    },
    onError(error) {
      console.log(error)
    },
  })
}
