import React, { ChangeEvent, useState, useMemo } from "react"
import { TokenAmount } from "@wildcatfi/wildcat-sdk"

import { Button } from "../../../../components/ui-components"
import {
  MARKET_PARAMS_DECIMALS,
  TOKEN_FORMAT_DECIMALS,
} from "../../../../utils/formatters"
import {
  useApprove,
  useDeposit,
} from "../../../borrower/VaultDetails/hooks/useVaultDetailActions"
import { DepositFormProps } from "./interface"
import { DetailsInput } from "../../../../components/ui-components/DetailsInput"

const DepositForm = ({ marketAccount }: DepositFormProps) => {
  const [allowanceRemainder, setAllowanceRemainder] = useState<
    TokenAmount | undefined
  >(undefined)
  const { mutateAsync: approve, isLoading: isApproving } = useApprove(
    marketAccount.market.underlyingToken,
    marketAccount.market,
  )

  const [depositValue, setDepositValue] = useState("0")
  const { mutate: deposit, isLoading } = useDeposit(marketAccount, () => {
    setDepositValue("0")
  })

  const [error, setError] = useState<string | undefined>()

  const handleChangeDeposit = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target
    setDepositValue(value)

    if (value === "" || value === "0") {
      setAllowanceRemainder(undefined)
      setError(undefined)
      return
    }

    const depositValueAmount =
      marketAccount.market.underlyingToken.parseAmount(value)

    const checkDepositStep = marketAccount.checkDepositStep(depositValueAmount)

    if (checkDepositStep.status !== "Ready") {
      setError(checkDepositStep.status)

      if (checkDepositStep.status === "InsufficientAllowance") {
        setAllowanceRemainder(checkDepositStep.remainder)
      }
    } else {
      setError(undefined)
    }
  }

  const depositTokenAmount = useMemo(
    () => marketAccount.market.underlyingToken.parseAmount(depositValue || "0"),
    [depositValue],
  )

  const handleSubmit = () => {
    deposit(depositValue)
  }

  const handleApprove = async () => {
    if (allowanceRemainder) {
      await approve(allowanceRemainder).then(() => {
        setAllowanceRemainder(undefined)
      })
    }
  }

  const disabled =
    depositTokenAmount.raw.isZero() || isApproving || isLoading || !!error

  return (
    <div className="flex gap-x-3.5 w-full max-w-xl">
      <div className="flex flex-col w-full">
        <DetailsInput
          decimalScale={MARKET_PARAMS_DECIMALS.maxTotalSupply}
          value={depositValue}
          className="w-full"
          placeholder="10.00"
          onChange={handleChangeDeposit}
          min={0}
          market={marketAccount.market}
          errorText={error}
          helperText="Maximum Deposit"
          helperValue={`${marketAccount.maximumDeposit.format(
            TOKEN_FORMAT_DECIMALS,
          )}
          ${marketAccount.market.underlyingToken.symbol}`}
        />
      </div>
      {allowanceRemainder ? (
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
          onClick={handleSubmit}
          disabled={disabled}
        >
          Deposit
        </Button>
      )}
    </div>
  )
}

export default DepositForm
