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

    return (
        <HCombobox value={value} onChange={onSelect} >
            <HCombobox.Input
                className="h-8 px-3 text-xxs border border-tint-9 bg-white outline-none w-72"
                value={query}
                onChange={handleSearch}
            />

            <HCombobox.Options>
                {options.map((option) => (
                    <HCombobox.Option key={option.id} value={option.value}>
                        {option.label}
                    </HCombobox.Option>
                ))}
            </HCombobox.Options>
        </HCombobox>
    )
}