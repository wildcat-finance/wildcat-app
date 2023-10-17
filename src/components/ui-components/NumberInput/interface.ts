import { InputProps } from '../Input/interface'

export type NumberInputProps = Omit<InputProps, 'onChange'> & {
  onChange?: (value: number | string) => void
  min?: number | string
  max?: number | string
}