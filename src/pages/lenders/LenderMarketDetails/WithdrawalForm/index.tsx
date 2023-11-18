import { useState } from "react"
import { TokenAmount } from "@wildcatfi/wildcat-sdk"
import { parseUnits } from "ethers/lib/utils"
import { Button, NumberInput } from "../../../../components/ui-components"
import {
  MARKET_PARAMS_DECIMALS,
  TOKEN_FORMAT_DECIMALS,
} from "../../../../utils/formatters"
import { WithdrawalFormProps } from "./interface"
import { useWithdraw } from "../../../borrower/VaultDetails/hooks/useVaultDetailActions"

const WithdrawalForm = ({ marketAccount }: WithdrawalFormProps) => {
  const { mutate, isLoading } = useWithdraw(marketAccount)
  const [withdrawalValue, setWithdrawalValue] = useState("0")

  const withdrawalValueBigNum = new TokenAmount(
    parseUnits(
      withdrawalValue || "0",
      marketAccount.market.underlyingToken.decimals,
    ),
    marketAccount.market.underlyingToken,
  )

  const disabled =
    withdrawalValueBigNum.raw.isZero() ||
    withdrawalValueBigNum.gt(marketAccount.market.totalSupply.raw) ||
    isLoading ||
    !marketAccount?.canWithdraw

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
          max={marketAccount.market.totalSupply.format(TOKEN_FORMAT_DECIMALS)}
        />
        <div className="text-xxs text-right">
          <span className="font-semibold">Request up to</span>{" "}
          {marketAccount.maximumWithdrawal.format(TOKEN_FORMAT_DECIMALS)}{" "}
          {marketAccount.market.underlyingToken.symbol}
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
