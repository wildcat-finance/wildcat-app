import { useState } from "react"

import { Modal, Button } from "../../../../../components/ui-components"

export const CloseModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const onClose = () => setIsModalOpen(false)

  return (
    <>
      <Button
        variant="red"
        className="w-44 px-2 whitespace-nowrap"
        onClick={() => setIsModalOpen(true)}
      >
        Close Market
      </Button>

      <Modal isOpen={isModalOpen} onClose={onClose}>
        <div>
          <div className="text-base font-bold px-8 w-100 text-center">
            You are closing the market.
          </div>

          <div className="w-full border border-tint-10 my-3" />

          <div className="flex flex-col items-center gap-y-5 px-8">
            <div className="w-72 font-light text-xxs text-center">
              By confirming this transaction, you are transferring the below
              amount to the market reserves:
            </div>
            <div className="w-72 font-bold text-xxs text-center">XX DAI</div>
            <div className="w-72 font-light text-xxs text-center">
              You are reducing the APR to 0% for lenders to withdraw assets.
            </div>
            <div className="w-72 font-bold text-xxs text-center">
              You will no longer be able to borrow or change parameters.
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}
