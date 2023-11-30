import { Modal } from "../../../../../components/ui-components"
import { ClaimModalProps } from "./type"

export const ClaimModal = ({
  onClose,
  claim,
  isLoading,
  isOpen = false,
  claimableAmount,
  tokenSymbol,
}: ClaimModalProps) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    isLoading={isLoading}
    onClick={claim}
    firstBtnText="Claim"
  >
    <div>
      <div className="text-base font-bold px-8 w-100 text-center">
        You are claiming your rewards.
      </div>

      <div className="w-full border border-tint-10 my-3" />

      <div className="flex flex-col items-center gap-y-5 px-8">
        <div className="w-72 font-light text-xxs text-center">
          You are claiming
          <div className="w-72 font-bold text-xxs text-center my-5">
            {claimableAmount} {tokenSymbol}
          </div>
          and transferring it into your wallet.
        </div>
      </div>
    </div>
  </Modal>
)
