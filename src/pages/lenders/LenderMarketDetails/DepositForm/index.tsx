import React, { useMemo, useState } from "react"
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
import { DepositModal } from "../Modals/DepositModal"

const DepositForm = ({ marketAccount }: DepositFormProps) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useDepositForm(marketAccount)

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

  const onSubmit = handleSubmit(async () => {
    toggleModal()
    await deposit(depositValue)
    reset()
  })

  const isLoading = isDepositing || isApproving
  const disabled =
    depositTokenAmount.raw.isZero() || isLoading || !!errors.depositAmount

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
              placeholder="10.00"
              min={0}
              market={marketAccount.market}
              errorText={errors.depositAmount?.message}
              helperText="Maximum Deposit"
              helperValue={marketAccount.maximumDeposit.format(
                TOKEN_FORMAT_DECIMALS,
                true,
              )}
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
          onClick={toggleModal}
          disabled={disabled}
        >
          Deposit
        </Button>
      )}
      {/* TODO: fix marketCapacity value */}
      <DepositModal
        onClose={toggleModal}
        deposit={onSubmit}
        isLoading={isLoading}
        isOpen={isModalOpen}
        depositAmount={depositValue}
        marketCapacity=""
        tokenSymbol={marketAccount.market.underlyingToken.symbol}
      />
    </div>
  )
}

export default DepositForm
