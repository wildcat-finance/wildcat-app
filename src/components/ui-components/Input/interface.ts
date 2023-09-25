import type { AriaTextFieldProps } from 'react-aria';

export type InputProps = AriaTextFieldProps & {
    hint?: string,
    endDecorator?: React.ReactNode
}