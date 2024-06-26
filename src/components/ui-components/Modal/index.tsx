import { Dialog, Transition } from "@headlessui/react"
import { Fragment } from "react"
import { Button } from "../Button"

import { ModalProps } from "./interface"
import { Paper } from "../Paper"

import closeIcon from "../icons/cancel_icon.svg"
import { SignIcon } from "../icons"

export function Modal({
  children,
  onClick,
  onClose,
  isOpen = false,
  isLoading,
  loadingText,
  firstBtnText,
  hasSignIcon,
  hideButtons,
  firstBtnVariant = "glacier",
  firstBtnDisabled,
}: ModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => !isLoading && onClose && onClose()}
      >
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
                  {!hideButtons && (
                    <Button
                      onClick={onClose}
                      className="w-fit relative top-10 right-0"
                      variant="outline"
                      disabled={isLoading}
                    >
                      <img src={closeIcon} alt="close" />
                    </Button>
                  )}
                  <Paper className="bg-white border-none py-5">
                    {children}
                    {!hideButtons && (
                      <div className="flex gap-x-3 justify-center mt-5">
                        <Button
                          className="w-28"
                          variant={firstBtnVariant}
                          icon={hasSignIcon ? <SignIcon /> : undefined}
                          onClick={onClick}
                          disabled={isLoading || firstBtnDisabled}
                        >
                          {isLoading && loadingText
                            ? loadingText
                            : firstBtnText}
                        </Button>

                        <Button
                          variant="grey"
                          className="!text-black font-semibold w-28"
                          onClick={onClose}
                          disabled={isLoading}
                        >
                          Cancel
                        </Button>
                      </div>
                    )}
                  </Paper>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
