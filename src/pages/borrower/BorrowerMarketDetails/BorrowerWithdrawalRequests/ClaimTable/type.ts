import { Market, WithdrawalBatch } from "@wildcatfi/wildcat-sdk"

export type ClaimTableProps = {
  batches?: WithdrawalBatch[]
  market: Market
}
