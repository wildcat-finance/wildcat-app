import { useState, useMemo } from "react"
import { LenderRole, Market, MarketAccount } from "@wildcatfi/wildcat-sdk"
import { isAddress } from "ethers/lib/utils"
import { Select, TextInput } from "../../ui-components"
import { SelectOptionItem } from "../../ui-components/Select/interface"
import { getMarketStatus } from "../../../utils/marketStatus"

import { LenderStatus, VaultStatus } from "../../../types/vaults"
import {
  MarketAccountSortOption,
  MarketFilterInputProps,
  MarketFilterOption,
  MarketSortOption,
  MarketTextFilterKind,
  SortKind,
} from "./interface"
import { getEffectiveLenderRole } from "../../../utils/lenderRole"

function MarketFilterByUnderlyingInput({
  markets,
  setFilterValue,
  disabled,
}: MarketFilterInputProps) {
  const [selectedUnderlyingAsset, _setSelectedUnderlyingAsset] =
    useState<SelectOptionItem | null>(null)
  const underlyingOptions = useMemo(() => {
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

  const setSelectedUnderlying = (option: SelectOptionItem | null) => {
    _setSelectedUnderlyingAsset(option)
    setFilterValue(option?.value || undefined)
  }

  return (
    <Select
      options={underlyingOptions}
      onChange={(option) => setSelectedUnderlying(option)}
      selected={selectedUnderlyingAsset}
      placeholder="Select Underlying Asset"
      className="w-full"
      disabled={disabled}
      noneOption
    />
  )
}

const MarketFilterByUnderlying: MarketFilterOption = {
  id: "underlying",
  label: "Underlying Asset",
  value: MarketTextFilterKind.UnderlyingAsset,
  inputComponent: MarketFilterByUnderlyingInput,
  filterPredicate: (market, text) => {
    if (!text) return true
    return market.underlyingToken.symbol
      .toLowerCase()
      .includes(text.toLowerCase())
  },
}

function MarketTextFilterInput({
  setFilterValue,
  placeholder,
  validate,
  disabled,
}: MarketFilterInputProps & {
  placeholder: string
  validate?: (value: string) => string | undefined
}) {
  const [errorText, setErrorText] = useState<string | undefined>(undefined)
  const [filterText, setFilterText] = useState("")
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault()
    const { value } = evt.target
    setFilterText(value)
    const error = validate && validate(value)
    setErrorText(error)
    if (!error) {
      setFilterValue(value)
    }
  }
  return (
    <div className="flex flex-col relative w-full">
      <div className="flex">
        <TextInput
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full"
          value={filterText}
          error={!!errorText}
          disabled={disabled}
        />
      </div>
      {errorText && (
        <div className="whitespace-nowrap text-red-error text-xxs mt-1 absolute bottom-0 left-0">
          {errorText}
        </div>
      )}
    </div>
  )
}

const MarketFilterByName: MarketFilterOption = {
  id: "name",
  label: "Market Name",
  value: MarketTextFilterKind.MarketName,
  inputComponent: (props: MarketFilterInputProps) => (
    <MarketTextFilterInput {...props} placeholder="Market name" />
  ),
  filterPredicate: (market, text) => {
    if (!text) return true
    return market.name.toLowerCase().includes(text.toLowerCase())
  },
}

const MarketFilterByBorrowerAddress: MarketFilterOption = {
  id: "borrower",
  label: "Borrower Address",
  value: MarketTextFilterKind.BorrowerAddress,
  inputComponent: (props: MarketFilterInputProps) => (
    <MarketTextFilterInput
      {...props}
      placeholder="0xb07708..."
      validate={(addr: string) => {
        if (!addr || isAddress(addr)) return undefined
        return "Invalid address"
      }}
    />
  ),
  filterPredicate: (market, text) => {
    if (!text) return true
    return market.name.toLowerCase().includes(text.toLowerCase())
  },
}

const MarketStatusScores = {
  [VaultStatus.HEALTHY]: 5,
  [VaultStatus.PENDING]: 4,
  [VaultStatus.DELINQUENT]: 3,
  [VaultStatus.PENALTY]: 2,
  [VaultStatus.TERMINATED]: 1,
  [VaultStatus.REMOVED]: 0,
}

export const MarketSortOptions: MarketSortOption[] = [
  {
    id: "date-created",
    label: "Creation Time",
    value: SortKind.DateCreated,
    sortPredicate: (a: Market, b: Market, direction: "asc" | "desc") =>
      ((a.deployedEvent?.blockNumber ?? 0) -
        (b.deployedEvent?.blockNumber ?? 0)) *
      (direction === "asc" ? 1 : -1),
  },
  // {
  //   id: "outstanding-debt",
  //   label: "Outstanding Debt",
  //   value: SortKind.OutstandingDebt,
  //   sortPredicate: (a: Market, b: Market, direction: "asc" | "desc") =>
  //     (a.outstandingDebt.gt(b.outstandingDebt) ? 1 : -1) *
  //     (direction === "asc" ? 1 : -1),
  // },
  // {
  //   id: "total-supply",
  //   label: "Total Supply",
  //   value: SortKind.TotalSupply,
  //   sortPredicate: (a: Market, b: Market, direction: "asc" | "desc") =>
  //     (a.totalSupply.gt(b.totalSupply) ? 1 : -1) *
  //     (direction === "asc" ? 1 : -1),
  // },
  {
    id: "market-status",
    label: "Market Status",
    value: SortKind.Status,
    sortPredicate: (a: Market, b: Market, direction: "asc" | "desc") =>
      (MarketStatusScores[
        getMarketStatus(a.isClosed, a.isDelinquent, a.isIncurringPenalties)
      ] -
        MarketStatusScores[
          getMarketStatus(b.isClosed, b.isDelinquent, b.isIncurringPenalties)
        ]) *
      (direction === "asc" ? 1 : -1),
  },
  {
    id: "borrowable",
    label: "Borrowable Amount",
    value: SortKind.BorrowableAmount,
    sortPredicate: (a: Market, b: Market, direction: "asc" | "desc") =>
      (a.borrowableAssets.gt(b.borrowableAssets) ? 1 : -1) *
      (direction === "asc" ? 1 : -1),
  },
  {
    id: "max-capacity",
    label: "Maximum Capacity",
    value: SortKind.MaximumCapacity,
    sortPredicate: (a: Market, b: Market, direction: "asc" | "desc") =>
      (a.maxTotalSupply.gt(b.maxTotalSupply) ? 1 : -1) *
      (direction === "asc" ? 1 : -1),
  },
]

export const MarketFilterOptions: MarketFilterOption[] = [
  MarketFilterByUnderlying,
  MarketFilterByName,
  MarketFilterByBorrowerAddress,
]

const LenderStatusScores = {
  [LenderStatus.DepositAndWithdraw]: 3,
  [LenderStatus.WithdrawOnly]: 2,
  [LenderStatus.Null]: 1,
  [LenderStatus.Blocked]: 0,
}

export const MarketAccountSortOptions: MarketAccountSortOption[] = [
  ...MarketSortOptions.filter(
    (m) =>
      ![SortKind.BorrowableAmount, SortKind.MaximumCapacity].includes(m.value),
  ).map((option) => ({
    ...option,
    sortPredicate: (
      a: MarketAccount,
      b: MarketAccount,
      direction: "asc" | "desc",
    ) => option.sortPredicate(a.market, b.market, direction),
  })),
  {
    id: "lender-role",
    label: "Access",
    value: SortKind.LenderRole,
    sortPredicate: (
      a: MarketAccount,
      b: MarketAccount,
      direction: "asc" | "desc",
    ) =>
      (LenderStatusScores[getEffectiveLenderRole(a)] -
        LenderStatusScores[getEffectiveLenderRole(b)]) *
      (direction === "asc" ? 1 : -1),
  },
  {
    id: "market-balance",
    label: "Loaned Amount",
    value: SortKind.MarketBalance,
    sortPredicate: (
      a: MarketAccount,
      b: MarketAccount,
      direction: "asc" | "desc",
    ) =>
      (a.marketBalance.gt(b.marketBalance) ? 1 : -1) *
      (direction === "asc" ? 1 : -1),
  },
  // {
  //   id: "underlying-balance",
  //   label: "Underlying Balance",
  //   value: SortKind.UnderlyingBalance,
  //   sortPredicate: (
  //     a: MarketAccount,
  //     b: MarketAccount,
  //     direction: "asc" | "desc",
  //   ) =>
  //     (a.underlyingBalance.gt(b.underlyingBalance) ? 1 : -1) *
  //     (direction === "asc" ? 1 : -1),
  // },
]
