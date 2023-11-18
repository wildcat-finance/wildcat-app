import React, { ChangeEvent, useState } from "react"
import { BigNumber } from "ethers"

import { TokenAmount } from "@wildcatfi/wildcat-sdk"
import { parseUnits } from "ethers/lib/utils"
import { Button, NumberInput } from "../../../../components/ui-components"
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

  // const repayAmountBigN = repayAmount
  //   ? BigNumber.from(repayAmount)
  //   : BigNumber.from("0")

  const repayTokenAmount = new TokenAmount(
    parseUnits(repayAmount, marketAccount.market.underlyingToken.decimals),
    marketAccount.market.underlyingToken,
  )

  const isLoading =
    isRepayAmountLoading || isRepayOutstandingDebtLoading || isApproving

  const repayDisabled =
    repayTokenAmount.raw.isZero() ||
    outstandingDebt.raw.isZero() ||
    marketAccount.checkRepayStep(repayTokenAmount).status !== "Ready" ||
    isLoading

  const repayOutstandingDisabled =
    outstandingDebt.raw.isZero() ||
    !marketAccount.canRepayOutstanding ||
    isLoading

  const isEnoughTokenApproval = marketAccount.isApprovedFor(repayTokenAmount)
  const allowanceRemainder =
    marketAccount.getAllowanceRemainder(repayTokenAmount)

  const handleApprove = () => {
    approve(allowanceRemainder.toFixed())
  }
  const handleRepay = () => {
    repay(repayTokenAmount)
  }

  const newMarketReserve = market.totalAssets.add(repayTokenAmount)

  return (
    <>
      <div className="w-full">
        <NumberInput
          decimalScale={MARKET_PARAMS_DECIMALS.maxTotalSupply}
          className="w-full"
          placeholder="00,000.00"
          onChange={handleRepayAmountChange}
        />
        <div className="text-xxs text-right mt-1.5 mr-auto pr-1.5 w-full">
          <span className="font-semibold">Outstanding Debt:</span>{" "}
          {outstandingDebt.format(TOKEN_FORMAT_DECIMALS, true)}
        </div>
      </div>
      <div className="w-44 flex flex-col gap-y-1.5">
        {isEnoughTokenApproval ? (
          <RepayModal
            disabled={repayDisabled}
            newMarketReserve={newMarketReserve.format(TOKEN_FORMAT_DECIMALS)}
            repayAmount={repayAmount}
            isLoading={isLoading}
            tokenSymbol={underlyingToken.symbol}
            repay={handleRepay}
          />
        ) : (
          <Button
            variant="green"
            className="w-full"
            onClick={handleApprove}
            disabled={isApproving}
          >
            Approve
          </Button>
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
