import { HiCheck, HiOutlinePencilAlt, HiX } from "react-icons/hi"
import { useMemo, useRef, useState } from "react"
import { FaCheck } from "react-icons/fa"
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
    store.setLenderName(address, newName || address)
  }
  const handleCancel = () => {
    setIsEditing(false)
    setNewName(name)
  }

  return (
    <TableRow key={address}>
      <TableCell justify="start" />
      <TableCell justify="start" className="w-full" containerClassName="w-1/2">
        {isEditing ? (
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
            <HiX className="icon-hover text-red flex" onClick={handleCancel} />
          </div>
        ) : (
          <div
            className="flex w-full flex-row justify-center items-center gap-2"
            onDoubleClick={(e) => {
              e.stopPropagation()

              setIsEditing(true)
            }}
          >
            <EtherscanLink kind="address" value={address}>
              {name}
            </EtherscanLink>

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
      <TableCell justify="center" />
    </TableRow>
  )
}

export const AuthorisedLendersList = ({
  marketAddress,
}: AuthorisedLendersListProps) => {
  const { data: authorisedLenders, isLoading } =
    useGetAuthorisedLendersByMarket(marketAddress)
  const namesStore = useLenderNameStore()
  const lenders = useMemo(() => {
    const lendersList: Array<{ address: string; name: string }> = []
    // eslint-disable-next-line no-restricted-syntax
    for (const address of authorisedLenders ?? []) {
      lendersList.push({
        address,
        name: namesStore[`lender-name-${address.toLowerCase()}`] || address,
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
          },
          {
            title: "",
            align: "start",
            className: "w-24",
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
