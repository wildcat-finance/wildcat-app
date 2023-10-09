import { Input as RInput } from 'react-aria-components'
import cn from 'classnames'
import { InputProps } from "./interface";

export const Input = (props: InputProps) => {
    const {
        className,
        min,
        max,
        type,
    } = props;

    const isNumberInput = type === 'number';

    const formatNumber = (n: string) => {
        return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    }


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (isNumberInput) {
            formatNumber(event.target.value)
            let numericValue = parseFloat(event.target.value);

            if (isNaN(numericValue)) {
                event.target.value = '';
            } else if (numericValue < Number(min)) {
                numericValue = Number(min);
            } else if (numericValue > Number(max)) {
                numericValue = Number(max);
            }
        
            event.target.value = numericValue.toString();
        }
    };


    const inputCssClass = cn(
        'h-8 px-3 text-xxs border bg-white outline-none',
        { 'opacity-50': props.isDisabled },
        { 'border-red-border': props.error },
        { 'border-tint-9': !props.error },
        className,
    )

    return (
        <RInput
            className={inputCssClass}
            min={min}
            max={max}
            type={type}
            onChange={handleInputChange}
        />
    );
}
