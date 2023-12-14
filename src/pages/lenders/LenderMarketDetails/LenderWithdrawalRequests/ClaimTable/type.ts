import { Market, LenderWithdrawalStatus } from "@wildcatfi/wildcat-sdk"

export type ClaimTableProps = {
  expiredPendingWithdrawals: LenderWithdrawalStatus[]
}
