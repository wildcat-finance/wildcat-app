import React, { useMemo } from "react"

import { Controller } from "react-hook-form"
import { Button } from "../../../../components/ui-components"
import { RepayModal } from "../Modals"
import {
  useProcessUnpaidWithdrawalBatch,
  useRepay,
  useRepayOutstandingDebt,
} from "../hooks/useVaultDetailActions"
import { RepayProps } from "./interface"
import {
  MARKET_PARAMS_DECIMALS,
  TOKEN_FORMAT_DECIMALS,
} from "../../../../utils/formatters"
import { DetailsInput } from "../../../../components/ui-components/DetailsInput"
import { useRepayForm } from "./hooks/useValidateRepay"
import { useAllowanceCheck } from "./hooks/useAllowanceCheck"

const Repay = ({ marketAccount }: RepayProps) => {
  const { market } = marketAccount

  const { mutate: repay, isLoading: isRepayAmountLoading } =
    useRepay(marketAccount)

  const {
    mutate: repayAndProcessUnpaidWithdrawalBatch,
    isLoading: isLoadingUnpaidWithdrawalBatch,
  } = useProcessUnpaidWithdrawalBatch(marketAccount.market)

  const {
    mutate: repayOutstandingDebt,
    isLoading: isRepayOutstandingDebtLoading,
  } = useRepayOutstandingDebt(marketAccount)

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useRepayForm(marketAccount)

  const repayValue = watch("repayAmount")

  const repayTokenAmount = useMemo(
    () => marketAccount.market.underlyingToken.parseAmount(repayValue || "0"),
    [repayValue],
  )

  const { hasInsufficientAllowance, handleApprove, isApproving } =
    useAllowanceCheck(marketAccount, repayTokenAmount)

  const onSubmit = handleSubmit(async () => {
    try {
      if (!market.unpaidWithdrawalBatchExpiries.length) {
        await repay(repayTokenAmount)
        reset()
      } else {
        const { length } = market.unpaidWithdrawalBatchExpiries

        await repayAndProcessUnpaidWithdrawalBatch({
          tokenAmount: repayTokenAmount,
          maxBatches: length,
        })
        reset()
      }
    } catch (error) {
      console.log(error)
    }
  })

  const { outstandingDebt, underlyingToken } = market

  const isLoading =
    isRepayAmountLoading ||
    isRepayOutstandingDebtLoading ||
    isApproving ||
    isLoadingUnpaidWithdrawalBatch

  const repayDisabled =
    repayTokenAmount.raw.isZero() || !!errors.repayAmount || isLoading

  const repayOutstandingDisabled =
    outstandingDebt.raw.isZero() ||
    !marketAccount.canRepayOutstanding ||
    isLoading

  const newMarketReserve = market.totalAssets.add(repayTokenAmount)

  return (
    <>
      <Controller
        name="repayAmount"
        control={control}
        render={({ field }) => (
          <DetailsInput
            market={market}
            decimalScale={MARKET_PARAMS_DECIMALS.maxTotalSupply}
            className="w-full"
            placeholder="00,000.00"
            helperText="Borrowed"
            error={!!errors.repayAmount}
            errorText={errors.repayAmount?.message}
            helperValue={`${outstandingDebt.format(
              TOKEN_FORMAT_DECIMALS,
              true,
            )}`}
            {...field}
          />
        )}
      />
      <div className="w-44 flex flex-col gap-y-1.5">
        {hasInsufficientAllowance ? (
          <Button
            variant="green"
            className="w-full"
            onClick={handleApprove}
            disabled={isApproving}
          >
            Approve
          </Button>
        ) : (
          <RepayModal
            disabled={repayDisabled}
            newMarketReserve={newMarketReserve.format(TOKEN_FORMAT_DECIMALS)}
            repayAmount={repayValue}
            isLoading={isLoading}
            tokenSymbol={underlyingToken.symbol}
            repay={onSubmit}
          />
        )}
        <Button
          disabled={repayOutstandingDisabled}
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
