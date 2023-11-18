import { Button } from "../../../../components/ui-components"
import DepositForm from "../DepositForm"
import { useGetMarketAccount } from "../../../../hooks/useGetMarket"
import WithdrawalForm from "../WithdrawalForm"
import { TOKEN_FORMAT_DECIMALS } from "../../../../utils/formatters"
import { useClaim } from "../../../borrower/VaultDetails/hooks/useVaultDetailActions"
import { useGetWithdrawals } from "../WithdrawalRequests/hooks/useGetWithdrawals"

import type { LenderMarketActionsProps } from "./interface"

export function LenderMarketActions({ market }: LenderMarketActionsProps) {
  const { data: marketAccount } = useGetMarketAccount(market)
  const { data: withdrawals } = useGetWithdrawals(market)

  const { mutate: claim } = useClaim(
    market,
    withdrawals.expiredPendingWithdrawals,
  )

  const disabled = withdrawals.totalClaimableAmount.raw.isZero()

  return (
    <div className="rounded-2xl bg-tint-10 mb-14">
      <div className="px-5 pt-8 pb-12">
        <div className="w-full flex justify-between items-center">
          <div className="font-bold text-sm">New Deposit</div>
          <DepositForm marketAccount={marketAccount!} />
        </div>
      </div>
      <div className="px-5 pt-8 pb-12">
        <div className="w-full flex justify-between items-center">
          <div className="font-bold text-sm">Request Withdrawal</div>
          <WithdrawalForm marketAccount={marketAccount!} />
        </div>
      </div>
      <div className="px-5 pt-8 pb-12">
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