import { RiWallet3Line, RiCloseLine } from "react-icons/ri"
import { Fragment, useCallback, useEffect, useMemo } from "react"
import { useAccount, useConnect, useDisconnect, useSwitchNetwork } from "wagmi"
import { Dialog, Transition } from "@headlessui/react"

import { useCopyToClipboard } from "react-use"
import { Button, Paper } from "../../ui-components"
import { useWalletConnectModalStore } from "../../../store/useWalletConnectModalStore"
import { TargetChainId, TargetNetwork } from "../../../config/networks"
import { useCurrentNetwork } from "../../../hooks/useCurrentNetwork"
import { trimAddress } from "../../../utils/formatters"
import { CopyIcon } from "../../ui-components/icons"
import { toastifyError, toastifyInfo } from "../../toasts"

function ConnectButton() {
  const [state, copyToClipboard] = useCopyToClipboard()
  const { isOpen, setIsWalletModalOpen } = useWalletConnectModalStore()

  const { connectors, connect, isLoading, pendingConnector } = useConnect()
  const { address, isConnected } = useAccount()
  const { switchNetwork } = useSwitchNetwork()
  const { disconnect } = useDisconnect()
  const { isWrongNetwork } = useCurrentNetwork()

  useEffect(() => {
    if (isConnected && !isWrongNetwork) {
      setIsWalletModalOpen(false)
    }
  }, [isConnected, isWrongNetwork])

  const openModal = useCallback(() => {
    if (!isOpen) {
      setIsWalletModalOpen(true)
    }
  }, [isOpen])

  const closeModal = useCallback(() => {
    console.log(`closeModal`)
    // if (isOpen) {
    setIsWalletModalOpen(false)
    // }
  }, [isOpen])

  const getButtonText = useCallback(() => {
    if (isConnected && isWrongNetwork) {
      return "Wrong Network"
    }
    if (isConnected && address) {
      return `${address.slice(0, 6)}..${address.slice(-4, address.length)}`
    }
    return "Connect"
  }, [isConnected, address, isWrongNetwork])

  const shortenedAddress = useMemo(
    () => (address ? trimAddress(address) : null),
    [address],
  )

  const handleCopyAddress = (text: string) => {
    copyToClipboard(text)
    if (state.error) {
      toastifyError("Failed to copy to clipboard")
    } else {
      toastifyInfo("Address copied to clipboard")
    }
  }

  console.log(`isWalletModalOpen: ${isOpen}`)

  return (
    <>
      <Button className="rounded-sm" onClick={openModal} variant="silver">
        <div className="flex items-center gap-2">
          <span className="text-black text-xs">{getButtonText()}</span>
          <RiWallet3Line className="w-5" />
        </div>
      </Button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => !isLoading && closeModal()}
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
                    {/* <Button
                        onClick={closeModal}
                        className="w-fit relative top-10 right-0"
                        variant="outline"
                        disabled={isLoading}
                      >
                        <img src={closeIcon} alt="close" />
                      </Button> */}
                    {/* <RiCloseLine
                      className="absolute w-6 right-0 top-0"
                      onClick={closeModal}
                    /> */}
                    <Paper className="bg-sand w-80 p-6 rounded-sm">
                      <div className="flex items-center justify-center mb-4 relative">
                        <p className="text-2xl font-medium select-none">
                          {isConnected ? "Account" : " Select Wallet"}
                        </p>
                        <RiCloseLine
                          className="absolute w-6 right-0 top-0"
                          onClick={closeModal}
                        />
                      </div>
                      <div className="flex items-center flex-col gap-1">
                        {isConnected && isWrongNetwork && (
                          <Button
                            variant="black"
                            className="w-full"
                            onClick={() => switchNetwork?.(TargetChainId)}
                          >
                            Switch to {TargetNetwork.name}
                          </Button>
                        )}
                        {isConnected ? (
                          <>
                            <button
                              onClick={() => handleCopyAddress(String(address))}
                            >
                              <div className="flex flex-row items-center gap-x-2 mb-1">
                                <p className="hover:underline">
                                  {shortenedAddress}
                                </p>
                                <CopyIcon className="w-4 h-4 opacity-50 hover:opacity-100" />
                              </div>
                            </button>

                            <Button
                              variant="black"
                              className="w-full"
                              onClick={() => disconnect()}
                            >
                              Disconnect
                            </Button>
                          </>
                        ) : (
                          <>
                            {connectors
                              .filter((c) => !(c.name === "Safe" && !c.ready))
                              .map((connector) => (
                                <Button
                                  disabled={!connector.ready}
                                  key={connector.id}
                                  onClick={() => connect({ connector })}
                                  variant="black"
                                  className="w-full"
                                >
                                  {connector.name}
                                  {!connector.ready && " (unsupported)"}
                                  {isLoading &&
                                    connector.id === pendingConnector?.id &&
                                    " (connecting)"}
                                </Button>
                              ))}
                          </>
                        )}
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

export default ConnectButton
