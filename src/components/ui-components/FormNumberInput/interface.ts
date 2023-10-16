import { ReactNode } from 'react';
import { Control, FieldErrors } from 'react-hook-form';
import { FormSchema } from '../../../pages/borrower/AddNewVault/validationSchema';

export type NumberInputProps = {
  control: Control<FormSchema, any>
  formErrors: FieldErrors<FormSchema> 
  name: "vaultType" | "underlyingToken" | "namePrefix" | "symbolPrefix" | "maxAmount" | "annualRate" | "penaltyRate" | "reserveRatio" | "gracePeriod" | "withdrawalCycle"
  inputClass?: string
  endDecorator: ReactNode
  label: string
  tooltip: string
  min?: number
  max?: number
}