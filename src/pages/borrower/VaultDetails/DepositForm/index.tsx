import { useState } from "react"
import { BigNumber } from "ethers"
import { Button, NumberInput } from "../../../../components/ui-components"
import {
  MARKET_PARAMS_DECIMALS,
  TOKEN_FORMAT_DECIMALS,
} from "../../../../utils/formatters"
import { useDeposit } from "../hooks/useVaultDetailActions"
import { DepositFormProps } from "./interface"

const DepositForm = ({ marketAccount }: DepositFormProps) => {
  const { mutate, isLoading } = useDeposit(marketAccount)
  const [depositValue, setDepositValue] = useState("0")

  const depositValueBigNum = depositValue
    ? BigNumber.from(depositValue)
    : BigNumber.from("0")

  const disabled =
    depositValueBigNum.isZero() ||
    depositValueBigNum.gt(marketAccount.maximumDeposit.raw) ||
    isLoading

  const handleDeposit = () => {
    mutate(depositValue)
  }

  return (
    <div className="flex gap-x-3.5 w-full max-w-lg">
      <div className="flex flex-col w-full">
        <NumberInput
          decimalScale={MARKET_PARAMS_DECIMALS.maxTotalSupply}
          value={depositValue}
          className="w-full"
          placeholder="10.00"
          onChange={(e) => setDepositValue(e.target.value)}
          min={0}
        />
        <div className="text-xxs text-right">
          <span className="font-semibold">Deposit up to</span>{" "}
          {marketAccount.maximumDeposit.format(TOKEN_FORMAT_DECIMALS)}{" "}
          {marketAccount.underlyingBalance.symbol}
        </div>
      </div>
      <Button
        variant="green"
        className="w-64"
        onClick={handleDeposit}
        disabled={disabled}
      >
        Deposit
      </Button>
    </div>
  )
}

export default DepositForm
