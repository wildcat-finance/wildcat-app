import { useRef } from 'react';
import { useTextField } from 'react-aria';
import cn from 'classnames'

import { InputProps } from "./interface";

export const Input = (props: InputProps) => {
    const {
        className,
    } = props;
    const ref = useRef(null);
    const { inputProps } = useTextField(props, ref);

    const inputCssClass = cn(
        'h-8 px-3 text-xxs border bg-white outline-none',
        { 'opacity-50': props.isDisabled },
        { 'border-red-border': props.error },
        { 'border-tint-9': !props.error },
        className,
    )

    return (
        <input
            {...inputProps}
            className={inputCssClass}
            ref={ref}
        />
    );
}
