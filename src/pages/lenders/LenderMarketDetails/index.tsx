import { useNavigate, useParams } from "react-router-dom"

import { LenderRole } from "@wildcatfi/wildcat-sdk"
import { Button, Chip, Spinner } from "../../../components/ui-components"
import { useWalletConnect } from "../../../hooks/useWalletConnect"
import { useCurrentNetwork } from "../../../hooks/useCurrentNetwork"
import { LenderMarketActions } from "./LenderMarketActions"
import { useGetMarket } from "../../../hooks/useGetMarket"
import WithdrawalRequests from "./LenderWithdrawalRequests"
import PaymentHistory from "../../../components/MarketDetailsCommon/PaymentHistory"
import { BackArrow } from "../../../components/ui-components/icons"
import LenderMarketOverview from "./LenderMarketOverview"
import { useAddToken } from "../../../hooks/useAddToken"
import { useLenderMarketAccount } from "../hooks/useLenderMarketAccount"
import { useTransactionWait } from "../../../store/useTransactionWait"
import { getEffectiveLenderRole } from "../../../utils/lenderRole"
import { LenderStatus } from "../../../types/vaults"
import { useLenderListOptions } from "../../../store/useLenderListOptions"
import { LenderMarketStatusChart } from "./LenderMarketStatusChart"
import { LenderTotalDebtsChart } from "./LenderTotalDebtsChart"

export function LenderMarketDetails() {
  const navigate = useNavigate()
  const { isConnected } = useWalletConnect()
  const { isWrongNetwork } = useCurrentNetwork()
  const { isTxInProgress } = useTransactionWait()
  const { onlyOwnMarkets } = useLenderListOptions()

  const { marketAddress } = useParams()
  const { data: market, isLoading: isMarketLoading } = useGetMarket({
    marketAddress,
  })

  const { data: marketAccount, isLoadingInitial: isMarketAccountLoading } =
    useLenderMarketAccount(market)

  const { canAddToken, handleAddToken, isAddingToken } = useAddToken(
    market?.marketToken,
  )

  const isLoading = isMarketLoading || isMarketAccountLoading

  const handleClickMyMarkets = () => {
    navigate("/lender")
  }

  if (isConnected && isWrongNetwork) {
    return <div />
  }

  if (isLoading) {
    return <Spinner isLoading={isLoading} />
  }

  if (!market || !marketAccount) {
    return <div>Market not found</div>
  }

  const isLender =
    isConnected &&
    [LenderStatus.DepositAndWithdraw, LenderStatus.WithdrawOnly].includes(
      getEffectiveLenderRole(marketAccount),
    )

  return (
    <div className="flex flex-col">
      <button
        className="flex items-center gap-x-2 px-0 mb-8 disabled:opacity-50"
        onClick={handleClickMyMarkets}
        disabled={isTxInProgress}
      >
        <BackArrow />
        <p className="text-xs font-normal underline">
          {onlyOwnMarkets ? "My" : "All"} Markets
        </p>
      </button>
      <div className="flex justify-between items-center">
        <div className="w-full flex items-center justify-between mb-8">
          <div className="text-green text-2xl font-bold">{market.name}</div>
          <div className="flex ">
            <Chip className="h-auto justify-center p-1 ml-4 mr-3 bg-tint-11">
              {market.marketToken.symbol}
            </Chip>
            {canAddToken && (
              <Button
                variant="blue"
                disabled={isAddingToken}
                onClick={handleAddToken}
              >
                Add Token
              </Button>
            )}
          </div>
        </div>
      </div>

      {isLender && (
        <LenderMarketActions market={market} marketAccount={marketAccount} />
      )}

      <LenderMarketStatusChart marketAccount={marketAccount} />

      <LenderTotalDebtsChart marketAccount={marketAccount} />

      <LenderMarketOverview marketAccount={marketAccount} />

      {isLender && <WithdrawalRequests market={market} />}
      <PaymentHistory market={market} />
    </div>
  )
}
