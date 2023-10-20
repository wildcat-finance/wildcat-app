import { ReactNode } from "react"
import { Control, FieldErrors } from "react-hook-form"

import { FormSchema } from "../../../pages/borrower/AddNewVault/validationSchema"
import { NumberInputProps } from "../NumberInput/interface"

export type FormNumberInputProps = {
  control: Control<FormSchema>
  formErrors: FieldErrors<FormSchema>
  name:
    | "vaultType"
    | "underlyingToken"
    | "namePrefix"
    | "symbolPrefix"
    | "maxAmount"
    | "annualRate"
    | "penaltyRate"
    | "reserveRatio"
    | "gracePeriod"
    | "withdrawalCycle"
  inputClass?: string
  endDecorator: ReactNode
  label: string
  tooltip: string
  min?: number
  max?: number
  decimalScale?: NumberInputProps["decimalScale"]
}
