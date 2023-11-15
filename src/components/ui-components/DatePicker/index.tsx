import { useState } from "react"

import {
  Button,
  Calendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  DateInput,
  DatePicker,
  DateSegment,
  DateValue,
  Dialog,
  Group,
  Heading,
} from "react-aria-components"
import { RoundButton } from "./RoundButton"
import { MyPopover } from "./MyPopover"
import { CalendarIcon, BackArrow } from "../icons/index"

import { DatePickerProps } from "./type"

export function DatePickerInput<T extends DateValue>({
  placeholder,
  ...props
}: DatePickerProps<T>) {
  const [isPlaceholderShown, setPlaceholder] = useState(true)

  const handleChooseDate = () => {
    setPlaceholder(false)
  }

  return (
    <DatePicker
      className="group flex flex-col gap-1 w-36"
      {...props}
      aria-label="Select date"
    >
      <Group className="flex bg-white/90 transition pl-3 text-black border border-tint-11">
        {!isPlaceholderShown && (
          <DateInput className="flex flex-1 py-2">
            {(segment) => (
              <DateSegment segment={segment} className="text-xxs" />
            )}
          </DateInput>
        )}

        {isPlaceholderShown && (
          <div className="flex flex-1 py-2 text-xxs">{placeholder}</div>
        )}
        <Button className="outline-none pr-3 flex items-center transition bg-transparent">
          <CalendarIcon onClick={handleChooseDate} />
        </Button>
      </Group>
      <MyPopover>
        <Dialog className="p-6 text-gray-600">
          <Calendar>
            <header className="flex items-center gap-1 pb-4 px-1 w-full">
              <Heading className="flex-1 text-2xl ml-2" />
              <RoundButton slot="previous">
                <BackArrow />
              </RoundButton>
              <RoundButton slot="next">
                <BackArrow className="transform rotate-180" />
              </RoundButton>
            </header>
            <CalendarGrid className="border-spacing-1 border-separate">
              <CalendarGridHeader>
                {(day) => (
                  <CalendarHeaderCell className="text-xs text-gray-500 font-semibold">
                    {day}
                  </CalendarHeaderCell>
                )}
              </CalendarGridHeader>
              <CalendarGridBody>
                {(date) => (
                  <CalendarCell
                    date={date}
                    className="w-9 h-9 data-[outside-month=true]:text-white outline-none cursor-pointer flex items-center justify-center hover:font-bold focus-visible:font-bold"
                  />
                )}
              </CalendarGridBody>
            </CalendarGrid>
          </Calendar>
        </Dialog>
      </MyPopover>
    </DatePicker>
  )
}
