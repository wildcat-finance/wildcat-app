import type { InputProps as RInputProps } from 'react-aria-components';

export type InputProps = RInputProps & {
    className?: string,
    error?: boolean;
}