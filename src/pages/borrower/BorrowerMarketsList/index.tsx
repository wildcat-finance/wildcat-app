import { useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"

import {
  Select,
  TextInput,
  Button,
  Spinner,
} from "../../../components/ui-components"
import VaultCard from "./VaultCard"

import { mockedStatuses } from "../../../mocks/vaults"
import { SelectOptionItem } from "../../../components/ui-components/Select/interface"
import { useMarketsForBorrower } from "../hooks/useMarketsForBorrower"
import { getMarketStatus } from "../../../utils/marketStatus"

const mockedVaultStatusOptions: SelectOptionItem[] = mockedStatuses
  .sort()
  .map((status: string) => ({
    id: status,
    label: status,
    value: status,
  }))

function BorrowerMarketsList() {
  const navigate = useNavigate()
  const [showTerminated, setShowTerminated] = useState<boolean>(false)
  const [filterByName, setFilterByName] = useState<string>("")
  const [selectedUnderlyingAsset, setSelectedUnderlyingAsset] =
    useState<SelectOptionItem | null>(null)
  const [selectedVaultStatus, setSelectedVaultStatus] =
    useState<SelectOptionItem | null>(null)
  const { data: markets, isLoading } = useMarketsForBorrower()
  const noMarkets = markets?.length === 0

  const handleVaultStatusChange = (selectedOption: SelectOptionItem | null) => {
    setSelectedVaultStatus(selectedOption)

    if (selectedOption?.value === "Terminated") {
      setShowTerminated(true)
    } else {
      setShowTerminated(false)
    }
  }

  const handleFilterByName = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target
    setFilterByName(value.toLowerCase())
  }

  const filterUnderlyingOptions = useMemo(() => {
    if (!markets) return []

    const options = markets
      .map((market) => market.underlyingToken.symbol)
      .filter((value, index, self) => self.indexOf(value) === index)

    return options.map((option) => ({
      id: option,
      label: option,
      value: option,
    }))
  }, [markets])

  if (isLoading) {
    return <Spinner isLoading />
  }

  const filteredMarkets = markets
    ? markets
        .filter((market) => {
          if (showTerminated) return true
          return !market.isClosed
        })
        .filter((market) => {
          if (!selectedVaultStatus) return true
          return (
            getMarketStatus(
              market.isClosed,
              market.isDelinquent,
              market.isIncurringPenalties,
            ) === selectedVaultStatus.value
          )
        })
        .filter((market) => {
          if (!filterByName) return true
          return market.name.toLowerCase().includes(filterByName)
        })
        .filter((market) => {
          if (!selectedUnderlyingAsset) return true
          return market.underlyingToken.symbol === selectedUnderlyingAsset.value
        })
        .sort((a, b) => {
          const isClosedA = a.isClosed
          const isClosedB = b.isClosed

          if (isClosedA && !isClosedB) {
            return 1
          }
          if (!isClosedA && isClosedB) {
            return -1
          }
          return 0
        })
    : []

  return (
    <div>
      <div className="text-xs flex-col">
        <div className="text-xs font-normal underline">My Markets</div>
        <div className="text-green text-2xl font-bold justify-between items-center flex mt-8">
          All Markets For Borrower
          <div className="px-5">
            <Button
              onClick={() => navigate("/borrower/add-new-vault")}
              variant="blue"
            >
              New Market
            </Button>
          </div>
        </div>
        <div className="flex flex-row gap-x-2 align-middle mt-3">
          <input
            type="checkbox"
            id="showTerminated"
            checked={showTerminated}
            onChange={() => setShowTerminated(!showTerminated)}
          />
          <label htmlFor="showTerminated">Show terminated Markets</label>
        </div>

        <div className="flex w-full flex-wrap -mx-2.5 mt-3">
          <div className="w-1/3 px-2.5 py-2.5">
            <TextInput
              onChange={handleFilterByName}
              placeholder="Filter By Market Name"
              className="w-full"
            />
          </div>
          <div className="w-1/3 px-2.5 py-2.5">
            <Select
              options={filterUnderlyingOptions}
              onChange={setSelectedUnderlyingAsset}
              selected={selectedUnderlyingAsset}
              placeholder="Underlying Asset"
              className="w-full"
              noneOption
            />
          </div>
          <div className="w-1/3 px-2.5 py-2.5">
            <Select
              options={mockedVaultStatusOptions}
              onChange={handleVaultStatusChange}
              selected={selectedVaultStatus}
              placeholder="Market Status"
              className="w-full"
              noneOption
            />
          </div>
        </div>
      </div>

      <div className="flex w-full flex-wrap -mx-2.5 mt-5">
        {noMarkets && <div className="m-auto">No markets yet</div>}
        {filteredMarkets.map((market) => (
          <div key={market.address} className="w-1/3 px-2.5 py-2.5">
            <VaultCard market={market} className="w-full" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default BorrowerMarketsList
