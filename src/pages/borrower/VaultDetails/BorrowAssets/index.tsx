import { ChangeEvent, useState } from "react"
import { BigNumber } from "ethers"

import { BorrowModal } from "../Modals"
import { useBorrow } from "../hooks/useVaultDetailActions"
import { BorrowAssetProps } from "./interface"
import { TOKEN_FORMAT_DECIMALS } from "../../../../utils/formatters"
import { DetailsInput } from "../../../../components/ui-components/DetailsInput"

const BorrowAssets = ({
  borrowableAssets,
  marketAccount,
}: BorrowAssetProps) => {
  const { mutate, isLoading } = useBorrow(marketAccount)
  const [borrowAmount, setBorrowAmount] = useState("0")

  const maxBorrowAmount = borrowableAssets

  const handleBorrowAmountChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target
    setBorrowAmount(value)
  }

  const underlyingBorrowAmount = borrowAmount
    ? marketAccount.market.underlyingToken.parseAmount(borrowAmount)
    : marketAccount.market.underlyingToken.parseAmount(0)

  const disabled =
    maxBorrowAmount.eq(0) || underlyingBorrowAmount.gt(maxBorrowAmount)

  const leftBorrowAmount = maxBorrowAmount.sub(underlyingBorrowAmount)

  const handleBorrow = () => {
    mutate(borrowAmount)
  }

  return (
    <>
      <DetailsInput
        market={marketAccount.market}
        decimalScale={TOKEN_FORMAT_DECIMALS}
        className="w-full"
        placeholder="00,000.00"
        value={borrowAmount}
        onChange={handleBorrowAmountChange}
        helperText="Available To Borrow"
        helperValue={`${marketAccount.market.borrowableAssets.format(
          TOKEN_FORMAT_DECIMALS,
          true,
        )}`}
      />

      <BorrowModal
        borrow={handleBorrow}
        borrowAmount={borrowAmount}
        leftBorrowAmount={leftBorrowAmount.toFixed(TOKEN_FORMAT_DECIMALS)}
        tokenSymbol={borrowableAssets.symbol}
        disabled={disabled || isLoading}
        isLoading={isLoading}
      />
    </>
  )
}

export default BorrowAssets
