import { Input as RInput } from 'react-aria-components'
import cn from 'classnames'
import { InputProps } from "./interface";

export const Input = (props: InputProps) => {
    const {
        className,
        error,
        ...rest
    } = props;

    const inputCssClass = cn(
        'h-8 px-3 text-xxs border bg-white outline-none',
        { 'opacity-50': props.disabled },
        { 'border-red-border': error },
        { 'border-tint-9': !error },
        className,
    )

    return (
        <RInput
            className={inputCssClass}
            {...rest}
        />
    );
}
