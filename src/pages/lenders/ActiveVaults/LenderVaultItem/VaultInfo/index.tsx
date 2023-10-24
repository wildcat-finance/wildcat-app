import { AiOutlineExclamationCircle } from "react-icons/ai"
import { VaultInfoProps } from "./interface"

import { Button, TableItem } from "../../../../../components/ui-components"
import { BluePaper } from "../../../../../components/ui-components/BluePaper"

export function VaultInfo({
  vault,
  nextStep,
  previousStep,
  showButtons,
}: VaultInfoProps) {
  return (
    <div>
      <TableItem className="grid grid-cols-2 gap-x-36">
        <div className="w-full flex px-3 items-center flex-row leading-8 justify-between">
          <div className="inline text-black text-xs font-bold">
            Annual Interest Rate
          </div>
          <div className="inline text-black text-xs">
            {vault.annualInterestRate}%
          </div>
        </div>

        <div className="w-full flex px-3 items-center flex-row leading-8 justify-between">
          <div className="inline text-black text-xs font-bold">
            Grace Period
          </div>
          <div className="inline text-black text-xs">
            {vault.annualInterestRate} hours
          </div>
        </div>
      </TableItem>
      <TableItem className="grid grid-cols-2 gap-x-36">
        <div className="w-full flex px-3 items-center flex-row leading-8 justify-between">
          <div className="inline text-black text-xs font-bold">
            Maximum Capacity
          </div>
          <div className="inline text-black text-xs">
            {vault.maximumCapacity} {vault.tokenSymbol}
          </div>
        </div>

        <div className="w-full flex px-3 items-center flex-row leading-8 justify-between">
          <div className="inline text-black text-xs font-bold">
            Withdrawal Cycle
          </div>
          <div className="inline text-black text-xs">
            {vault.withdrawalCycle} hours
          </div>
        </div>
      </TableItem>
      <TableItem className="grid grid-cols-2 gap-x-36">
        <div className="w-full flex px-3 items-center flex-row leading-8 justify-between">
          <div className="inline text-black text-xs font-bold">Deposits</div>
          <div className="inline text-black text-xs">
            {vault.deposits} {vault.tokenSymbol}
          </div>
        </div>

        <div className="w-full flex px-3 items-center flex-row leading-8 justify-between">
          <div className="inline text-black text-xs font-bold">
            Reserved Assets
          </div>
          <div className="inline text-black text-xs">
            {vault.reservedAssets} {vault.tokenSymbol}
          </div>
        </div>
      </TableItem>
      <TableItem className="grid grid-cols-2 gap-x-36">
        <div className="w-full flex px-3 items-center flex-row leading-8 justify-between">
          <div className="inline text-black text-xs font-bold">
            Amount Borrowed
          </div>
          <div className="inline text-black text-xs">
            {vault.amountBorrowed} {vault.tokenSymbol}
          </div>
        </div>

        <div className="w-full flex px-3 items-center flex-row leading-8 justify-between">
          <div className="inline text-black text-xs font-bold">
            Pending Withdrawals
          </div>
          <div className="inline text-black text-xs">
            {vault.pendingWithdrawals} {vault.tokenSymbol}
          </div>
        </div>
      </TableItem>
      <TableItem className="grid grid-cols-2 gap-x-36">
        <div className="w-full flex px-3 items-center flex-row leading-8 justify-between">
          <div className="inline text-black text-xs font-bold">
            Current Reserves
          </div>
          <div className="inline text-black text-xs">
            {vault.currentReserves} {vault.tokenSymbol}
          </div>
        </div>

        <div className="w-full flex px-3 items-center flex-row leading-8 justify-between">
          <div className="inline text-black text-xs font-bold">
            Accured Protocol Fees
          </div>
          <div className="inline text-black text-xs">
            {vault.accruedProtocolFees} {vault.tokenSymbol}
          </div>
        </div>
      </TableItem>
      <TableItem className="grid grid-cols-2 gap-x-36">
        <div className="w-full flex px-3 items-center flex-row leading-8 justify-between">
          <div className="inline text-black text-xs font-bold">
            Current Reserve Ratio
          </div>
          <div className="inline text-black text-xs">
            {vault.currentReserveRatio}%
          </div>
        </div>

        <div className="w-full flex px-3 items-center flex-row leading-8 justify-between">
          <div className="inline text-black text-xs font-bold">
            Withdrawal Cycle Countdown
          </div>
          <div className="inline text-black text-xs">
            {vault.withdrawalCycleCountdown.hours} hrs{" "}
            {vault.withdrawalCycleCountdown.minutes} min
          </div>
        </div>
      </TableItem>
      <TableItem className="grid grid-cols-2 gap-x-36">
        <div className="w-full flex px-3 items-center flex-row leading-8 justify-between">
          <div className="inline text-black text-xs font-bold">
            Required Reserves
          </div>
          <div className="inline text-black text-xs">
            {vault.requiredReserves} {vault.tokenSymbol}
          </div>
        </div>

        <div className="w-full flex px-3 items-center flex-row leading-8 justify-between">
          <div className="inline text-black text-xs font-bold">
            Master Loan Agreement
          </div>
          <div className="inline text-black text-xs">
            {vault.masterLoanAgreement === "true" ? "Acceptable" : "N/A"}
          </div>
        </div>
      </TableItem>
      <TableItem className="grid grid-cols-2 gap-x-36">
        <div className="w-full flex px-3 items-center flex-row leading-8 justify-between">
          <div className="inline text-black text-xs font-bold">
            Minimum Reserve Ratio
          </div>
          <div className="inline text-black text-xs">
            {vault.minimumReserveRatio}%
          </div>
        </div>
      </TableItem>
      {showButtons && (
        <>
          <BluePaper className="mt-11 mb-8">
            <AiOutlineExclamationCircle height={24} />
            <div className="text-xxs text-center max-w-xs">
              Before you can interact with this vault please confirm whether you
              would like an MLA (a Master Loan Agreement) on this vault.
            </div>
          </BluePaper>
          <div className="flex gap-x-5 pb-10 mx-auto w-fit">
            <Button variant="green" className="w-40" onClick={nextStep}>
              Show me the MLA
            </Button>
            <Button variant="red" className="w-40" onClick={previousStep}>
              I don’t want the MLA
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
