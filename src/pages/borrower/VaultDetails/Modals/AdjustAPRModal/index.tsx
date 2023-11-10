import { useState } from "react"
import { Button, Modal } from "../../../../../components/ui-components"

import { AdjustAprModalProps } from "./interface"

export const AdjustAPRModal = ({
  currentAPR,
  newAPR,
  isLoading,
  newReserveRatio,
  adjustAPR,
  disabled,
}: AdjustAprModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const onClose = () => setIsModalOpen(false)

  return (
    <>
      <Button
        variant="green"
        onClick={() => setIsModalOpen(true)}
        disabled={disabled}
      >
        Adjust
      </Button>

      <Modal
        isOpen={isModalOpen}
        onClose={onClose}
        isLoading={isLoading}
        sign={adjustAPR}
      >
        <div>
          <div className="text-base font-bold px-8 w-100 text-center">
            You are changing your lender APR.
          </div>

          <div className="w-full border border-tint-10 my-3" />

          <div className="flex flex-col items-center gap-y-5 px-8">
            <div className="w-72 font-light text-xxs text-center">
              By confirming this transaction, you are changing the base interest
              rate paid to your lenders from:
            </div>
            <div className="w-72 font-bold text-xxs text-center">
              {currentAPR}% to {newAPR}%
            </div>

            {newReserveRatio && (
              <>
                <div className="w-72 font-light text-xxs text-center">
                  [ONLY SHOW IF RATE IS LOWER] The minimum reserve ratio of the
                  market will be temporarily changed to:
                </div>
                <div className="w-72 font-bold text-xxs text-center">
                  {newReserveRatio}%
                </div>
              </>
            )}

            <div className="w-72 font-light text-xxs text-center">
              To avoid surprises, please make sure you have aligned this change
              with your active lenders before moving ahead.
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}
