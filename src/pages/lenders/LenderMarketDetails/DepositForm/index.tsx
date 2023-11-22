import React, { ChangeEvent, useState, useMemo } from "react"

import { Button } from "../../../../components/ui-components"
import {
  MARKET_PARAMS_DECIMALS,
  TOKEN_FORMAT_DECIMALS,
} from "../../../../utils/formatters"
import {
  useApprove,
  useDeposit,
} from "../../../borrower/BorrowerMarketDetails/hooks/useVaultDetailActions"
import { DepositFormProps } from "./interface"
import { DetailsInput } from "../../../../components/ui-components/DetailsInput"
import { SDK_ERRORS_MAPPING } from "../../../../utils/forms/errors"

const DepositForm = ({ marketAccount }: DepositFormProps) => {
  const { mutateAsync: approve, isLoading: isApproving } = useApprove(
    marketAccount.market.underlyingToken,
    marketAccount.market,
  )

  const [depositValue, setDepositValue] = useState("0")
  const { mutate: deposit, isLoading } = useDeposit(marketAccount, () => {
    setDepositValue("0")
  })

  const [error, setError] = useState<string | undefined>()
  const [insufficientAllowance, setInsufficientAllowance] = useState(false)

  const clearErrors = () => {
    setInsufficientAllowance(false)
    setError(undefined)
  }

  const validate = (value: string) => {
    const depositValueAmount =
      marketAccount.market.underlyingToken.parseAmount(value)

    const checkDepositStep = marketAccount.checkDepositStep(depositValueAmount)

    if (checkDepositStep.status !== "Ready") {
      setError(SDK_ERRORS_MAPPING.deposit[checkDepositStep.status])

      if (checkDepositStep.status === "InsufficientAllowance") {
        setInsufficientAllowance(true)
      }
    } else {
      clearErrors()
    }
  }

  const handleChangeDeposit = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target
    setDepositValue(value)

    if (value === "" || value === "0") {
      clearErrors()
      return
    }

    validate(value)
  }

  const depositTokenAmount = useMemo(
    () => marketAccount.market.underlyingToken.parseAmount(depositValue || "0"),
    [depositValue],
  )

  const handleSubmit = () => {
    deposit(depositValue)
  }

  const handleApprove = () => {
    if (!depositTokenAmount.raw.isZero()) {
      approve(depositTokenAmount).then(() => {
        // There is a delay between the approval tx and the allowance update
        setTimeout(() => {
          validate(depositValue)
        }, 500)
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
      {insufficientAllowance ? (
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
