import { useState } from 'react'
import { Combobox as HCombobox } from '@headlessui/react'

import { ComboboxProps } from './interface'
import cn from "classnames";

export const Combobox = ({ value, onSelect, onSearch, options}: ComboboxProps) => {
    const [query, setQuery] = useState('')

    const handleSearch = (evt:  React.ChangeEvent<HTMLInputElement>) => {
        const { value } = evt.target

        setQuery(value)
        onSearch(value)
    }

    console.log(options);
    

    return (
        <HCombobox value={value} onChange={onSelect} >
            <HCombobox.Input
                className="h-8 px-3 text-xxs border border-tint-9 bg-white outline-none w-72"
                value={query}
                onChange={handleSearch}
            />

            <HCombobox.Options>
                {options.map((option) => (
                    <HCombobox.Option 
                        key={option.id} 
                        value={option.value} 
                        className="w-72 h-8 px-3 border border-tint-9 border-t-0 bg-white text-xxs flex items-center gap-x-2.5"
                    >
                        <div className="w-6 h-6 rounded-full flex items-center justify-center">
                            <img src={option.icon} alt={option.label} className="w-6 h-6 rounded-full" />
                        </div>
                        {option.label}
                    </HCombobox.Option>
                ))}
            </HCombobox.Options>
        </HCombobox>
    )
}