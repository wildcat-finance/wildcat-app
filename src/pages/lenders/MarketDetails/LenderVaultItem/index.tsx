import React, { useState } from "react"

import { VaultInfo } from "./VaultInfo"

import {
  Button,
  Chip,
  Paper,
  Spinner,
} from "../../../../components/ui-components"
import expandMore from "../../../../components/ui-components/icons/expand_more.svg"
import expandLess from "../../../../components/ui-components/icons/expand_less.svg"
import { useWalletConnect } from "../../../borrower/hooks/useWalletConnect"
import { useBorrowerRouting } from "../../../borrower/hooks/useBorrowerRouting"
import { useCurrentNetwork } from "../../../../hooks/useCurrentNetwork"
import VaultInterationHistory from "./VaultInterationHistory"
import LendersServiceAgreement from "../../LendersServiceAgreement"
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
      <div className="flex justify-between items-center p-5">
        <div className="flex items-center">
          <div className="font-bold">{vault.name}</div>
          <Chip className="h-auto justify-center p-1 ml-4 mr-3 bg-tint-11">
            blsmDAI
          </Chip>
          <Button variant="blue" className="pl-1 w-16">
            Add
          </Button>
        </div>
        <Button className="flex items-center gap-x-2 text-xxs underline cursor-pointer">
          <img src={expandLess} className="w-5" alt="Back" />
          ) : (
          <img src={expandMore} className="w-5" alt="Back" />
        </Button>
      </div>

      <VaultInfo vault={vault} showButtons />
      <VaultInterationHistory />
      <VaultDeposit />
      <ServiceAgreementCard
        className="mt-12"
        title="Wildcat Service Agreement"
        description="You agreed to the Wildcat Service Agreement on 12-Sept-2023"
      />
    </Paper>
  )
}
