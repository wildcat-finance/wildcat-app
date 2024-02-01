import { Market } from "@wildcatfi/wildcat-sdk"
import { BorrowerWithdrawalsForMarketResult } from "../../../BorrowerWithdrawalRequests/hooks/useGetWithdrawals"

export type CollateralObligationsDataProps = {
  market: Market
  withdrawals: BorrowerWithdrawalsForMarketResult
  doubleDivider?: boolean
}
