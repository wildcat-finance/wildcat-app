import type { AriaTextFieldProps } from 'react-aria';

export type InputProps = AriaTextFieldProps & {
    className?: string,
    error?: boolean;
}