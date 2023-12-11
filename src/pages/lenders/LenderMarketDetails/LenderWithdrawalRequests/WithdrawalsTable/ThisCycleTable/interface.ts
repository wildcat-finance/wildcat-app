import { LenderWithdrawalStatus, Token } from "@wildcatfi/wildcat-sdk"

export type WithdrawalsTableProps = {
  withdrawals?: LenderWithdrawalStatus[]
  underlyingToken: Token
}
