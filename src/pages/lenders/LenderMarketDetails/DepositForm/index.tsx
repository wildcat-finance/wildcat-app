import { useMemo, useState } from "react"
import { Button, NumberInput } from "../../../../components/ui-components"
import {
  MARKET_PARAMS_DECIMALS,
  TOKEN_FORMAT_DECIMALS,
} from "../../../../utils/formatters"
import {
  useApprove,
  useDeposit,
} from "../../../borrower/VaultDetails/hooks/useVaultDetailActions"
import { DepositFormProps } from "./interface"
import { getDepositButtonText } from "./utils/utils"

const DepositForm = ({ marketAccount }: DepositFormProps) => {
  const { mutate: approve, isLoading: isApproving } = useApprove(
    marketAccount.market.underlyingToken,
    marketAccount.market,
  )
  const [depositValue, setDepositValue] = useState("0")
  const { mutate: deposit, isLoading: isDepositing } = useDeposit(
    marketAccount,
    () => {
      setDepositValue("0")
    },
  )

  const depositTokenAmount = useMemo(() => {
    const tokenAmount =
      marketAccount.market.underlyingToken.parseAmount(depositValue)
    return tokenAmount
  }, [depositValue])

  const depositStep = marketAccount.checkDepositStep(depositTokenAmount)

  const disabled =
    depositTokenAmount.raw.isZero() ||
    isApproving ||
    isDepositing ||
    !["Ready", "InsufficientAllowance"].includes(depositStep?.status || "")

  const handleSubmit = () => {
    if (depositStep?.status === "Ready") {
      deposit(depositValue)
    } else if (depositStep?.status === "InsufficientAllowance") {
      approve(depositTokenAmount)
    }
  }

  const buttonText = getDepositButtonText(depositStep)

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
          <span className="font-semibold">Maximum Deposit:</span>{" "}
          {marketAccount.market.maximumDeposit.format(TOKEN_FORMAT_DECIMALS)}{" "}
          {marketAccount.market.underlyingToken.symbol}
        </div>
      </div>
      <Button
        variant="green"
        className="w-64"
        onClick={handleSubmit}
        disabled={disabled}
      >
        {buttonText}
      </Button>
    </div>
  )
}

export default DepositForm
