import React, { useState } from "react"

import { Chip } from "../../../../components/ui-components"
import { ThisCycleTable } from "./LenderWithdrawalsTable/ThisCycleTable"
import { PrevCycleTable } from "./LenderWithdrawalsTable/PrevCycleTable"
import { useGetWithdrawals } from "./hooks/useGetWithdrawals"
import { ExpandMore } from "../../../../components/ui-components/icons"
import {
  formatTokenWithCommas,
  timestampToDateFormatted,
} from "../../../../utils/formatters"
import type { LenderWithdrawalRequestsProps } from "./interface"
import { ClaimTable } from "./ClaimTable"

const LenderWithdrawalRequests = ({
  market,
}: LenderWithdrawalRequestsProps) => {
  const { data } = useGetWithdrawals(market)

  const [thisCycle, setThisCycle] = useState(false)
  const [prevCycle, setPrevCycle] = useState(false)
  const [openClaimTable, setOpenClaimTable] = useState(false)

  const toggleAccordion = (index: number) => {
    if (index === 1) {
      setThisCycle(!thisCycle)
    } else if (index === 2) {
      setPrevCycle(!prevCycle)
    } else if (index === 3) {
      setOpenClaimTable(!openClaimTable)
    }
  }

  const { underlyingToken } = market

  const expiredTotalAmount = data.expiredTotalPendingAmount
  const activeTotalAmount = data.activeTotalPendingAmount
  const totalAmount = expiredTotalAmount.add(activeTotalAmount)

  const cycleStart = data.activeWithdrawal?.requests[0]?.blockTimestamp
  const cycleEnd =
    cycleStart !== undefined ? cycleStart + market.withdrawalBatchDuration : 0

  return (
    <div className="mb-14">
      <div className="flex justify-between items-center mb-8">
        <div className="text-base font-bold">Lender Withdrawal Requests</div>
        <div className="flex gap-x-7 items-center">
          <Chip
            color={cycleStart ? "green" : "red"}
            className="w-fit !h-6 text-white"
          >
            {cycleStart ? "Ongoing Cycle" : "No Cycle"}
          </Chip>
          {cycleStart && (
            <div className="flex gap-x-2">
              <div className="inline text-black text-xs font-bold">Start</div>
              <div className="text-black text-xs">
                {timestampToDateFormatted(cycleStart)}
              </div>
            </div>
          )}
          {cycleStart && (
            <div className="flex gap-x-2">
              <div className="inline text-black text-xs font-bold">End</div>
              <div className="text-black text-xs">
                {timestampToDateFormatted(cycleEnd)}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center mb-4 pr-6">
        <div className="inline text-black text-xs font-bold">
          Open Withdrawal Requests
        </div>
        <Chip className="w-30 flex justify-center">
          {formatTokenWithCommas(totalAmount, {
            withSymbol: true,
          })}
        </Chip>
      </div>
      <div className="h-12 flex justify-between items-center bg-tint-10 px-6">
        <div className="inline text-black text-xs font-bold">
          Requested This Cycle
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
            {formatTokenWithCommas(activeTotalAmount, {
              withSymbol: true,
            })}
          </Chip>
        </div>
      </div>

      {thisCycle && (
        <ThisCycleTable
          withdrawals={data?.activeWithdrawal ? [data.activeWithdrawal] : []}
          underlyingToken={underlyingToken}
        />
      )}

      <div className="h-12 flex justify-between items-center bg-tint-10 px-6 mt-6">
        <div className="inline text-black text-xs font-bold">
          Outstanding From Previous Cycles
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
            {formatTokenWithCommas(expiredTotalAmount, {
              withSymbol: true,
            })}
          </Chip>
        </div>
      </div>
      {prevCycle && (
        <PrevCycleTable
          withdrawals={data?.expiredPendingWithdrawals}
          underlyingToken={underlyingToken}
        />
      )}

      <div className="flex justify-between items-center mt-14 mb-4 pr-6">
        <div className="inline text-black text-xs font-bold">
          Claimable Withdrawal Requests
        </div>
        <Chip className="w-30 flex justify-center">
          {formatTokenWithCommas(data.totalClaimableAmount, {
            withSymbol: true,
          })}
        </Chip>
      </div>

      <ClaimTable expiredPendingWithdrawals={data.expiredPendingWithdrawals} />
    </div>
  )
}

export default LenderWithdrawalRequests
