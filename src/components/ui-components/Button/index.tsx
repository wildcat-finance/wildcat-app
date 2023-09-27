
import cn from 'classnames'

import './styles.css';
import { ButtonProps } from "./interface";

export const Button = ({ variant, disabled, children, onClick, className, icon }: ButtonProps) => {
    const cssClass = cn(
        'text-white text-xxs py-2 px-5 rounded-full',
        'flex items-center justify-center',
        `wc-btn-${variant}`,
        { 'bg-gray cursor-not-allowed': disabled},
        { 'gap-2.5': icon },
        className,
    )

    return (
        <button
            className={cssClass}
            disabled={disabled}
            onClick={onClick}>
                {children}
                {icon}
        </button>
    )
}