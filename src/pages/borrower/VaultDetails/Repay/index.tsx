import React, { ChangeEvent, useMemo, useState } from "react"

import { Button } from "../../../../components/ui-components"
import { RepayModal } from "../Modals"
import {
  useApprove,
  useRepay,
  useRepayOutstandingDebt,
} from "../hooks/useVaultDetailActions"
import { RepayProps } from "./interface"
import {
  MARKET_PARAMS_DECIMALS,
  TOKEN_FORMAT_DECIMALS,
} from "../../../../utils/formatters"
import { DetailsInput } from "../../../../components/ui-components/DetailsInput"

const Repay = ({ marketAccount }: RepayProps) => {
  const { market } = marketAccount
  const [repayAmount, setRepayAmount] = useState("0")
  const { mutate: repay, isLoading: isRepayAmountLoading } =
    useRepay(marketAccount)
  const {
    mutate: repayOutstandingDebt,
    isLoading: isRepayOutstandingDebtLoading,
  } = useRepayOutstandingDebt(marketAccount)
  const { mutate: approve, isLoading: isApproving } = useApprove(
    marketAccount.market.underlyingToken,
    marketAccount.market,
  )

  const handleRepayAmountChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target
    setRepayAmount(value || "0")
  }

  const { outstandingDebt, underlyingToken } = market

  const repayTokenAmount = useMemo(
    () => marketAccount.market.underlyingToken.parseAmount(repayAmount),
    [repayAmount],
  )
  const repayStep = marketAccount.checkRepayStep(repayTokenAmount)

  const isLoading =
    isRepayAmountLoading || isRepayOutstandingDebtLoading || isApproving

  const repayDisabled =
    repayTokenAmount.raw.isZero() || repayStep.status !== "Ready" || isLoading

  const repayOutstandingDisabled =
    outstandingDebt.raw.isZero() ||
    !marketAccount.canRepayOutstanding ||
    isLoading

  const handleApprove = () => {
    if (repayStep?.status === "InsufficientAllowance") {
      approve(repayTokenAmount)
    }
  }

  const handleRepay = () => {
    repay(repayTokenAmount)
  }

  const newMarketReserve = market.totalAssets.add(repayTokenAmount)

  return (
    <>
      <DetailsInput
        market={market}
        decimalScale={MARKET_PARAMS_DECIMALS.maxTotalSupply}
        className="w-full"
        placeholder="00,000.00"
        onChange={handleRepayAmountChange}
        helperText="Outstanding Debt"
        helperValue={`${outstandingDebt.format(TOKEN_FORMAT_DECIMALS, true)}`}
      />
      <div className="w-44 flex flex-col gap-y-1.5">
        {repayStep.status === "InsufficientAllowance" ? (
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
            repayAmount={repayAmount}
            isLoading={isLoading}
            tokenSymbol={underlyingToken.symbol}
            repay={handleRepay}
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
