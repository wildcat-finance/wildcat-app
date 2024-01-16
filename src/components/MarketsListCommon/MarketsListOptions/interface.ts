import { Market, MarketAccount } from "@wildcatfi/wildcat-sdk"

export enum MarketTextFilterKind {
  BorrowerAddress = "BorrowerAddress",
  MarketName = "MarketName",
  UnderlyingAsset = "UnderlyingAsset",
}

export enum SortKind {
  DateCreated = "DateCreated",
  OutstandingDebt = "OutstandingDebt",
  TotalSupply = "TotalSupply",
  Status = "Status",
  BorrowableAmount = "BorrowableAmount",
  MarketBalance = "MarketBalance",
  UnderlyingBalance = "UnderlyingBalance",
  LenderRole = "LenderRole",
  MaximumCapacity = "MaximumCapacity",
}

export type MarketFilterInputProps = {
  markets?: Market[]
  disabled?: boolean
  filterValue?: string
  setFilterValue: (filterValue: string | undefined) => void
}

export type MarketFilterOption = {
  id: string
  label: string
  value: MarketTextFilterKind
  inputComponent: React.FC<MarketFilterInputProps>
  filterPredicate: (market: Market, text?: string) => boolean
}

export type MarketSortOption = {
  id: string
  label: string
  value: SortKind
  sortPredicate: (a: Market, b: Market, direction: "asc" | "desc") => number
}

export type MarketAccountSortOption = {
  id: string
  label: string
  value: SortKind
  sortPredicate: (
    a: MarketAccount,
    b: MarketAccount,
    direction: "asc" | "desc",
  ) => number
}
