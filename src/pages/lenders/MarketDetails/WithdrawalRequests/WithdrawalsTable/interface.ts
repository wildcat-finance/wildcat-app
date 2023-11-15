import { Token } from "@wildcatfi/wildcat-sdk"
import { SubgraphWithdrawalRequest } from "@wildcatfi/subgraph-hooks"

export type WithdrawalsTableProps = {
  withdrawals?: SubgraphWithdrawalRequest[]
  underlyingToken: Token
}
