import React, { ChangeEvent, useState } from "react"
import { BigNumber } from "ethers"

import { Button, NumberInput } from "../../../../components/ui-components"
import { RepayModal } from "../Modals"
import {
  useRepay,
  useRepayOutstandingDebt,
} from "../hooks/useVaultDetailActions"
import { RepayProps } from "./interface"

const Repay = ({ marketAccount }: RepayProps) => {
  const { market } = marketAccount
  const [repayAmount, setRepayAmount] = useState("0")
  const { mutate: repay, isLoading: isRepayLoading } = useRepay(marketAccount)
  const {
    mutate: repayOutstandingDebt,
    isLoading: isRepayOutstandingDebtLoading,
  } = useRepayOutstandingDebt(marketAccount)

  const handleRepayAmountChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target
    setRepayAmount(value)
  }

  const { outstandingDebt, underlyingToken } = market

  const repayAmountBigN = repayAmount
    ? BigNumber.from(repayAmount)
    : BigNumber.from("0")

  const disabled =
    outstandingDebt.raw.isZero() || repayAmountBigN.gt(outstandingDebt.raw)

  const isLoading = isRepayLoading || isRepayOutstandingDebtLoading

  const handleRepay = () => {
    repay(repayAmountBigN)
  }

  const newMarketReserve = market.totalAssets.raw.add(repayAmountBigN)

  return (
    <>
      <div className="w-full">
        <NumberInput
          decimalScale={4}
          className="w-full"
          placeholder="00,000.00"
          onChange={handleRepayAmountChange}
        />
        <div className="text-xxs text-right mt-1.5 mr-auto pr-1.5 w-full">
          <span className="font-semibold">Outstanding Debt:</span>{" "}
          {outstandingDebt.raw.toString()} {underlyingToken.symbol}
        </div>
      </div>
      <div className="w-44 flex flex-col gap-y-1.5">
        <RepayModal
          disabled={disabled || isLoading}
          newMarketReserve={newMarketReserve.toString()}
          repayAmount={repayAmount}
          isLoading={isLoading}
          tokenSymbol={underlyingToken.symbol}
          repay={handleRepay}
        />
        <Button
          disabled={disabled || isLoading}
          variant="green"
          className="w-full px-2 whitespace-nowrap"
          onClick={repayOutstandingDebt}
        >
          Repay To Minimum Reserves
        </Button>
      </div>
    </>
  )
}

export default Repay
