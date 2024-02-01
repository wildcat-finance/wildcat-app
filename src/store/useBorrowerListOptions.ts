import { useEffect } from "react"
import { create } from "zustand"
import { useGetController } from "../hooks/useGetController"
import {
  MarketFilterOption,
  MarketSortOption,
} from "../components/MarketsListCommon/MarketsListOptions/interface"
import { MarketSortOptions } from "../components/MarketsListCommon/MarketsListOptions/constants"
import { useEthersProvider } from "../modules/hooks/useEthersSigner"

export type BorrowerListOptionsStore = {
  onlyOwnMarkets: boolean
  onlyOpenMarkets: boolean
  filterValue?: string
  selectedFilter: MarketFilterOption | null
  haveSetOnlyOwnMarkets: boolean
  sortAscending: boolean
  selectedSort: MarketSortOption

  setOnlyOwnMarkets: (onlyOwnMarkets: boolean) => void
  setOnlyOpenMarkets: (onlyOpenMarkets: boolean) => void
  setFilterValue: (filterValue: string | undefined) => void
  setSelectedFilter: (selectedFilter: MarketFilterOption | null) => void
  toggleSortDirection: () => void
  setSelectedSort: (selectedSort: MarketSortOption) => void
}

export const useBorrowerListOptionsStore = create<BorrowerListOptionsStore>()(
  (set, get) => ({
    onlyOwnMarkets: false,
    onlyOpenMarkets: true,
    selectedFilter: null,
    haveSetOnlyOwnMarkets: false,
    sortAscending: false,
    selectedSort: MarketSortOptions[0],

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

export type MarketFilterHooks = BorrowerListOptionsStore & {
  isRegisteredBorrower?: boolean
}

export function useBorrowerListOptions(): MarketFilterHooks {
  const store = useBorrowerListOptionsStore()
  const { address } = useEthersProvider()
  const { data, isLoading } = useGetController()

  const isRegisteredBorrower = data?.isRegisteredBorrower

  // First time we load the page, if the user is a registered borrower and
  // onlyOwnMarkets has not been set, we set it to true
  useEffect(() => {
    if (!address && store.haveSetOnlyOwnMarkets) {
      // When we disconnect wallet, we reset the onlyOwnMarkets flag
      store.setOnlyOwnMarkets(false)
      return
    }

    if (isLoading || !isRegisteredBorrower || store.haveSetOnlyOwnMarkets) {
      return
    }

    store.setOnlyOwnMarkets(true)
  }, [isLoading, isRegisteredBorrower])

  return {
    ...store,
    isRegisteredBorrower,
  }
}
