import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import cancelRoundRedIcon from "../../../../../components/ui-components/icons/cancel_round_red.svg"
import {
  Button,
  FormItem,
  Modal,
  TextInput,
} from "../../../../../components/ui-components"

import {
  NewLenderFormSchema,
  newLenderValisationSchema,
} from "./validationSchema"

const newLenderFormDefaults: NewLenderFormSchema = {
  lenderName: "",
  lenderWallet: "",
}

export function NewLendersModal() {
  const { setValue, getValues, watch, reset } = useForm<NewLenderFormSchema>({
    resolver: zodResolver(newLenderValisationSchema),
    defaultValues: newLenderFormDefaults,
    reValidateMode: "onBlur",
  })
  const [newLenders, setNewLenders] = useState<NewLenderFormSchema[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleChangeInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target
    const name = evt.target.name as keyof NewLenderFormSchema

    setValue(name, value)
  }

  const handleAddLender = () => {
    const newLender = getValues()

    setNewLenders([...newLenders, newLender])
    reset()
  }

  const formValues = watch()

  const clearInputOnClose = () => {
    setNewLenders([])
    reset()
  }

  const handleCancelLender = (lenderToRemove: NewLenderFormSchema) => {
    const updatedLenders = newLenders.filter(
      (lender) => lender !== lenderToRemove,
    )
    setNewLenders(updatedLenders)
  }

  const onModalClose = () => {
    clearInputOnClose()
    setIsModalOpen(false)
  }

  return (
    <>
      <Button
        variant="blue"
        className="w-24 whitespace-nowrap"
        onClick={() => setIsModalOpen(true)}
      >
        Onboard Lenders
      </Button>

      <Modal isOpen={isModalOpen} onClose={onModalClose}>
        <div className="text-base font-bold px-8">Onboard New Lender/s</div>

        <div className="w-full border border-tint-10 my-3" />

        <div className="flex flex-col items-center gap-y-5 px-8">
          <div className="w-72 font-light text-xxs text-center ">
            Some text about what you are about to get yourself into and can you
            fulfill the params of doing this and make the text nice and
            descriptive but not too waffly.
          </div>
          <FormItem className="w-full" label="Lender Name" tooltip="test">
            <TextInput
              onChange={handleChangeInput}
              value={formValues.lenderName}
              name="lenderName"
              className="w-full bg-tint-11"
              placeholder="Enter name of Lender"
            />
          </FormItem>
          <FormItem
            className="w-full"
            label="Lender Wallet Address"
            tooltip="test"
          >
            <TextInput
              name="lenderWallet"
              value={formValues.lenderWallet}
              onChange={handleChangeInput}
              className="w-full bg-tint-11"
              placeholder="eg: 0x987234oiwef8u234892384824309ljw0975a"
            />
          </FormItem>
          <Button variant="blue" className="w-28" onClick={handleAddLender}>
            Add
          </Button>
          <div className="flex flex-col gap-y-2 w-full">
            <div className="w-full border border-tint-10" />

            <div className="text-base font-bold text-center">
              You have added:
            </div>
            {newLenders.map((lender) => (
              <div className="flex gap-x-4">
                <div className="flex flex-col justify-between w-full">
                  <div className="text-xs font-medium">{lender.lenderName}</div>
                  <div className="text-xs">{lender.lenderWallet}</div>
                </div>
                <Button
                  onClick={() => handleCancelLender(lender)}
                  variant="outline"
                >
                  <img
                    className="w-5 h-5"
                    src={cancelRoundRedIcon}
                    alt="Cancel"
                  />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </>
  )
}

export default NewLendersModal
