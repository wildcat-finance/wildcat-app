import { ReactNode } from 'react';
import { Control, FieldErrors } from 'react-hook-form';
import { FormSchema } from '../validationSchema';

export interface NumberVaultInputProps {
  control: Control<FormSchema, any>
  formErrors: FieldErrors<FormSchema> 
  name: "vaultType" | "underlyingToken" | "namePrefix" | "symbolPrefix" | "maxAmount" | "annualRate" | "penaltyRate" | "reserveRatio" | "gracePeriod" | "withdrawalCycle"
  inputClass?: string
  endDecorator: ReactNode
  label: string
  tooltip: string
}