import { useState } from "react"
import { ClaimFormProps } from "./type"
import { Button } from "../../../../components/ui-components"
import { ClaimModal } from "../Modals/ClaimModal"
import { TOKEN_FORMAT_DECIMALS } from "../../../../utils/formatters"
import { useGetWithdrawals } from "../LenderWithdrawalRequests/hooks/useGetWithdrawals"
import { useClaim } from "../../../borrower/BorrowerMarketDetails/hooks/useVaultDetailActions"
import { useTransactionWait } from "../../../../store/useTransactionWait"

export const ClaimForm = ({ market }: ClaimFormProps) => {
  const [isModalOpen, setModalOpen] = useState(false)
  const { data: withdrawals } = useGetWithdrawals(market)
  const { isTxInProgress, setisTxInProgress } = useTransactionWait()

  const toggleModal = () => setModalOpen(!isModalOpen)
  const { mutateAsync: claim, isLoading } = useClaim(
    market,
    withdrawals.expiredPendingWithdrawals,
  )
  const confirmClaim = () => {
    toggleModal()
    setisTxInProgress(true)
    claim()
      .finally(() => {
        setisTxInProgress(false)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const disabled =
    withdrawals.totalClaimableAmount.raw.isZero() || isLoading || isTxInProgress

  return (
    <div>
      <div className="w-full flex justify-between items-center">
        <div className="font-bold text-sm">Claim Available Withdrawals</div>
        <div className="flex gap-x-3.5 w-full max-w-lg items-center">
          <div className="flex flex-col w-full">
            <div className="text-xxs text-right">
              <span className="font-semibold">Claimable: </span>
              {withdrawals.totalClaimableAmount.format(
                TOKEN_FORMAT_DECIMALS,
              )}{" "}
              {market.underlyingToken.symbol}
            </div>
          </div>
          <Button
            disabled={disabled}
            variant="green"
            className="w-64"
            onClick={toggleModal}
          >
            Claim
          </Button>

          <ClaimModal
            isOpen={isModalOpen}
            onClose={toggleModal}
            claim={confirmClaim}
            claimableAmount={withdrawals.totalClaimableAmount.format(
              TOKEN_FORMAT_DECIMALS,
            )}
            tokenSymbol={market.underlyingToken.symbol}
          />
        </div>
      </div>
    </div>
  )
}
