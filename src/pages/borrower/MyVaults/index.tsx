import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"

import { Select, TextInput, Button } from "../../../components/ui-components"
import { ServiceAgreementCard } from "../../../components/ServiceAgreementCard"
import VaultCard from "./VaultCard"

import { mockedStatuses } from "../../../mocks/vaults"
import { SelectOptionItem } from "../../../components/ui-components/Select/interface"
import { useMyMarkets } from "./hooks/useMyMarkets"
import { getMarketStatus } from "../../../utils/marketStatus"
import { useTokensList } from "../../../hooks/useTokensList"

const mockedVaultStatusOptions: SelectOptionItem[] = mockedStatuses
  .sort()
  .map((status: string) => ({
    id: status,
    label: status,
    value: status,
  }))

function MyVaults() {
  const navigate = useNavigate()
  const [filterByName, setFilterByName] = useState<string>("")
  const [selectedUnderlyingAsset, setSelectedUnderlyingAsset] =
    useState<SelectOptionItem | null>(null)
  const [selectedVaultStatus, setSelectedVaultStatus] =
    useState<SelectOptionItem | null>(null)
  const { data: markets } = useMyMarkets()
  const { tokensByChainId } = useTokensList()

  const handleFilterByName = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target
    setFilterByName(value.toLowerCase())
  }

  const filterUnderlyingOptions = useMemo(() => {
      if(!markets) return []
      const options = markets.map((market) => {
          return market.underlyingToken.symbol
      }).filter((value, index, self) => self.indexOf(value) === index)
      return options.map((option) => ({
          id: option,
          label: option,
          value: option,
      }))
  }, [markets])

  const filteredMarkets = markets
    ? markets
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
    : []

  const mockedUnderlyingAssetsOptions: SelectOptionItem[] = tokensByChainId.map(
    (token) => ({
      id: token.address,
      label: token.symbol,
      value: token.symbol,
    }),
  )

  return (
    <div>
      <div className="text-xs flex-col">
        <div className="text-xs font-normal underline">My Markets</div>
        <div className="text-green text-2xl font-bold justify-between items-center flex mt-8">
          All Markets For Borrower: peaches.eth
          <Button
            onClick={() => navigate("/borrower/add-new-vault")}
            variant="blue"
          >
            New Market
          </Button>
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
        {filteredMarkets.map((market) => (
          <div key={market.address} className="w-1/3 px-2.5 py-2.5">
            <VaultCard market={market} className="w-full" />
          </div>
        ))}
      </div>

      <ServiceAgreementCard
        className="mt-10"
        title="Wildcat Service Agreement"
        description="You agreed to the Wildcat Service Agreement on 12-Sept-2023"
      />
    </div>
  )
}

export default MyVaults
