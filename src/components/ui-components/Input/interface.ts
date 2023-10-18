import type {NumericFormatProps} from "react-number-format/types/types";

export type InputProps = NumericFormatProps & {
    className?: string,
    error?: boolean;
}
