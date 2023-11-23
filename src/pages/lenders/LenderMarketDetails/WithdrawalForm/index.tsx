import { ChangeEvent, useState } from "react"
import { TokenAmount } from "@wildcatfi/wildcat-sdk"
import { parseUnits } from "ethers/lib/utils"
import { Button } from "../../../../components/ui-components"
import {
  MARKET_PARAMS_DECIMALS,
  TOKEN_FORMAT_DECIMALS,
} from "../../../../utils/formatters"
import { WithdrawalFormProps } from "./interface"
import { useWithdraw } from "../../../borrower/BorrowerMarketDetails/hooks/useVaultDetailActions"
import { DetailsInput } from "../../../../components/ui-components/DetailsInput"
import { SDK_ERRORS_MAPPING } from "../../../../utils/forms/errors"

const WithdrawalForm = ({ marketAccount }: WithdrawalFormProps) => {
  const { mutateAsync, isLoading } = useWithdraw(marketAccount)
  const [withdrawalValue, setWithdrawalValue] = useState("0")
  const [error, setError] = useState<string | undefined>()

  const withdrawalValueBigNum = new TokenAmount(
    parseUnits(
      withdrawalValue || "0",
      marketAccount.market.underlyingToken.decimals,
    ),
    marketAccount.market.underlyingToken,
  )

  const disabled = withdrawalValueBigNum.raw.isZero() || !!error || isLoading

  const clearErrors = () => setError(undefined)

  const validate = (value: string) => {
    const withdrawalAmount =
      marketAccount.market.underlyingToken.parseAmount(value)

    const { status } = marketAccount.checkQueueWithdrawalStep(withdrawalAmount)

    if (status !== "Ready") {
      setError(SDK_ERRORS_MAPPING.queueWithdrawal[status])
    } else {
      clearErrors()
    }
  }

  const handleChangeWithdrawalAmount = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target
    setWithdrawalValue(value)

    if (value === "" || value === "0") {
      clearErrors()
      return
    }

    validate(value)
  }

  const handleWithdraw = () => {
    mutateAsync(withdrawalValue)
      .catch((e) => {
        console.log(e)
      })
      .finally(() => {
        setWithdrawalValue("")
      })
  }

  return (
    <div className="flex gap-x-3.5 w-full max-w-xl">
      <div className="flex flex-col w-full">
        <DetailsInput
          decimalScale={MARKET_PARAMS_DECIMALS.maxTotalSupply}
          value={withdrawalValue}
          className="w-full"
          placeholder="10.00"
          onChange={handleChangeWithdrawalAmount}
          min={0}
          max={marketAccount.market.totalSupply.format(TOKEN_FORMAT_DECIMALS)}
          market={marketAccount.market}
          errorText={error}
          helperText="Balance"
          helperValue={`${marketAccount.marketBalance.format(
            TOKEN_FORMAT_DECIMALS,
          )}
          ${marketAccount.market.underlyingToken.symbol}`}
        />
      </div>
      <Button
        variant="green"
        className="w-64"
        onClick={handleWithdraw}
        disabled={disabled}
      >
        Request
      </Button>
    </div>
  )
}

export default WithdrawalForm
