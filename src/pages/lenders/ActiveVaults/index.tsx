import { useMemo, useState } from "react"

import { ServiceAgreementCard } from "../../../components/ServiceAgreementCard"
import { Select, TextInput } from "../../../components/ui-components"
import { SelectOptionItem } from "../../../components/ui-components/Select/interface"
import { useTokensList } from "../../../hooks/useTokensList"
import { mockedStatuses } from "../../../mocks/vaults"
import { getMarketStatus } from "../../../utils/marketStatus"
import { useLendersMarkets } from "./hooks/useLendersMarkets"

import VaultCard from "./VaultCard"

const user = "plums.eth"

function ActiveVaults() {
  const [filterByName, setFilterByName] = useState<string>("")
  const [selectedUnderlyingAsset, setSelectedUnderlyingAsset] =
    useState<SelectOptionItem | null>(null)
  const [selectedVaultStatus, setSelectedVaultStatus] =
    useState<SelectOptionItem | null>(null)

  const handleFilterByName = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target
    setFilterByName(value.toLowerCase())
  }

  const { tokensByChainId } = useTokensList()
  const { data: lendersMarkets } = useLendersMarkets()

  const mockedUnderlyingAssetsOptions: SelectOptionItem[] = tokensByChainId.map(
    (token) => ({
      id: token.address,
      label: token.symbol,
      value: token.symbol,
    }),
  )

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

    return lendersMarkets
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
  }, [
    lendersMarkets,
    selectedVaultStatus,
    filterByName,
    selectedUnderlyingAsset,
  ])

  return (
    <>
      <div className="text-xs flex-col">
        <div className="text-xs font-normal underline">My Markets</div>
        <div className="text-green text-2xl font-bold mt-8">
          Active Markets for lender {user}
        </div>

        <div className="flex w-full flex-wrap -mx-2.5 mt-8">
          <div className="w-1/3 px-2.5 py-2.5">
            <TextInput
              onChange={handleFilterByName}
              placeholder="Filter By Market Name"
              className="w-full"
            />
          </div>
          <div className="w-1/3 px-2.5 py-2.5">
            <Select
              options={mockedUnderlyingAssetsOptions}
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
              onChange={setSelectedVaultStatus}
              selected={selectedVaultStatus}
              placeholder="Market Status"
              className="w-full"
              noneOption
            />
          </div>
        </div>
      </div>

      <div className="flex w-full flex-wrap -mx-2.5 mt-5">
        {filteredMarkets.map((lendersMarket) => (
          <div
            key={lendersMarket.market.address}
            className="w-1/3 px-2.5 py-2.5"
          >
            <VaultCard market={lendersMarket.market} className="w-full" />
          </div>
        ))}
      </div>

      <ServiceAgreementCard
        className="mt-12"
        title="Wildcat Service Agreement"
        description="You agreed to the Wildcat Service Agreement on 12-Sept-2023"
      />
    </>
  )
}

export default ActiveVaults
