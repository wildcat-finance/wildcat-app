import React, { useState } from "react"

import { VaultInfo } from "./VaultInfo"

import {
  Button,
  Chip,
  Paper,
  Spinner,
} from "../../../../components/ui-components"
import { useWalletConnect } from "../../../borrower/hooks/useWalletConnect"
import { useBorrowerRouting } from "../../../borrower/hooks/useBorrowerRouting"
import { useCurrentNetwork } from "../../../../hooks/useCurrentNetwork"
import VaultInterationHistory from "./VaultInterationHistory"
import { VaultDeposit } from "./VaultDeposit"
import { ServiceAgreementCard } from "../../../../components/ServiceAgreementCard"

export function MarketDetails() {
  const { isConnected } = useWalletConnect()
  const { isLoading } = useBorrowerRouting()
  const { isWrongNetwork } = useCurrentNetwork()

  if (!isConnected || isWrongNetwork) {
    return <div />
  }

  if (isLoading) {
    return <Spinner isLoading={isLoading} />
  }

  const vault = {
    name: "Blossom Dai Stablecoin",
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
    <div className="flex gap-8 flex-col ">
      <div className="flex justify-between items-center p-5">
        <div className="w-full flex items-center justify-between ">
          <div className="text-green text-2xl font-bold">{vault.name}</div>
          <div className="flex ">
            <Chip className="h-auto justify-center p-1 ml-4 mr-3 bg-tint-11">
              blsmDAI
            </Chip>
            <Button variant="blue" className="pl-1 w-16">
              Add
            </Button>
          </div>
        </div>
      </div>
      <VaultDeposit />
      <VaultInfo vault={vault} showButtons />
      <VaultInterationHistory />
      <ServiceAgreementCard
        title="Wildcat Service Agreement"
        description="You agreed to the Wildcat Service Agreement on 12-Sept-2023"
      />
    </div>
  )
}
