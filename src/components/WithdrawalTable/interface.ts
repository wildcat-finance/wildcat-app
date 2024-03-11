import {
  LenderWithdrawalStatus,
  Token,
  WithdrawalBatch,
} from "@wildcatfi/wildcat-sdk"

export type WithdrawalsTableProps = {
  underlyingToken: Token
  withdrawals?: LenderWithdrawalStatus[]
  withdrawalBatches?: WithdrawalBatch[]
}
