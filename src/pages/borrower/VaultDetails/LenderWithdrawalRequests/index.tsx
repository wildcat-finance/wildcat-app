import React, { useState } from "react"
import { BigNumber } from "ethers"

import { Chip } from "../../../../components/ui-components"
import { WithdrawalsTable } from "./WithdrawalsTable"
import { useGetWithdrawals } from "./hooks/useGetWithdrawals"
import { ExpandMore } from "../../../../components/ui-components/icons"
import { LenderMarketDetailsProps } from "./type"
import { TOKEN_FORMAT_DECIMALS } from "../../../../utils/formatters"

const LenderWithdrawalRequests = ({ market }: LenderMarketDetailsProps) => {
  const { data } = useGetWithdrawals(market)

  const [thisCycle, setThisCycle] = useState(false)
  const [prevCycle, setPrevCycle] = useState(false)

  const toggleAccordion = (index: number) => {
    if (index === 1) {
      setThisCycle(!thisCycle)
    } else if (index === 2) {
      setPrevCycle(!prevCycle)
    }
  }

  const expiredTotalAmount = data.expiredWithdrawalsTotalOwed
  const activeTotalAmount = data.activeWithdrawalsTotalOwed
  const totalAmount = expiredTotalAmount.add(activeTotalAmount)

  return (
    <div className="mb-14">
      <div className="flex justify-between items-center mb-8">
        <div className="text-base font-bold">Lender Withdrawal Requests</div>
        <div className="flex gap-x-7 items-center">
          <Chip color="green" className="w-fit !h-6 text-white">
            Ongoing Cycle
          </Chip>
          <div className="flex gap-x-2">
            <div className="inline text-black text-xs font-bold">Start</div>
            <div className="text-black text-xs"> </div>
          </div>
          <div className="flex gap-x-2">
            <div className="inline text-black text-xs font-bold">End</div>
            <div className="text-black text-xs"> </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4 pr-6">
        <div className="inline text-black text-xs font-bold">
          Total Withdrawal Requests Outstanding
        </div>
        <Chip className="w-30 flex justify-center">
          {totalAmount.format(TOKEN_FORMAT_DECIMALS, true)}
        </Chip>
      </div>
      <div className="h-12 flex justify-between items-center bg-tint-10 px-6">
        <div className="inline text-black text-xs font-bold">
          Requests Made In This Cycle
        </div>
        <div className="flex gap-x-4 items-center">
          {thisCycle ? (
            <ExpandMore
              className="transform rotate-180"
              onClick={() => toggleAccordion(1)}
            />
          ) : (
            <ExpandMore onClick={() => toggleAccordion(1)} />
          )}
          <Chip className="w-30 flex justify-center">
            {activeTotalAmount.format(TOKEN_FORMAT_DECIMALS, true)}
          </Chip>
        </div>
      </div>

      {thisCycle && (
        <WithdrawalsTable
          withdrawalBatches={
            data?.activeWithdrawal ? [data.activeWithdrawal] : []
          }
        />
      )}

      <div className="h-12 flex justify-between items-center bg-tint-10 px-6 mt-6">
        <div className="inline text-black text-xs font-bold">
          Requests Made In Previous Cycles
        </div>
        <div className="flex gap-x-4 items-center">
          {prevCycle ? (
            <ExpandMore
              className="transform rotate-180"
              onClick={() => toggleAccordion(2)}
            />
          ) : (
            <ExpandMore onClick={() => toggleAccordion(2)} />
          )}
          <Chip className="w-30 flex justify-center">
            {expiredTotalAmount.format(TOKEN_FORMAT_DECIMALS, true)}
          </Chip>
        </div>
      </div>
      {prevCycle && (
        <WithdrawalsTable withdrawalBatches={data?.expiredPendingWithdrawals} />
      )}
    </div>
  )
}

export default LenderWithdrawalRequests
