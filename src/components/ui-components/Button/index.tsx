
import cn from 'classnames'

import './styles.css';
import { ButtonProps } from "./interface";

export const Button = ({ variant, disabled, children, onClick }: ButtonProps) => {
    const cssClass = cn(
        `wc-btn-${variant}`,
        { 'wc-btn-disabled': disabled}
    )

    return (
        <button
            className={cssClass}
            disabled={disabled}
            onClick={onClick}>
                {children}
        </button>
    )
}