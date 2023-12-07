import { useEffect, useMemo } from "react"

// eslint-disable-next-line import/no-extraneous-dependencies
import {
  DetailedExecutionInfoType,
  TransactionStatus,
} from "@safe-global/safe-gateway-typescript-sdk"
import { Modal, Spinner } from "../../../components/ui-components"
import {
  useGnosisSafeSDK,
  useSafeTxDetails,
} from "../../../hooks/useGnosisSafeSDK"
import { toastifyError } from "../../../components/toasts"
import { TargetChainId } from "../../../config/networks"

export function WaitForSignatureModal({
  onClose,
  safeTxHash,
  onReject,
}: {
  onClose: () => void
  safeTxHash: string
  onReject: () => void
}) {
  const { sdk } = useGnosisSafeSDK()

  const { data: safeTx, isLoading } = useSafeTxDetails({ safeTxHash, sdk })
  const confirmationsRequired = useMemo(() => {
    if (
      safeTx?.detailedExecutionInfo?.type === DetailedExecutionInfoType.MULTISIG
    ) {
      return `${safeTx.detailedExecutionInfo.confirmations.length}/${safeTx.detailedExecutionInfo.confirmationsRequired}`
    }
    return undefined
  }, [safeTx?.detailedExecutionInfo])
  const status = useMemo(() => safeTx?.txStatus, [safeTx?.txStatus])
  useEffect(() => {
    if (!safeTx) return
    if (
      safeTx.txStatus === TransactionStatus.FAILED ||
      safeTx.txStatus === TransactionStatus.CANCELLED
    ) {
      toastifyError(
        `Transaction ${
          safeTx.txStatus === TransactionStatus.FAILED ? "failed" : "cancelled"
        }`,
      )
      onReject()
    }

    if (safeTx.txStatus === TransactionStatus.SUCCESS) {
      console.log(`Safe tx executed at: ${safeTx.executedAt}`)
      onClose()
    }
  }, [safeTxHash, safeTx?.executedAt])

  const url = useMemo(() => {
    if (!safeTx) return undefined
    const prefix = TargetChainId === 1 ? "eth:" : "sep:"
    return `https://app.safe.global/transactions/tx?id=${safeTx.txId}&safe=${prefix}${safeTx.safeAddress}`
  }, [safeTx])

  return (
    <Modal isOpen={!!safeTxHash} hideButtons isLoading={isLoading}>
      <div className="text-base font-bold px-8">
        Waiting for Safe transaction confirmation, please do not close this
        modal.
      </div>
      {url && (
        <div className="w-full my-3 px-8">
          <a
            href={url}
            className="underline"
            target="_blank"
            rel="noreferrer"
            style={{ color: "blue" }}
          >
            Link to Safe transaction
          </a>
        </div>
      )}
      <div className="w-full border border-tint-10 my-3" />
      {status === TransactionStatus.AWAITING_CONFIRMATIONS &&
        confirmationsRequired !== undefined && (
          <div className="text-base font-bold px-8">
            Signatures: {confirmationsRequired}
          </div>
        )}
      {status === TransactionStatus.AWAITING_EXECUTION && (
        <div className="text-base font-bold px-8">Waiting for execution...</div>
      )}
      {isLoading && (
        <Spinner isLoading={isLoading} fixedDisable className="w-5 h-5 mt-2" />
      )}
    </Modal>
  )
}
