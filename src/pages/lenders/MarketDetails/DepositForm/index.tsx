import { useState } from "react"
import { TokenAmount } from "@wildcatfi/wildcat-sdk"
import { parseUnits } from "ethers/lib/utils"
import { Button, NumberInput } from "../../../../components/ui-components"
import {
  MARKET_PARAMS_DECIMALS,
  TOKEN_FORMAT_DECIMALS,
} from "../../../../utils/formatters"
import { useDeposit } from "../../../borrower/VaultDetails/hooks/useVaultDetailActions"
import { DepositFormProps } from "./interface"

const DepositForm = ({ marketAccount }: DepositFormProps) => {
  const { mutate, isLoading } = useDeposit(marketAccount)
  const [depositValue, setDepositValue] = useState("0")

  const depositValueBigNum = new TokenAmount(
    parseUnits(
      depositValue || "0",
      marketAccount.market.underlyingToken.decimals,
    ),
    marketAccount.market.underlyingToken,
  )

  const disabled =
    depositValueBigNum.raw.isZero() ||
    depositValueBigNum.raw.gt(marketAccount.market.maximumDeposit.raw) ||
    isLoading ||
    !marketAccount?.canDeposit

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
          max={marketAccount.market.maximumDeposit.format(
            TOKEN_FORMAT_DECIMALS,
          )}
        />
        <div className="text-xxs text-right">
          <span className="font-semibold">Deposit up to</span>{" "}
          {marketAccount.market.maximumDeposit.format(TOKEN_FORMAT_DECIMALS)}{" "}
          {marketAccount.market.underlyingToken.symbol}
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
