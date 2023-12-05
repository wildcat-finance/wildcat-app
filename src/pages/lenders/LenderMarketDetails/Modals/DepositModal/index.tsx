import { Modal } from "../../../../../components/ui-components"
import type { DepositModalProps } from "./type"

export const DepositModal = ({
  onClose,
  deposit,
  isLoading,
  isOpen,
  depositAmount,
  tokenSymbol,
}: DepositModalProps) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    isLoading={isLoading}
    onClick={deposit}
    firstBtnText="Deposit"
  >
    <div>
      <div className="text-base font-bold px-8 w-100 text-center">
        New Deposit
      </div>

      <div className="w-full border border-tint-10 my-3" />

      <div className="flex flex-col items-center gap-y-5 px-8">
        <div className="w-72 font-light text-xxs text-center">
          You are depositing
          <div className="w-72 font-bold text-xxs text-center mt-5">
            {depositAmount} {tokenSymbol}
          </div>
        </div>
      </div>
    </div>
  </Modal>
)
