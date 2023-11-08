import { ChangeEvent, useState } from "react"
import { BigNumber } from "ethers"

import { NumberInput } from "../../../../components/ui-components"
import { BorrowModal } from "../Modals"
import { useBorrow } from "../hooks/useVaultDetailActions"
import { BorrowAssetProps } from "./interface"

const BorrowAssets = ({
  borrowableAssets,
  marketAccount,
}: BorrowAssetProps) => {
  const { mutate, isLoading } = useBorrow(marketAccount)
  const [borrowAmount, setBorrowAmount] = useState("0")

  const maxBorrowAmount = borrowableAssets.raw

  const handleBorrowAmountChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target
    setBorrowAmount(value)
  }

  const borrowAmounBigN = borrowAmount
    ? BigNumber.from(borrowAmount)
    : BigNumber.from("0")

  const disabled =
    maxBorrowAmount.isZero() || borrowAmounBigN.gt(maxBorrowAmount)

  const leftBorrowAmount = maxBorrowAmount.sub(borrowAmounBigN)

  const handleBorrow = () => {
    mutate(borrowAmount)
  }

  return (
    <>
      <NumberInput
        decimalScale={4}
        className="w-full"
        placeholder="00,000.00"
        value={borrowAmount}
        onChange={handleBorrowAmountChange}
      />

      <BorrowModal
        borrow={handleBorrow}
        borrowAmount={borrowAmount}
        leftBorrowAmount={leftBorrowAmount.toString()}
        tokenSymbol={borrowableAssets.symbol}
        disabled={disabled || isLoading}
        isLoading={isLoading}
      />
    </>
  )
}

export default BorrowAssets
