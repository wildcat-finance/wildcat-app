import React, { useMemo, useState } from "react"
import { Controller } from "react-hook-form"

import { Button } from "../../../../components/ui-components"
import {
  formatTokenWithCommas,
  MARKET_PARAMS_DECIMALS,
} from "../../../../utils/formatters"
import { useDeposit } from "../../../borrower/BorrowerMarketDetails/hooks/useVaultDetailActions"
import { DepositFormProps } from "./interface"
import { DetailsInput } from "../../../../components/ui-components/DetailsInput"
import { useDepositForm } from "./hooks/useValidateDeposit"
import { useAllowanceCheck } from "./hooks/useAllowanceCheck"
import { DepositModal } from "../Modals/DepositModal"
import { useGnosisSafeSDK } from "../../../../hooks/useGnosisSafeSDK"
import { useTransactionWait } from "../../../../store/useTransactionWait"

const DepositForm = ({ marketAccount }: DepositFormProps) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useDepositForm(marketAccount)

  const { isTxInProgress, setisTxInProgress } = useTransactionWait()

  const { isConnectedToSafe } = useGnosisSafeSDK()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleModal = () => setIsModalOpen(!isModalOpen)

  const { mutateAsync: deposit, isLoading: isDepositing } =
    useDeposit(marketAccount)

  const depositValue = watch("depositAmount")

  const depositTokenAmount = useMemo(
    () => marketAccount.market.underlyingToken.parseAmount(depositValue || "0"),
    [depositValue],
  )
  const { hasInsufficientAllowance, handleApprove, isApproving } =
    useAllowanceCheck(marketAccount, depositTokenAmount)

  const onSubmit = handleSubmit(() => {
    toggleModal()
    setisTxInProgress(true)
    deposit(depositValue)
      .then(() => {
        reset()
      })
      .catch((e) => {
        console.log(e)
      })
      .finally(() => {
        setisTxInProgress(false)
      })
  })

  const marketDisabled = marketAccount.market.isClosed
  const isLoading = isDepositing || isApproving
  const disabled =
    marketDisabled ||
    depositTokenAmount.raw.isZero() ||
    isLoading ||
    !!errors.depositAmount ||
    isTxInProgress

  return (
    <div className="flex gap-x-3.5 w-full max-w-xl">
      <div className="flex flex-col w-full">
        <Controller
          name="depositAmount"
          control={control}
          render={({ field }) => (
            <DetailsInput
              decimalScale={MARKET_PARAMS_DECIMALS.maxTotalSupply}
              className="w-full"
              placeholder="00,000.00"
              min={0}
              market={marketAccount.market}
              errorText={errors.depositAmount?.message}
              helperText="Maximum Deposit"
              helperValue={formatTokenWithCommas(marketAccount.maximumDeposit, {
                withSymbol: true,
              })}
              disabled={isTxInProgress}
              {...field}
            />
          )}
        />
      </div>

      {hasInsufficientAllowance && !isConnectedToSafe ? (
        <Button
          variant="green"
          className="w-64 px-2 whitespace-nowrap"
          onClick={handleApprove}
          disabled={isApproving}
        >
          Approve
        </Button>
      ) : (
        <Button
          variant="green"
          className="w-64"
          onClick={toggleModal}
          disabled={disabled}
        >
          Deposit
        </Button>
      )}

      <DepositModal
        onClose={toggleModal}
        deposit={onSubmit}
        isLoading={isLoading}
        isOpen={isModalOpen}
        depositAmount={depositValue}
        tokenSymbol={marketAccount.market.underlyingToken.symbol}
      />
    </div>
  )
}

export default DepositForm
