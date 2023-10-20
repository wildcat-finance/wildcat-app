import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useState } from "react"
import { Button } from "../Button"

import { ModalProps } from "./interface"
import { Paper } from "../Paper"

import closeIcon from "../icons/cancel_icon.svg"
import { SignIcon } from "../icons"

export function Modal({
  buttonName,
  buttonColor,
  buttonClassName,
  children,
  sign,
  onClose,
}: ModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleModal = () => {
    if (isOpen && onClose) {
      onClose()
    }
    setIsOpen(!isOpen)
  }

  return (
    <>
      <Button
        variant={buttonColor}
        onClick={toggleModal}
        className={buttonClassName}
      >
        {buttonName}
      </Button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={toggleModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 backdrop-blur-md" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="transform overflow-hidden transition-all">
                  <div className="flex flex-col items-end">
                    <button
                      onClick={toggleModal}
                      className="w-fit relative top-7 right-4"
                    >
                      <img src={closeIcon} alt="close" />
                    </button>
                    <Paper className="bg-white border-none py-5">
                      {children}
                      <div className="flex gap-x-3 justify-center mt-5">
                        {!sign && (
                          <Button variant="blue" className="w-28">
                            Submit
                          </Button>
                        )}
                        {sign && (
                          <Button variant="blue" icon={<SignIcon />}>
                            Sign
                          </Button>
                        )}
                        <Button
                          variant="grey"
                          className="!text-black font-semibold w-28"
                          onClick={toggleModal}
                        >
                          Cancel
                        </Button>
                      </div>
                    </Paper>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
