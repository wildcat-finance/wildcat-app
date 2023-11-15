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
import { WithdrawalsControlPanel } from "./WithdrawalsControlPanel"
import { tableDataMock } from "../../../mocks/vaults"
import { BorrowersPaymentHistory } from "./BorrowersPaymentHistory"

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
      <WithdrawalsControlPanel tableData={tableDataMock} />
      <BorrowersPaymentHistory marketAddress={market.address} />
      <VaultInfo market={market} />
    </div>
  )
}
