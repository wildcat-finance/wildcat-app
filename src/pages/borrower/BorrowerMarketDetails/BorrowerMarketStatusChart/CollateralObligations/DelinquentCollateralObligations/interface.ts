import { Market } from "@wildcatfi/wildcat-sdk"
import { MarketBarChartItem } from "../../../../../../components/ui-components/Barchart/BarItem/interface"
import { BorrowerWithdrawalsForMarketResult } from "../../../BorrowerWithdrawalRequests/hooks/useGetWithdrawals"

export type DelinquentCollateralObligationsProps = {
  market: Market
  legendItem: MarketBarChartItem
  withdrawals: BorrowerWithdrawalsForMarketResult
}
