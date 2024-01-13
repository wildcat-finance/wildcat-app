import { useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { HiSortAscending, HiSortDescending } from "react-icons/hi"
import { Market } from "@wildcatfi/wildcat-sdk"
import { useAccount } from "wagmi"
import { AiOutlineExclamationCircle } from "react-icons/ai"
import { Select, Button, Spinner } from "../../../components/ui-components"
import { useMarketsForBorrower } from "../hooks/useMarketsForBorrower"

import { RoundButton } from "../../../components/ui-components/DatePicker/RoundButton"
import { BORROWER_PATHS } from "../routes/constants"
import { BASE_PATHS } from "../../../routes/constants"
import { useBorrowerInvitationRedirect } from "../hooks/useBorrowerRouting"
import { BluePaper } from "../../../components/ui-components/BluePaper"
import { useBorrowerListOptions } from "../../../store/useBorrowerListOptions"
import MarketCard from "../../../components/MarketsListCommon/MarketCard"
import { MarketTextFilterKind } from "../../../components/MarketsListCommon/MarketsListOptions/interface"
import {
  MarketFilterOptions,
  MarketSortOptions,
} from "../../../components/MarketsListCommon/MarketsListOptions/constants"

function BorrowerMarketsList() {
  const { address } = useAccount()
  const navigate = useNavigate()
  const {
    filterValue,
    setFilterValue,
    onlyOwnMarkets,
    setOnlyOwnMarkets,
    onlyOpenMarkets,
    setOnlyOpenMarkets,
    isRegisteredBorrower,
    selectedSort,
    setSelectedSort,
    selectedFilter,
    setSelectedFilter,
    sortAscending,
    toggleSortDirection,
  } = useBorrowerListOptions()
  const selectedBorrower = useMemo(
    () => (onlyOwnMarkets ? address : undefined),
    [onlyOwnMarkets, address],
  )
  const { data: markets, isLoading } = useMarketsForBorrower(selectedBorrower)
  const noMarkets = markets?.length === 0
  const {
    buttonText: inviteButtonText,
    hideNewMarketButton,
    message: inviteMessage,
    url: inviteUrl,
  } = useBorrowerInvitationRedirect()

  const selectedFilterPredicate = (market: Market) =>
    selectedFilter?.filterPredicate(market, filterValue) ?? true

  const filteredMarkets = markets
    ? markets
        .filter((market) => !market.isClosed || !onlyOpenMarkets)
        .filter(selectedFilterPredicate)
        .sort((a, b) =>
          selectedSort.sortPredicate(a, b, sortAscending ? "asc" : "desc"),
        )
    : []

  const FilterInput = selectedFilter?.inputComponent

  return (
    <div>
      <div className="text-xs flex-col">
        <div className="text-xs font-normal underline">
          {onlyOwnMarkets ? "My" : "All"} Markets
        </div>
        {inviteMessage && (
          <div className="flex flex-row gap-x-2 justify-center items-center mt-2 w-full">
            <BluePaper className="text-xl justify-between flex items-center w-2/3 ">
              <AiOutlineExclamationCircle /* height={24} */ />
              <span>{inviteMessage}</span>
              {inviteUrl && (
                <Button onClick={() => navigate(inviteUrl)} variant="blue">
                  <span className="text-lg">{inviteButtonText}</span>
                </Button>
              )}
            </BluePaper>
          </div>
        )}
        <div className="text-green text-2xl font-bold justify-between items-center flex mt-8">
          All Markets For Borrower
          {!hideNewMarketButton && (
            <div className="px-5">
              <Button
                onClick={() =>
                  navigate(
                    `${BASE_PATHS.Borrower}/${BORROWER_PATHS.AddNewMarket}`,
                  )
                }
                variant="blue"
                disabled={isLoading || !isRegisteredBorrower}
              >
                New Market
              </Button>
            </div>
          )}
        </div>
        <div className="flex flex-row gap-x-2 align-middle mt-3">
          <div className="flex flex-row align-middle justify-between gap-x-2">
            <input
              type="checkbox"
              id="showTerminated"
              checked={!onlyOpenMarkets}
              onChange={() => setOnlyOpenMarkets(!onlyOpenMarkets)}
              disabled={isLoading}
            />
            <label htmlFor="showTerminated">Show terminated Markets</label>
          </div>
          {isRegisteredBorrower && (
            <div className="flex flex-row align-middle justify-between gap-x-2">
              <input
                type="checkbox"
                id="showOwnMarkets"
                checked={onlyOwnMarkets}
                onChange={() => setOnlyOwnMarkets(!onlyOwnMarkets)}
                disabled={isLoading}
              />
              <label htmlFor="showOwnMarkets">Only my markets</label>
            </div>
          )}
        </div>

        <div className="flex w-full flex-wrap -mx-2.5 mt-3">
          <div className="w-1/5 px-2.5 py-2.5">
            <Select
              options={MarketFilterOptions.filter((f) => {
                if (
                  onlyOwnMarkets &&
                  f.value === MarketTextFilterKind.BorrowerAddress
                )
                  return false
                return true
              })}
              onChange={setSelectedFilter}
              selected={selectedFilter}
              placeholder="Filter By"
              className="w-full"
              disabled={isLoading}
              noneOption
            />
          </div>
          {FilterInput && (
            <div className="w-1/3 px-2.5 py-2.5">
              <FilterInput
                markets={markets}
                filterValue={filterValue}
                setFilterValue={setFilterValue}
                disabled={isLoading}
              />
            </div>
          )}
          <div className="w-2/5 px-2.5 py-2.5">
            <div className="w-full flex flex-row justify-between items-center">
              <div className="text-sm font-normal ">Sort By</div>
              <Select
                options={MarketSortOptions}
                onChange={setSelectedSort}
                selected={selectedSort}
                placeholder="Sort"
                className="w-4/5"
                noneOption={false}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="px-2.5 py-2.5">
            <div className="text-lg font-normal items-center flex flex-row">
              <RoundButton type="button">
                {sortAscending ? (
                  <HiSortAscending onClick={toggleSortDirection} />
                ) : (
                  <HiSortDescending onClick={toggleSortDirection} />
                )}
              </RoundButton>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-wrap -mx-2.5 mt-5">
        {isLoading && <Spinner isLoading />}
        {noMarkets && <div className="m-auto">No markets yet</div>}
        {filteredMarkets.map((market) => (
          <div key={market.address} className="w-1/3 px-2.5 py-2.5">
            <MarketCard
              market={market}
              className="w-full"
              showBorrower={!onlyOwnMarkets}
              basePath={BASE_PATHS.Borrower}
              variant="borrower"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default BorrowerMarketsList
