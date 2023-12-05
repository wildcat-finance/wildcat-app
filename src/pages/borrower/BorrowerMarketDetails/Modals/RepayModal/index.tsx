import { useState } from "react"

import { Modal, Button } from "../../../../../components/ui-components"
import { RepayModalProps } from "./interface"

export const RepayModal = ({
  onClose,
  isOpen,
  disabled,
  repayAmount,
  newMarketReserve,
  tokenSymbol,
  isLoading,
  repay,
}: RepayModalProps) => (
  <>
    <Button
      variant="green"
      className="w-full"
      onClick={onClose}
      disabled={disabled}
    >
      Repay
    </Button>

    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isLoading={isLoading}
      onClick={repay}
      firstBtnText="Confirm"
    >
      <div>
        <div className="text-base font-bold px-8 w-100 text-center">
          You are repaying to the market.
        </div>

        <div className="w-full border border-tint-10 my-3" />

        <div className="flex flex-col items-center gap-y-5 px-8">
          <div className="w-72 font-light text-xxs text-center">
            By confirming this transaction, you are transferring the below
            amount to the market reserves:
          </div>
          <div className="w-72 font-bold text-xxs text-center">
            {repayAmount} {tokenSymbol}
          </div>
          <div className="w-72 font-light text-xxs text-center">
            Market reserves after this repayment will be:
          </div>
          <div className="w-72 font-bold text-xxs text-center">
            {newMarketReserve} {tokenSymbol}
          </div>
        </div>
      </div>
    </Modal>
  </>
)
