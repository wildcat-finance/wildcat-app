import { Button, Spinner } from "../../../../components/ui-components"
import DepositForm from "../DepositForm"
import WithdrawalForm from "../WithdrawalForm"
import { TOKEN_FORMAT_DECIMALS } from "../../../../utils/formatters"
import { useClaim } from "../../../borrower/BorrowerMarketDetails/hooks/useVaultDetailActions"
import { useGetWithdrawals } from "../LenderWithdrawalRequests/hooks/useGetWithdrawals"

import type { LenderMarketActionsProps } from "./interface"
import { useLenderMarketAccount } from "../../hooks/useLenderMarketAccount"

export function LenderMarketActions({ market }: LenderMarketActionsProps) {
  const { data: marketAccount } = useLenderMarketAccount(market)
  const { data: withdrawals } = useGetWithdrawals(market)

  const { mutate: claim } = useClaim(
    market,
    withdrawals.expiredPendingWithdrawals,
  )

  const disabled = withdrawals.totalClaimableAmount.raw.isZero()

  if (!marketAccount) {
    return <Spinner isLoading />
  }

  return (
    <div className="rounded-2xl bg-tint-10 mb-14 p-8">
      <div>
        <div className="w-full flex justify-between">
          <div className="font-bold text-sm h-8 leading-8">New Deposit</div>
          <DepositForm marketAccount={marketAccount!} />
        </div>
      </div>
      <div className="py-8">
        <div className="w-full flex justify-between">
          <div className="font-bold text-sm h-8 leading-8">
            Request Withdrawal
          </div>
          <WithdrawalForm marketAccount={marketAccount!} />
        </div>
      </div>
      <div>
        <div className="w-full flex justify-between items-center">
          <div className="font-bold text-sm">Claim Available Withdrawals</div>
          <div className="flex gap-x-3.5 w-full max-w-lg items-center">
            <div className="flex flex-col w-full">
              <div className="text-xxs text-right">
                <span className="font-semibold">Claimable: </span>
                {withdrawals.totalClaimableAmount.format(
                  TOKEN_FORMAT_DECIMALS,
                )}{" "}
                {market.underlyingToken.symbol}
              </div>
            </div>
            <Button
              disabled={disabled}
              variant="green"
              className="w-64"
              onClick={claim}
            >
              Claim
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
