import type {
  DepositStatus,
  RepayStatus,
  CloseMarketStatus,
  SetAprStatus,
} from "@wildcatfi/wildcat-sdk"

type ExcludeReady<T> = T extends "Ready" ? never : T

type DepositErrorStatuses = {
  [key in ExcludeReady<DepositStatus["status"]>]: string
}
type RepayErrorStatuses = {
  [key in ExcludeReady<RepayStatus["status"]>]: string
}
type CloseMarketErrorStatuses = {
  [key in ExcludeReady<CloseMarketStatus["status"]>]: string
}
type SetAPRErrorStatuses = {
  [key in ExcludeReady<SetAprStatus["status"]>]: string
}

type SDKErrorsMapping = {
  deposit: DepositErrorStatuses
  repay: RepayErrorStatuses
  closeMarket: CloseMarketErrorStatuses
  setApr: SetAPRErrorStatuses
}

export const SDK_ERRORS_MAPPING: SDKErrorsMapping = {
  deposit: {
    InsufficientRole:
      "Lender restricted to withdrawing existing debt, no further deposits",
    ExceedsMaximumDeposit:
      "You're attempting to deposit more than the maximum capacity",
    InsufficientBalance:
      "You don't have enough of the underlying token in your wallet",
    InsufficientAllowance:
      "You haven't granted a sufficient allowance for this deposit",
  },

  repay: {
    InsufficientBalance:
      "You don't have enough of the underlying token in your wallet",
    InsufficientAllowance:
      "You haven't granted a sufficient allowance for this repayment",
    ExceedsOutstandingDebt: "You're attempting to repay more than you owe",
  },

  closeMarket: {
    NotBorrower: "Address attempting to close market is not the borrower",
    UnpaidWithdrawalBatches: "There are unpaid withdrawal batches",
    InsufficientBalance:
      "Your wallet's balance of the underlying token is insufficient",
    InsufficientAllowance: "You haven't granted a sufficient allowance",
  },

  setApr: {
    NotBorrower: "Address attempting to adjust APR is not the borrower",
    InvalidApr:
      "The lender APR that you're proposing is out of bounds [min, max]",
    InsufficientReserves:
      "Liquid reserves of the market insufficient for increased reserve ratio",
  },
}
