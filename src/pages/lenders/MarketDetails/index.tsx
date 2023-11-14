import React from "react"

import { useParams } from "react-router-dom"
import { VaultInfo } from "./VaultInfo"

import { Button, Chip, Spinner } from "../../../components/ui-components"
import { useWalletConnect } from "../../borrower/hooks/useWalletConnect"
import { useCurrentNetwork } from "../../../hooks/useCurrentNetwork"
import { VaultDeposit } from "./VaultDeposit"
import {
  useGetMarket,
  useGetMarketAccount,
} from "../../borrower/VaultDetails/hooks/useGetMarket"

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

export function MarketDetails() {
  const { isConnected } = useWalletConnect()
  const { isWrongNetwork } = useCurrentNetwork()

  const { marketAddress } = useParams()
  const { data: market, isLoading: isMarketLoading } =
    useGetMarket(marketAddress)
  const { data: marketAccount, isLoading: isMarketAccountLoading } =
    useGetMarketAccount(market)

  const isLoading = isMarketLoading || isMarketAccountLoading

  if (!isConnected || isWrongNetwork) {
    return <div />
  }

  if (isLoading) {
    return <Spinner isLoading={isLoading} />
  }

  if (!market || !marketAccount) {
    return <div>Market not found</div>
  }

  console.log("MARKET", marketAccount)

  return (
    <div className="flex gap-8 flex-col ">
      <div className="flex justify-between items-center pt-5 pb-5">
        <div className="w-full flex items-center justify-between">
          <div className="text-green text-2xl font-bold">{market.name}</div>
          <div className="flex ">
            <Chip className="h-auto justify-center p-1 ml-4 mr-3 bg-tint-11">
              {market.underlyingToken.symbol}
            </Chip>
            <Button variant="blue" className="pl-1 w-16">
              Add
            </Button>
          </div>
        </div>
      </div>
      <VaultDeposit market={market} />
      <VaultInfo market={market} />
    </div>
  )
}
