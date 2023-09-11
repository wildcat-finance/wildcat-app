
import cn from 'classnames'

import './styles.css';
import { ButtonProps } from "./interface";

const Button = ({ variant, disabled, children }: ButtonProps) => {
    const cssClass = cn(
        `btn-${variant}`,
        { 'btn-disabled': disabled}
    )

    return (
        <button className={cssClass} disabled={disabled}>{children}</button>
    )
}

export default Button;