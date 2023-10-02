import cn from 'classnames'

import { ChipProps } from "./interface";

export const Chip = (props: ChipProps) => {
    const { className, children } = props;

    const cssClass = cn(
        'h-8 px-2 flex items-center bg-tint-9 text-xxs',
        className
    )

    return (
        <div className={cssClass}>
            {children}
        </div>
    )
}