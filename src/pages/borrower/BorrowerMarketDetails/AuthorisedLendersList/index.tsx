import { HiCheck, HiOutlinePencilAlt, HiX } from "react-icons/hi"
import { useMemo, useState } from "react"
import {
  Table,
  TableCell,
  TableRow,
  Spinner,
  TextInput,
} from "../../../../components/ui-components"

import { AuthorisedLendersListProps } from "./interface"
import { useGetAuthorisedLendersByMarket } from "../hooks/useGetAuthorisedLenders"
import { EtherscanLink } from "../../../../components/ui-components/EtherscanLink"
import { useLenderNameStore } from "../../../../store/useLenderNameStore"
import "./index.css"
import { LenderNameStore } from "../../../../store/interface"
import { trimAddress } from "../../../../utils/formatters"
import { ClickAwayListener } from "../../../../components/ui-components/ClickAwayListener"

type LenderRowProps = {
  address: string
  name: string
  store: LenderNameStore
}

function LenderRow({ address, name, store }: LenderRowProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [newName, setNewName] = useState(name)
  const onChangeName = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target
    setNewName(value)
  }

  const handleSave = () => {
    setIsEditing(false)
    if (!newName) {
      store.removeLenderName(address)
    } else {
      store.setLenderName(address, newName)
    }
  }
  const handleCancel = () => {
    setIsEditing(false)
    setNewName(name)
  }

  return (
    <TableRow key={address}>
      <TableCell justify="start">
        {isEditing ? (
          <ClickAwayListener onClickAway={handleCancel}>
            <div className="flex w-full flex-row justify-center items-center gap-2">
              <TextInput
                className="w-full bg-tint-9"
                value={newName}
                onChange={onChangeName}
                autoFocus
                onKeyDown={(e) => {
                  e.stopPropagation()
                  if (e.key === "Enter") {
                    handleSave()
                  }
                }}
              />
              <HiCheck
                className="icon-hover text-green flex"
                onClick={handleSave}
              />
              <HiX
                className="icon-hover text-red flex"
                onClick={handleCancel}
              />
            </div>
          </ClickAwayListener>
        ) : (
          <div
            className="flex w-full flex-row justify-center items-center gap-2"
            onDoubleClick={(e) => {
              e.stopPropagation()
              setIsEditing(true)
            }}
          >
            {name}

            <HiOutlinePencilAlt
              className="flex icon-hover"
              style={{ marginLeft: "auto" }}
              onClick={() => {
                setIsEditing(true)
              }}
            />
          </div>
        )}
      </TableCell>
      <TableCell justify="start">
        <EtherscanLink kind="address" value={address}>
          {address}
        </EtherscanLink>
      </TableCell>
    </TableRow>
  )
}

export const AuthorisedLendersList = ({
  market,
}: AuthorisedLendersListProps) => {
  const { data: authorisedLenders, isLoading } =
    useGetAuthorisedLendersByMarket(market)
  const namesStore = useLenderNameStore()
  const lenders = useMemo(() => {
    const lendersList: Array<{ address: string; name: string }> = []
    // eslint-disable-next-line no-restricted-syntax
    for (const address of authorisedLenders ?? []) {
      lendersList.push({
        address,
        name:
          namesStore[`lender-name-${address.toLowerCase()}`] ||
          trimAddress(address),
      })
    }
    return lendersList
  }, [authorisedLenders, namesStore])

  return (
    <>
      <Table
        headers={[
          {
            title: "Name",
            align: "start",
            className: "w-44",
          },
          {
            title: "Wallet Address",
            align: "start",
            className: "w-72",
          },
        ]}
      >
        {lenders &&
          lenders.map(({ address, name }) => (
            <LenderRow address={address} name={name} store={namesStore} />
          ))}
      </Table>

      <Spinner isLoading={isLoading} fixedDisable className="w-5 h-5 mt-2" />
    </>
  )
}
