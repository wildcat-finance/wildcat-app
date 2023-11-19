import React, { ChangeEvent, useState } from "react"

import { Button, NumberInput } from "../../../../components/ui-components"
import { AdjustAPRModal } from "../Modals"
import {
  useAdjustAPR,
  useTerminateMarket,
} from "../hooks/useVaultDetailActions"
import { AdjustAprProps } from "./interface"
import { MARKET_PARAMS_DECIMALS } from "../../../../utils/formatters"

const AdjustAPR = ({ marketAccount }: AdjustAprProps) => {
  const { mutate, isLoading: adjustAprLoading } = useAdjustAPR(marketAccount)
  const { mutate: terminateMarket, isLoading: terminateMarketLoading } =
    useTerminateMarket(marketAccount)
  const [apr, setApr] = useState("0")
  const [newReserveRatio, setNewReserveRatio] = useState<number | undefined>()
  const [error, setError] = useState<string | undefined>()

  const { market } = marketAccount

  const handleAprChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target
    setApr(value)

    if (value === "" || value === "0") {
      setNewReserveRatio(undefined)
      setError(undefined)
      return
    }

    // If status is not `Ready`, show error message
    const parsedNewApr = parseFloat(value) * 100
    const checkAPRStep = marketAccount.checkSetAPRStep(parsedNewApr)

    if (checkAPRStep.status !== "Ready") {
      setError(checkAPRStep.status)
      setNewReserveRatio(undefined)
      return
    }

    setError(undefined)
    const temporaryReserveRatioForChange =
      market.getReserveRatioForNewAPR(parsedNewApr)
    setNewReserveRatio(temporaryReserveRatioForChange)
  }

  const handleAdjustAPR = () => {
    if (!error) mutate(parseFloat(apr))
  }

  const handleTerminateMarket = () => {
    terminateMarket()
    // @todo handle approval when status is InsufficientApproval
    // otherwise, if status not `Ready`, show error message
    const terminateMarketStep = marketAccount.checkCloseMarketStep()
  }

  const reserveRatioChanged =
    newReserveRatio !== null && market.reserveRatioBips !== newReserveRatio

  const isLoading = adjustAprLoading || terminateMarketLoading
  const disabledApr = !apr || parseFloat(apr) <= 0 || !!error || isLoading

  return (
    <>
      <div className="w-full">
        <NumberInput
          decimalScale={MARKET_PARAMS_DECIMALS.annualInterestBips}
          className="w-full"
          placeholder="00,000.00"
          value={apr}
          onChange={handleAprChange}
          error={!!error}
        />
        <div className="flex justify-between items-start text-xxs text-right mt-1.5 mr-auto pr-1.5 w-full">
          <div>
            {error && (
              <div className="whitespace-nowrap text-red-error text-xxs">
                {error}
              </div>
            )}
          </div>
          <div>
            <span className="font-semibold">Current Base Rate:</span>{" "}
            {market.annualInterestBips / 100}%
          </div>
        </div>
      </div>
      <div className="w-44 flex flex-col gap-y-1.5">
        <AdjustAPRModal
          disabled={disabledApr}
          adjustAPR={handleAdjustAPR}
          currentAPR={market.annualInterestBips / 100}
          newAPR={parseFloat(apr)}
          newReserveRatio={newReserveRatio}
          reserveRatioChanged={reserveRatioChanged}
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
