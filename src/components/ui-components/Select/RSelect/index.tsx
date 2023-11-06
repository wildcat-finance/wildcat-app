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
    onSelectionChange={(key) => {
      const selectedKey = Number(key.toString().replace("react-aria-", ""))
      const option = options[selectedKey - 2]
      onChange(option)
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
