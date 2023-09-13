import { useRef } from 'react';
import type { AriaTextFieldProps } from 'react-aria';
import { useTextField } from 'react-aria';
import cn from 'classnames'

import './styles.css';

export const Input = (props: AriaTextFieldProps) => {
    const { label } = props;
    const ref = useRef(null);
    const { labelProps, inputProps } = useTextField(props, ref);

    const cssClass = cn(
        'wc-input'
    )

    return (
        <div>
            <label {...labelProps} className="wc-label">{label}</label>
            <input
                {...inputProps}
                className={cssClass} ref={ref}
            />
        </div>
    )
}