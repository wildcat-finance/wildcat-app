import { useMemo } from "react"
import { useAccount } from "wagmi"
import { LenderRole, Market } from "@wildcatfi/wildcat-sdk"
import { HiSortAscending, HiSortDescending } from "react-icons/hi"
import { Select, Spinner } from "../../../components/ui-components"
import { useLendersMarkets } from "./hooks/useLendersMarkets"
import MarketCard from "../../../components/MarketsListCommon/MarketCard"
import { BASE_PATHS } from "../../../routes/constants"
import { SortKind } from "../../../components/MarketsListCommon/MarketsListOptions/interface"
import {
  MarketFilterOptions,
  MarketAccountSortOptions,
} from "../../../components/MarketsListCommon/MarketsListOptions/constants"
import { useLenderListOptions } from "../../../store/useLenderListOptions"
import { RoundButton } from "../../../components/ui-components/DatePicker/RoundButton"
import { EXCLUDED_MARKETS } from "../../../config/excluded-markets"

function LenderMarketsList() {
  const { address } = useAccount()
  const {
    filterValue,
    setFilterValue,
    onlyOwnMarkets,
    setOnlyOwnMarkets,
    onlyOpenMarkets,
    setOnlyOpenMarkets,
    selectedSort,
    setSelectedSort,
    selectedFilter,
    setSelectedFilter,
    sortAscending,
    toggleSortDirection,
  } = useLenderListOptions()

  const {
    data: lenderMarketAccounts,
    isLoadingInitial,
    isLoadingUpdate,
  } = useLendersMarkets()
  const noAvailableMarkets = lenderMarketAccounts.length === 0
  const isLoading = isLoadingInitial || isLoadingUpdate
  const markets = useMemo(
    () => lenderMarketAccounts.map(({ market }) => market),
    [lenderMarketAccounts],
  )

  const selectedFilterPredicate = (market: Market) =>
    selectedFilter?.filterPredicate(market, filterValue) ?? true

  const filteredMarketAccounts = lenderMarketAccounts
    ? lenderMarketAccounts
        .filter(({ market }) => !market.isClosed || !onlyOpenMarkets)
        .filter(
          (account) =>
            !onlyOwnMarkets ||
            account.isAuthorizedOnController ||
            account.role !== LenderRole.Null,
        )
        .filter(
          (account) =>
            !EXCLUDED_MARKETS.includes(account.market.address.toLowerCase()) ||
            account.isAuthorizedOnController ||
            account.role !== LenderRole.Null,
        )
        .filter(({ market }) => selectedFilterPredicate(market))
        .sort((a, b) =>
          selectedSort.sortPredicate(a, b, sortAscending ? "asc" : "desc"),
        )
    : []

  const FilterInput = selectedFilter?.inputComponent

  return (
    <>
      <div className="text-xs flex-col">
        <div className="text-xs font-normal underline">
          {onlyOwnMarkets ? "My" : "All"} Markets
        </div>
        <div className="text-green text-2xl font-bold mt-8">
          All Markets For Lender
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
          {address && (
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
              options={MarketFilterOptions}
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
                options={MarketAccountSortOptions.filter((f) => {
                  if (
                    !address &&
                    [
                      SortKind.UnderlyingBalance,
                      SortKind.MarketBalance,
                      SortKind.LenderRole,
                    ].includes(f.value)
                  )
                    return false
                  return true
                })}
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
        {noAvailableMarkets && <div className="m-auto">No markets yet</div>}
        {filteredMarketAccounts.map((account) => (
          <div key={account.market.address} className="w-1/3 px-2.5 py-2.5">
            <MarketCard
              account={account}
              className="w-full"
              basePath={BASE_PATHS.Lender}
              showBalance={!!address}
              showLenderRole={!!address}
              variant="lender"
            />
          </div>
        ))}
      </div>
    </>
  )
}

export default LenderMarketsList
