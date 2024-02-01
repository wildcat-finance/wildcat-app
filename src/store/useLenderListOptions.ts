import { useEffect } from "react"
import { create } from "zustand"
import {
  MarketFilterOption,
  MarketAccountSortOption,
} from "../components/MarketsListCommon/MarketsListOptions/interface"
import { MarketAccountSortOptions } from "../components/MarketsListCommon/MarketsListOptions/constants"
import { useEthersProvider } from "../modules/hooks/useEthersSigner"

export type LenderListOptionsStore = {
  onlyOwnMarkets: boolean
  onlyOpenMarkets: boolean
  filterValue?: string
  selectedFilter: MarketFilterOption | null
  haveSetOnlyOwnMarkets: boolean
  sortAscending: boolean
  selectedSort: MarketAccountSortOption

  setOnlyOwnMarkets: (onlyOwnMarkets: boolean) => void
  setOnlyOpenMarkets: (onlyOpenMarkets: boolean) => void
  setFilterValue: (filterValue: string | undefined) => void
  setSelectedFilter: (selectedFilter: MarketFilterOption | null) => void
  toggleSortDirection: () => void
  setSelectedSort: (selectedSort: MarketAccountSortOption) => void
}

export const useLenderListOptionsStore = create<LenderListOptionsStore>()(
  (set, get) => ({
    onlyOwnMarkets: false,
    onlyOpenMarkets: true,
    selectedFilter: null,
    haveSetOnlyOwnMarkets: false,
    sortAscending: false,
    selectedSort: MarketAccountSortOptions[0],

    setOnlyOwnMarkets: (onlyOwnMarkets) =>
      set({ onlyOwnMarkets, haveSetOnlyOwnMarkets: true }),
    setOnlyOpenMarkets: (onlyOpenMarkets) => set({ onlyOpenMarkets }),
    setFilterValue: (filterValue) => set({ filterValue }),
    setSelectedFilter: (selectedFilter) =>
      set({ selectedFilter, filterValue: undefined }),
    toggleSortDirection: () => set({ sortAscending: !get().sortAscending }),
    setSelectedSort: (selectedSort) => set({ selectedSort }),
  }),
)
export function useLenderListOptions() {
  const store = useLenderListOptionsStore()
  const { address } = useEthersProvider()

  useEffect(() => {
    if (!address) {
      if (store.haveSetOnlyOwnMarkets) {
        // When we disconnect wallet, we reset the onlyOwnMarkets flag
        store.setOnlyOwnMarkets(false)
      }
      return
    }

    // First time we load the page, if the user is a registered borrower and
    // onlyOwnMarkets has not been set, we set it to true
    store.setOnlyOwnMarkets(true)
  }, [address])

  return {
    ...store,
  }
}
