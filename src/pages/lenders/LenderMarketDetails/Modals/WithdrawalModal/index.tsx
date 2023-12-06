import { Modal } from "../../../../../components/ui-components"
import type { WithdrawalModalProps } from "./type"

export const WithdrawalModal = ({
  isOpen,
  onClose,
  withdraw,
  isLoading,
  withdrawAmount,
  tokenSymbol,
}: WithdrawalModalProps) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    isLoading={isLoading}
    onClick={withdraw}
    firstBtnText="Request"
  >
    <div>
      <div className="text-base font-bold px-8 w-100 text-center">
        Request Withdrawal
      </div>

      <div className="w-full border border-tint-10 my-3" />

      <div className="flex flex-col items-center gap-y-5 px-8">
        <div className="w-72 font-light text-xxs text-center">
          You are requesting a withdrawal of
          <div className="w-72 font-bold text-xxs text-center mt-5">
            {withdrawAmount} {tokenSymbol}
          </div>
        </div>
      </div>
    </div>
  </Modal>
)
