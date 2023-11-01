import React from "react"

import {
  Button,
  Item,
  ListBox,
  Popover,
  Select,
  SelectValue,
} from "react-aria-components"

import { ExpandMore } from "../../icons"

import { SelectProps } from "./type"

export const RSelect = ({
  options,
  onChange,
  placeholder,
  noneOption = true,
}: SelectProps) => (
  <Select
    className="flex flex-col w-full text-xxs"
    placeholder={placeholder}
    aria-label={placeholder}
    // onSelectionChange={(key) => console.log("key", key)}
    onSelectionChange={(key) => {
      const selected = options.find(
        (option) => `react-aria-${option.id}` === key,
      )
      console.log("selected", selected)
      onChange(selected || null)
    }}
  >
    <Button className="cursor-default bg-white text-left w-full h-8 pl-3 border border-tint-8 flex items-center justify-between pr-2">
      <SelectValue />
      <ExpandMore />
    </Button>
    <Popover className="w-[--trigger-width] bg-white text-xxs">
      <ListBox>
        {noneOption && (
          <Item
            className="group flex items-center gap-2 cursor-default select-none px-3 h-8 border border-t-0 border-tint-8"
            textValue="None"
          >
            <div className="block truncate text-xxs w-full">None</div>
          </Item>
        )}
        {options.map((option) => (
          <Item
            key={option.id}
            value={option}
            textValue={option.label}
            className="group flex items-center gap-2 cursor-default select-none px-3 h-8 border border-t-0 border-tint-8"
          >
            <div className="block truncate text-xxs">{option?.label}</div>
          </Item>
        ))}
      </ListBox>
    </Popover>
  </Select>
)
