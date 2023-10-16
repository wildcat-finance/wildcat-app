import { InputProps } from '../Input/interface'

export type NumberInputProps = InputProps & {
  onChange?: (value: string | number) => void
  min?: number
  max?: number
}