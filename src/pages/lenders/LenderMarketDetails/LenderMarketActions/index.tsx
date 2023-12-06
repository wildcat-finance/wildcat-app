import { Spinner } from "../../../../components/ui-components"
import DepositForm from "../DepositForm"
import WithdrawalForm from "../WithdrawalForm"
import { ClaimForm } from "../ClaimForm"

import type { LenderMarketActionsProps } from "./interface"

export function LenderMarketActions({
  market,
  marketAccount,
}: LenderMarketActionsProps) {
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
      <ClaimForm market={market} />
    </div>
  )
}
