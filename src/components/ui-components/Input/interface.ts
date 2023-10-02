import type { AriaTextFieldProps } from 'react-aria';

export type InputProps = AriaTextFieldProps & {
    hint?: string,
    endDecorator?: React.ReactNode
    inputClassName?: string,
    className?: string,
    tooltip?: string,
    error?: boolean;       
    errorText?: string;    
}