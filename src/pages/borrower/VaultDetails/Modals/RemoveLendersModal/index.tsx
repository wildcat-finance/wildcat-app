import React, { useState } from "react"
import { Button, Modal } from "../../../../../components/ui-components"

import { RemoveLendersModalProps } from "./interface"

export function RemoveLendersModal({ lenders }: RemoveLendersModalProps) {
  const [selectedLenders, setSelectedLenders] = useState<string[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const isSelected = (lenderWallet: string) =>
    selectedLenders.includes(lenderWallet)
  const handleSelectLenderWallet = (lenderWallet: string) => {
    if (isSelected(lenderWallet)) {
      setSelectedLenders(
        selectedLenders.filter((lender) => lender !== lenderWallet),
      )
    } else {
      setSelectedLenders([...selectedLenders, lenderWallet])
    }
  }

  function clearInputOnClose() {
    setSelectedLenders([])
  }

  const onModalClose = () => {
    clearInputOnClose()
    setIsModalOpen(false)
  }

  return (
    <>
      <Button variant="red" onClick={() => setIsModalOpen(true)}>
        Deauthorise Lenders
      </Button>

      <Modal isOpen={isModalOpen} onClose={onModalClose}>
        <>
          <div className="text-base font-bold px-8">Remove Lenders</div>
          <div className="w-full border border-tint-10 my-3" />
          <div className="px-8">
            <div className="w-72 font-light text-xxs text-center mx-auto">
              Please select those lenders you want to deauthorise.
            </div>
            <div className="w-72 font-light text-xxs text-center mx-auto">
              Note: any deauthorised lenders can still withdraw from your
              market, but cannot deposit any further.
            </div>
            <div className="flex flex-col items-center gap-y-2 mt-3">
              <div className="w-full border border-tint-10" />
              <div className="text-base font-bold">
                Select lenders to deauthorise:
              </div>
              {lenders.map((lender) => (
                <div className="flex gap-x-4 w-full" key={lender.wallet}>
                  <div className="flex flex-col w-full">
                    <div className="text-xs font-medium">{lender.lender}</div>
                    <div className="text-xs">{lender.wallet}</div>
                  </div>
                  <div className="mt-2">
                    <input
                      type="checkbox"
                      name="RemoveLenderCheckbox"
                      onChange={() => handleSelectLenderWallet(lender.wallet)}
                      checked={isSelected(lender.wallet)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      </Modal>
    </>
  )
}
