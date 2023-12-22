import { useState, ChangeEvent, useEffect } from "react"

import {
  Button,
  FormItem,
  Modal,
  Spinner,
  TextInput,
} from "../../../components/ui-components"
import { useInviteBorrower } from "../hooks/useInviteBorrower"

export function InviteBorrowerModal() {
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [nameError, setNameError] = useState("")
  const [addressError, setAddressError] = useState("")
  const { mutateAsync: inviteAsync, isLoading } = useInviteBorrower()

  const onChangeName = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target
    setName(value)
    if (value.length) {
      setNameError("")
    }
  }

  const onChangeAddress = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target
    setAddress(value)
    if (value.length) {
      setAddressError("")
    }
  }

  const [isModalOpen, setIsModalOpen] = useState(false)

  const clearInputOnClose = () => {
    setName("")
    setAddress("")
    setNameError("")
    setAddressError("")
  }

  const onModalClose = () => {
    setIsModalOpen(false)
    clearInputOnClose()
  }

  const onSubmit = async () => {
    if (!name.length) {
      setNameError("Name is required")
    }
    if (!address.length) {
      setAddressError("Address is required")
    }
    await inviteAsync({ name, address })
    clearInputOnClose()
    setIsModalOpen(false)
  }

  return (
    <>
      <Button
        variant="green"
        className="w-35 whitespace-nowrap"
        disabled={false}
        onClick={() => setIsModalOpen(true)}
      >
        Invite New Borrower
      </Button>

      <Modal
        isOpen={isModalOpen}
        onClose={onModalClose}
        onClick={onSubmit}
        isLoading={isLoading || Boolean(nameError || addressError)}
        firstBtnText="Invite"
      >
        <div className="text-base font-bold px-8">Onboard New Borrower</div>

        <div className="w-full border border-tint-10 my-3" />

        <div className="flex flex-col items-center gap-y-5 px-8">
          <div className="w-72 font-light text-xxs">
            Please provide a label and wallet address for the new borrower you
            want to authorise.
          </div>
          <div className="w-72 font-light text-xxs">
            Once approved here, they will be able to sign the service agreement
            and start borrowing, pending final approval and registration
            on-chain.
          </div>
          <FormItem className="w-full" label="Borrower Label">
            <TextInput
              value={name}
              onChange={onChangeName}
              error={Boolean(nameError)}
              className="w-full bg-tint-11"
              placeholder="e.g.: Wildcat Capital"
            />
          </FormItem>
          <FormItem className="w-full" label="Borrower Wallet Address">
            <TextInput
              value={address}
              onChange={onChangeAddress}
              error={Boolean(addressError)}
              className="w-full bg-tint-11"
              placeholder="e.g.: 0xb4B9f935bf0189c2FF46165F04b0D517e9553FBc"
            />
          </FormItem>
          {isLoading && (
            <Spinner
              isLoading={isLoading}
              fixedDisable
              className="w-5 h-5 mt-2"
            />
          )}
        </div>
      </Modal>
    </>
  )
}
