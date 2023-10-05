import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import expandArrow from '../../components/ui-components/icons/expand_more.svg'

const people = [
  { name: 'Please select' },
  { name: 'vault type 1' },
  { name: 'vault type 2' },
  { name: 'vault type 3' },
  { name: 'vault type 4' },
  { name: 'vault type 5' },
  { name: 'vault type 6' },
]

export default function Dropdown() {
  const [selected, setSelected] = useState(people[0])

  return (
    <div className='ml-0 w-72'>
      <Listbox value={selected} onChange={setSelected}>
        <div>
          <Listbox.Button className="cursor-default bg-white text-left w-full h-8 pl-3 border border-tint-8 flex items-center justify-between pr-2">
            <span className="block truncate text-xxs">
              {selected.name}
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
              {people.map((person, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `relative z-50 border border-t-0 border-tint-8 cursor-default bg-white text-left w-full h-8 px-3 flex items-center ${
                      active ? 'text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={person}
                >
                    <>
                      <span
                        className="block truncate text-xxs "
                      >
                        {person.name}
                      </span>
                    </>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}
