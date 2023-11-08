import React from "react"

import { VaultDeposit } from "../VaultDeposit"
import { VaultInfo } from "../VaultInfo"
import VaultInterationHistory from "../VaultInterationHistory"
import { Paper } from "../../../../../components/ui-components"

export function VaultOverview() {
  const vault = {
    name: "Blossom Dai Stablecoin Vault",
    tokenSymbol: "DAI",
    maximumCapacity: "1000",
    reserveRatio: "20",
    annualInterestRate: "5",
    deposits: "25000",
    amountBorrowed: "16000",
    currentReserves: "9000",
    currentReserveRatio: "144",
    requiredReserves: "6250",
    minimumReserveRatio: "25",
    gracePeriod: "24",
    withdrawalCycle: "48",
    reservedAssets: "10",
    pendingWithdrawals: "0",
    accruedProtocolFees: "3",
    withdrawalCycleCountdown: { hours: 28, minutes: 39 },
    masterLoanAgreement: "false",
  }
  return (
    <Paper className="border-tint-8">
      <div className="mb-9">
        <VaultInfo vault={vault} showButtons={false} />
      </div>
      <div className="mb-10 pr-5 pl-5">
        <VaultInterationHistory />
      </div>
      <VaultDeposit />
    </Paper>
  )
}
