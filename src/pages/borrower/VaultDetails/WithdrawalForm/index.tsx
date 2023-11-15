import { useState } from "react"
import { BigNumber } from "ethers"
import { Button, NumberInput } from "../../../../components/ui-components"
import {
  MARKET_PARAMS_DECIMALS,
  TOKEN_FORMAT_DECIMALS,
} from "../../../../utils/formatters"
import { WithdrawalFormProps } from "./interface"
import { useWithdraw } from "../hooks/useVaultDetailActions"

const WithdrawalForm = ({
  marketAccount,
  totalSupply,
}: WithdrawalFormProps) => {
  const { mutate, isLoading } = useWithdraw(marketAccount)
  const [withdrawalValue, setWithdrawalValue] = useState("0")

  const withdrawalValueBigNum = withdrawalValue
    ? BigNumber.from(withdrawalValue)
    : BigNumber.from("0")

  const disabled =
    withdrawalValueBigNum.isZero() ||
    withdrawalValueBigNum.gt(totalSupply.raw) ||
    isLoading

  const handleWithdraw = () => {
    mutate(withdrawalValue)
  }

  return (
    <div className="flex gap-x-3.5 w-full max-w-lg">
      <div className="flex flex-col w-full">
        <NumberInput
          decimalScale={MARKET_PARAMS_DECIMALS.maxTotalSupply}
          value={withdrawalValue}
          className="w-full"
          placeholder="10.00"
          onChange={(e) => setWithdrawalValue(e.target.value)}
          min={0}
        />
        <div className="text-xxs text-right">
          <span className="font-semibold">Request up to</span>{" "}
          {totalSupply.format(TOKEN_FORMAT_DECIMALS)}{" "}
          {marketAccount.marketBalance.symbol}
        </div>
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
