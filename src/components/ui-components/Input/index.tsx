import { useRef } from 'react';
import { useTextField } from 'react-aria';
import cn from 'classnames'

import { Tooltip } from "../Tooltip";
import { InputProps } from "./interface";

export const Input = (props: InputProps) => {
    const {
        label,
        endDecorator,
        inputClassName ,
        className,
        tooltip
    } = props;
    const ref = useRef(null);
    const { labelProps, inputProps } = useTextField(props, ref);

    const inputCssClass = cn(
        'h-8 px-3 text-xxs border border-tint-9 bg-white outline-none',
        { 'opacity-50': props.isDisabled },
        inputClassName
    )

    return (
        <div className={cn('flex flex-col', className)}>
            <div className="flex justify-between w-full items-start">
                <label {...labelProps} className="font-bold text-xxs mb-2">
                    {label}
                </label>

                { tooltip && <Tooltip content={tooltip} /> }
            </div>

            <div className="flex">
                <input
                    {...inputProps}
                    className={inputCssClass}
                    ref={ref}
                />
                {endDecorator}
            </div>
        </div>
    )
}