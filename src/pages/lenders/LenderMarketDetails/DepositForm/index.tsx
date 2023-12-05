import React, { useMemo } from "react"
import { Controller } from "react-hook-form"

import { Button } from "../../../../components/ui-components"
import {
  MARKET_PARAMS_DECIMALS,
  TOKEN_FORMAT_DECIMALS,
} from "../../../../utils/formatters"
import { useDeposit } from "../../../borrower/BorrowerMarketDetails/hooks/useVaultDetailActions"
import { DepositFormProps } from "./interface"
import { DetailsInput } from "../../../../components/ui-components/DetailsInput"
import { useDepositForm } from "./hooks/useValidateDeposit"
import { useAllowanceCheck } from "./hooks/useAllowanceCheck"
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
    !!errors.depositAmount

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
              helperValue={marketAccount.maximumDeposit.format(
                TOKEN_FORMAT_DECIMALS,
                true,
              )}
              disabled={isTxInProgress}
              {...field}
            />
          )}
        />
      </div>

      {hasInsufficientAllowance ? (
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
          onClick={onSubmit}
          disabled={disabled}
        >
          Deposit
        </Button>
      )}
    </div>
  )
}

export default DepositForm
