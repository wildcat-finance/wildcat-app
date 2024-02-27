import { ChangeEvent, useState } from "react"

import { BorrowModal } from "../Modals"
import { useBorrow } from "../hooks/useVaultDetailActions"
import { BorrowAssetProps } from "./interface"
import {
  formatTokenWithCommas,
  TOKEN_FORMAT_DECIMALS,
} from "../../../../utils/formatters"
import { DetailsInput } from "../../../../components/ui-components/DetailsInput"
import { Button } from "../../../../components/ui-components"
import { useTransactionWait } from "../../../../store/useTransactionWait"

const BorrowAssets = ({
  borrowableAssets,
  marketAccount,
}: BorrowAssetProps) => {
  const { isTxInProgress, setisTxInProgress } = useTransactionWait()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const { mutateAsync, isLoading } = useBorrow(marketAccount)
  const [borrowAmount, setBorrowAmount] = useState("")

  const maxBorrowAmount = borrowableAssets

  const handleBorrowAmountChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target
    setBorrowAmount(value)
  }

  const underlyingBorrowAmount = borrowAmount
    ? marketAccount.market.underlyingToken.parseAmount(borrowAmount)
    : marketAccount.market.underlyingToken.parseAmount(0)

  const marketDisabled = marketAccount.market.isClosed
  const disabled =
    marketDisabled ||
    maxBorrowAmount.eq(0) ||
    underlyingBorrowAmount.gt(maxBorrowAmount) ||
    underlyingBorrowAmount.eq(0) ||
    isTxInProgress

  const leftBorrowAmount = maxBorrowAmount.sub(underlyingBorrowAmount)

  const handleBorrow = () => {
    setisTxInProgress(true)
    setIsModalOpen(false)
    mutateAsync(borrowAmount)
      .then(() => {
        setBorrowAmount("")
      })
      .catch((e) => {
        console.log(e)
      })
      .finally(() => {
        setisTxInProgress(false)
      })
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
        helperValue={`${formatTokenWithCommas(
          marketAccount.market.borrowableAssets,
          {
            withSymbol: true,
          },
        )}`}
        disabled={isTxInProgress}
      />

      <Button
        variant="green"
        className="w-64"
        onClick={() => setIsModalOpen(true)}
        disabled={disabled}
      >
        Borrow
      </Button>

      <BorrowModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        borrow={handleBorrow}
        borrowAmount={borrowAmount}
        leftBorrowAmount={leftBorrowAmount.toFixed(TOKEN_FORMAT_DECIMALS)}
        tokenSymbol={borrowableAssets.symbol}
        isLoading={isLoading}
      />
    </>
  )
}

export default BorrowAssets
