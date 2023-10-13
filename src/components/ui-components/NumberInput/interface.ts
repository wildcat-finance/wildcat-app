import { ReactNode } from 'react';
import { Control, FieldErrors } from 'react-hook-form';
import { FormSchema } from '../../../pages/borrower/AddNewVault/validationSchema';

export interface NumberInputProps {
  name?: string
  onChange: (value: string | number) => void
  error: boolean
  className?: string
  min?: number
  max?: number
}