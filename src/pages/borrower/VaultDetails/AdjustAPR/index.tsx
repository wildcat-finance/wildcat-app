import React, { ChangeEvent, useState } from "react"

import { Button, NumberInput } from "../../../../components/ui-components"
import { AdjustAPRModal } from "../Modals"
import {
  useAdjustAPR,
  useTerminateMarket,
} from "../hooks/useVaultDetailActions"
import { AdjustAprProps } from "./interface"
import { MARKET_BIPS_DECIMAL_SCALES } from "../../../../utils/formatters"

const AdjustAPR = ({ marketAccount }: AdjustAprProps) => {
  const { mutate, isLoading: adjustAprLoading } = useAdjustAPR(marketAccount)
  const { mutate: terminateMarket, isLoading: terminateMarketLoading } =
    useTerminateMarket()
  const [apr, setApr] = useState("0")

  const { market } = marketAccount

  const handleAprChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target
    setApr(value)
  }

  const handleAdjustAPR = () => {
    mutate(parseFloat(apr))
  }

  const handleTerminateMarket = () => {
    terminateMarket()
  }

  const isLoading = adjustAprLoading || terminateMarketLoading

  return (
    <>
      <div className="w-full">
        <NumberInput
          decimalScale={MARKET_BIPS_DECIMAL_SCALES.annualInterestBips}
          className="w-full"
          placeholder="00,000.00"
          value={apr}
          onChange={handleAprChange}
        />
        <div className="text-xxs text-right mt-1.5 mr-auto pr-1.5 w-full">
          <span className="font-semibold">Current Base Rate:</span>{" "}
          {market.annualInterestBips / 100}%
        </div>
      </div>
      <div className="w-44 flex flex-col gap-y-1.5">
        <AdjustAPRModal
          disabled={parseFloat(apr) <= 0 || isLoading}
          adjustAPR={handleAdjustAPR}
          currentAPR={market.annualInterestBips / 100}
          newAPR={parseFloat(apr)}
          newReserveRatio={undefined}
          isLoading={isLoading}
        />

        <Button
          variant="red"
          className="w-44 px-2 whitespace-nowrap"
          disabled={isLoading}
          onClick={handleTerminateMarket}
        >
          Terminate Market
        </Button>
      </div>
    </>
  )
}

export default AdjustAPR
