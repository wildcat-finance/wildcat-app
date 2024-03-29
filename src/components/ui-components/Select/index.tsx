import {
  ForwardedRef,
  forwardRef,
  Fragment,
  ReactElement,
  RefAttributes,
} from "react"
import { Listbox, Transition } from "@headlessui/react"
import cn from "classnames"

import expandArrow from "../icons/expand_more.svg"
import { SelectOptionItem, SelectProps } from "./interface"

const SelectOptionBaseClass =
  "relative z-50 border border-t-0 border-tint-8 cursor-default bg-white text-left w-full h-8 px-3 flex items-center "

const SelectWihRef = <T,>(
  props: SelectProps<T>,
  ref: ForwardedRef<HTMLButtonElement>,
) => {
  const {
    options,
    selected,
    onChange,
    onBlur,
    placeholder,
    noneOption,
    disabled,
  } = props

  const rootCss = cn("ml-0 w-72 relative", props.className)

  return (
    <div className={rootCss}>
      <Listbox value={selected} onChange={onChange} disabled={disabled}>
        <div>
          <Listbox.Button
            ref={ref}
            onBlur={onBlur}
            className="cursor-default bg-white text-left w-full h-8 pl-3 border border-tint-8 flex items-center justify-between pr-2"
          >
            <span className="block truncate text-xxs">
              {selected ? selected.label : placeholder || "Select"}
            </span>

            <span>
              <img src={expandArrow} alt="Expand more" />
            </span>
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-40 mt-0 py-0 shadow-lg w-full overflow-auto bg-white text-base sm:text-sm">
              {noneOption && (
                <Listbox.Option
                  value={null}
                  onClick={() => onChange(null)}
                  className={({ active }) =>
                    cn(SelectOptionBaseClass, {
                      "text-amber-900": active,
                      "text-gray-900": !active,
                    })
                  }
                >
                  <span className="block truncate text-xxs">None</span>
                </Listbox.Option>
              )}
              {options.map((option) => (
                <Listbox.Option
                  key={option.id}
                  value={option}
                  className={({ active }) =>
                    cn(SelectOptionBaseClass, {
                      "text-amber-900": active,
                      "text-gray-900": !active,
                    })
                  }
                >
                  <span className="block truncate text-xxs">
                    {option?.label}
                  </span>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

type ForwardRefSelectFn<R> = <
  V = string,
  O extends SelectOptionItem<V> = SelectOptionItem<V>,
>(
  p: SelectProps<V, O> & RefAttributes<R>,
) => ReactElement

export const Select = forwardRef(
  SelectWihRef,
) as ForwardRefSelectFn<HTMLButtonElement>
