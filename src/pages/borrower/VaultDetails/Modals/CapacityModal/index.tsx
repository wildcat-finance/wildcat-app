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
              By confirming this transaction, you are changing the base interest
              rate paid to your lenders from:
            </div>
            <div className="w-72 font-bold text-xxs text-center">X% to Y%</div>
            <div className="w-72 font-light text-xxs text-center">
              [ONLY SHOW IF RATE IS LOWER] The minimum reserve ratio of the market
              will be temporarily changed to:
            </div>
            <div className="w-72 font-bold text-xxs text-center">M%</div>
            <div className="w-72 font-light text-xxs text-center">
              To avoid surprises, please make sure you have aligned this change with
              your active lenders before moving ahead.
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}
