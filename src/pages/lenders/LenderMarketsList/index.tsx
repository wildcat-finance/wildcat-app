import { useMemo, useState } from "react"

import { Select, Spinner, TextInput } from "../../../components/ui-components"
import { SelectOptionItem } from "../../../components/ui-components/Select/interface"
import { mockedStatuses } from "../../../mocks/vaults"
import { getMarketStatus } from "../../../utils/marketStatus"
import { useLendersMarkets } from "./hooks/useLendersMarkets"

import VaultCard from "./VaultCard"

function LenderMarketsList() {
  const [filterByName, setFilterByName] = useState<string>("")
  const [showTerminated, setShowTerminated] = useState<boolean>(false)
  const [selectedUnderlyingAsset, setSelectedUnderlyingAsset] =
    useState<SelectOptionItem | null>(null)
  const [selectedVaultStatus, setSelectedVaultStatus] =
    useState<SelectOptionItem | null>(null)

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

  const {
    data: lendersMarkets,
    isLoadingInitial,
    isLoadingUpdate,
  } = useLendersMarkets()
  const noAvailableMarkets = lendersMarkets.length === 0
  const isLoading = isLoadingInitial || isLoadingUpdate

  const mockedVaultStatusOptions: SelectOptionItem[] = mockedStatuses
    .sort()
    .map((status: string) => ({
      id: status,
      label: status,
      value: status,
    }))

  const filteredMarkets = useMemo(() => {
    if (!lendersMarkets) {
      return []
    }

    const sortedMarkets = lendersMarkets
      .filter((market) => {
        if (showTerminated) return true
        return !market.market.isClosed
      })
      .filter((lendersMarket) => {
        if (!selectedVaultStatus) return true
        return (
          getMarketStatus(
            lendersMarket.market.isClosed,
            lendersMarket.market.isDelinquent,
            lendersMarket.market.isIncurringPenalties,
          ) === selectedVaultStatus.value
        )
      })
      .filter((market) => {
        if (!filterByName) return true
        return market.market.name.toLowerCase().includes(filterByName)
      })
      .filter((market) => {
        if (!selectedUnderlyingAsset) return true
        return (
          market.market.underlyingToken.symbol === selectedUnderlyingAsset.value
        )
      })
      .sort((a, b) => {
        const isClosedA = a.market.isClosed
        const isClosedB = b.market.isClosed

        if (isClosedA && !isClosedB) {
          return 1
        }
        if (!isClosedA && isClosedB) {
          return -1
        }
        return 0
      })

    return sortedMarkets
  }, [
    lendersMarkets,
    selectedVaultStatus,
    filterByName,
    selectedUnderlyingAsset,
    showTerminated,
  ])

  const filterUnderlyingOptions = useMemo(() => {
    if (!lendersMarkets) return []

    const options = lendersMarkets
      .map((lendersMarket) => lendersMarket.market.underlyingToken.symbol)
      .filter((value, index, self) => self.indexOf(value) === index)

    return options.map((option) => ({
      id: option,
      label: option,
      value: option,
    }))
  }, [lendersMarkets])

  if (isLoading) {
    return <Spinner isLoading />
  }

  return (
    <>
      <div className="text-xs flex-col">
        <div className="text-xs font-normal underline">My Markets</div>
        <div className="text-green text-2xl font-bold mt-8">
          All Markets For Lender
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
        {noAvailableMarkets && (
          <div className="m-auto">No markets available yet</div>
        )}
        {filteredMarkets.map((lendersMarket) => (
          <div
            key={lendersMarket.market.address}
            className="w-1/3 px-2.5 py-2.5"
          >
            <VaultCard market={lendersMarket.market} className="w-full" />
          </div>
        ))}
      </div>
    </>
  )
}

export default LenderMarketsList
