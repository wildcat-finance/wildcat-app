import { TokenAmount } from "@wildcatfi/wildcat-sdk"
import { parseUnits } from "ethers/lib/utils"
import { Controller } from "react-hook-form"
import { Button } from "../../../../components/ui-components"
import {
  MARKET_PARAMS_DECIMALS,
  TOKEN_FORMAT_DECIMALS,
} from "../../../../utils/formatters"
import { WithdrawalFormProps } from "./interface"
import { useWithdraw } from "../../../borrower/BorrowerMarketDetails/hooks/useVaultDetailActions"
import { DetailsInput } from "../../../../components/ui-components/DetailsInput"
import { useWithdrawalForm } from "./hooks/useValidateWithdrawal"

const WithdrawalForm = ({ marketAccount }: WithdrawalFormProps) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useWithdrawalForm(marketAccount)

  const { mutateAsync, isLoading } = useWithdraw(marketAccount)

  const withdrawalValue = watch("withdrawalAmount")

  const onSubmit = handleSubmit(async () => {
    await mutateAsync(withdrawalValue)
    reset()
  })

  const withdrawalValueBigNum = new TokenAmount(
    parseUnits(
      withdrawalValue || "0",
      marketAccount.market.underlyingToken.decimals,
    ),
    marketAccount.market.underlyingToken,
  )

  const disabled =
    withdrawalValueBigNum.raw.isZero() || !!errors.withdrawalAmount || isLoading

  return (
    <div className="flex gap-x-3.5 w-full max-w-xl">
      <div className="flex flex-col w-full">
        <Controller
          name="withdrawalAmount"
          control={control}
          render={({ field }) => (
            <DetailsInput
              decimalScale={MARKET_PARAMS_DECIMALS.maxTotalSupply}
              className="w-full"
              placeholder="00,000.00"
              min={0}
              max={marketAccount.market.totalSupply.format(
                TOKEN_FORMAT_DECIMALS,
              )}
              market={marketAccount.market}
              errorText={errors.withdrawalAmount?.message}
              helperText="Balance"
              helperValue={`${marketAccount.marketBalance.format(
                TOKEN_FORMAT_DECIMALS,
              )}
            ${marketAccount.market.underlyingToken.symbol}`}
              {...field}
            />
          )}
        />
      </div>
      <Button
        variant="green"
        className="w-64"
        onClick={onSubmit}
        disabled={disabled}
      >
        Request
      </Button>
    </div>
  )
}

export default WithdrawalForm
