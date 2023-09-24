import { ReactNode  } from "react";

export type ButtonProps = {
    variant: 'green' | 'brown' | 'black' | 'blue' | 'gold',
    disabled?: boolean,
    children?: ReactNode,
    onClick?: () => void,
}