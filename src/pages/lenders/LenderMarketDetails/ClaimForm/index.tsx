import { useState } from "react"
import { ClaimFormProps } from "./type"
import { Button } from "../../../../components/ui-components"
import { ClaimModal } from "../Modals/ClaimModal"
import { TOKEN_FORMAT_DECIMALS } from "../../../../utils/formatters"
import { useGetWithdrawals } from "../LenderWithdrawalRequests/hooks/useGetWithdrawals"
import { useClaim } from "../../../borrower/BorrowerMarketDetails/hooks/useVaultDetailActions"

export const ClaimForm = ({ market }: ClaimFormProps) => {
  const [isModalOpen, setModalOpen] = useState(false)
  const { data: withdrawals } = useGetWithdrawals(market)

  const toggleModal = () => setModalOpen(!isModalOpen)
  const { mutate: claim, isLoading } = useClaim(
    market,
    withdrawals.expiredPendingWithdrawals,
  )
  const confirmClaim = () => {
    claim()
    toggleModal()
  }

  const disabled = withdrawals.totalClaimableAmount.raw.isZero() || isLoading

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
