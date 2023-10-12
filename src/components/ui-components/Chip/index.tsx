import cn from 'classnames'

import { ChipProps } from "./interface";

const CHIP_COLORS = {
    'default': 'bg-tint-9',
    'gray': 'bg-gray',
    'red': 'bg-red text-white',
    'yellow': 'bg-yellow',
    'green':  'bg-green'
}

export const Chip = (props: ChipProps) => {
    const { className, color = 'default', children } = props;

    const cssClass = cn(
        CHIP_COLORS[color],
        'h-8 px-2 flex items-center text-xxs',
        className,
    )

    return (
        <div className={cssClass}>
            {children}
        </div>
    )
}