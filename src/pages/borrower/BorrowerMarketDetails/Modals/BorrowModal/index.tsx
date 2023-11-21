import { useState } from "react"

import { Button, Modal } from "../../../../../components/ui-components"
import { BorrowModalProps } from "./interface"

export const BorrowModal = ({
  disabled,
  borrowAmount,
  leftBorrowAmount,
  tokenSymbol,
  isLoading,
  borrow,
}: BorrowModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const onClose = () => setIsModalOpen(false)

  return (
    <>
      <Button
        variant="green"
        className="w-64"
        onClick={() => setIsModalOpen(true)}
        disabled={disabled}
      >
        Borrow
      </Button>

      <Modal
        isOpen={isModalOpen}
        onClose={onClose}
        isLoading={isLoading}
        sign={borrow}
      >
        <div>
          <div className="text-base font-bold px-8 w-100 text-center">
            You are borrowing from your market.
          </div>

          <div className="w-full border border-tint-10 my-3" />

          <div className="flex flex-col items-center gap-y-5 px-8">
            <div className="w-72 font-light text-xxs text-center">
              You are borrowing the following amount from the market and
              transferring it into your wallet:
            </div>
            <div className="w-72 font-bold text-xxs text-center">
              {borrowAmount} {tokenSymbol}
            </div>
            <div className="w-72 font-light text-xxs text-center">
              After this, your remaining borrowable amount becomes:
            </div>
            <div className="w-72 font-bold text-xxs text-center">
              {leftBorrowAmount} {tokenSymbol}
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}
