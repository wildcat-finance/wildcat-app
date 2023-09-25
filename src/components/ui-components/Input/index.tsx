import { useRef } from 'react';
import { useTextField } from 'react-aria';
import cn from 'classnames'

import { InputProps } from "./interface";

export const Input = (props: InputProps) => {
    const { label, endDecorator } = props;
    const ref = useRef(null);
    const { labelProps, inputProps } = useTextField(props, ref);

    const cssClass = cn(
        'h-8 px-4 border border-tint-9 bg-white',
        { 'opacity-50': props.isDisabled }
    )

    return (
        <div className="flex flex-col">
            <label {...labelProps} className="font-black">{label}</label>
            <div className="flex">
                <input
                    {...inputProps}
                    className={cssClass} ref={ref}
                />

                {endDecorator}
            </div>
        </div>
    )
}