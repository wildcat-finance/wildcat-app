import { useState } from "react"

import { Button, Modal } from "../../../../../components/ui-components"

export const CapacityModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const onClose = () => setIsModalOpen(false)

  return (
    <>
      <Button
        variant="green"
        className="w-64"
        onClick={() => setIsModalOpen(true)}
      >
        Adjust
      </Button>

      <Modal isOpen={isModalOpen} onClose={onClose}>
        <div>
          <div className="text-base font-bold px-8 w-80 text-center">
            You are changing your maximum market capacity.
          </div>

          <div className="w-full border border-tint-10 my-3" />

          <div className="flex flex-col items-center gap-y-5 px-8">
            <div className="w-72 font-light text-xxs text-center">
              By confirming this transaction, you are changing the maximum
              amount of deposits you are comfortable paying interest on from:
            </div>
            <div className="w-72 font-bold text-xxs text-center">X to Y</div>
            <div className="w-72 font-light text-xxs text-center">
              [NOTE FOR EUGENE] New value cannot be lower than the current
              totalSupply of the market token - if it is, tx will revert.
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}
