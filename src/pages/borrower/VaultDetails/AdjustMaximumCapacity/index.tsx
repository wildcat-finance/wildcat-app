import React, { ChangeEvent, useEffect, useState } from "react"

import { TokenAmount } from "@wildcatfi/wildcat-sdk"
import { parseUnits } from "ethers/lib/utils"
import { Button, NumberInput } from "../../../../components/ui-components"
import { AdjustMaximumCapacityModal } from "../Modals"
import { useSetMaxTotalSupply } from "../hooks/useVaultDetailActions"
import { AdjustMaximumCapacityProps } from "./interface"
import {
  MARKET_PARAMS_DECIMALS,
  TOKEN_FORMAT_DECIMALS,
} from "../../../../utils/formatters"

const AdjustMaximumCapacity = ({
  marketAccount,
}: AdjustMaximumCapacityProps) => {
  const [isModalOpen, setModalOpen] = useState(false)
  const { mutate, isLoading, isSuccess } = useSetMaxTotalSupply(marketAccount)
  const [newMaxTotalSupply, setNewMaxTotalSupply] = useState("0")
  const [error, setError] = useState<string | undefined>()

  const { market } = marketAccount

  const handleMaxTotalSupplyChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target
    setNewMaxTotalSupply(value)

    if (value === "" || value === "0") {
      setError(undefined)
      return
    }

    const newMaxTotalSupplyAmount = new TokenAmount(
      parseUnits(value, market.underlyingToken.decimals),
      market.underlyingToken,
    )

    if (newMaxTotalSupplyAmount.lte(market.totalSupply)) {
      setError("Maximum capacity must be greater than total supply")
    } else {
      setError(undefined)
    }
  }

  const handleAdjustMaxTotalSupply = () => {
    if (!error) mutate(newMaxTotalSupply)
  }

  const onModalClose = () => {
    setModalOpen(false)
  }

  useEffect(() => {
    if (isSuccess) {
      setNewMaxTotalSupply("0")
      onModalClose()
    }
  }, [isSuccess])

  const newMaxTotalSupplyAmount = new TokenAmount(
    parseUnits(newMaxTotalSupply || "0", market.underlyingToken.decimals),
    market.underlyingToken,
  )

  const disabled = !!error || isLoading || newMaxTotalSupplyAmount.raw.isZero()

  return (
    <>
      <div className="w-full">
        <NumberInput
          decimalScale={MARKET_PARAMS_DECIMALS.maxTotalSupply}
          className="w-full"
          placeholder="10.00"
          min={0}
          onChange={handleMaxTotalSupplyChange}
          value={newMaxTotalSupply}
        />

        <div className="flex justify-between items-start text-xxs text-right mt-1.5 mr-auto pr-1.5 w-full">
          <div className="w-36">
            {error && (
              <div className="text-red-error text-xxs text-left">{error}</div>
            )}
          </div>
          <div>
            <span className="font-semibold">Current Capacity:</span>{" "}
            {market.maxTotalSupply.format(TOKEN_FORMAT_DECIMALS)}{" "}
            {market.underlyingToken.symbol}
          </div>
        </div>
      </div>

      <div className="w-44 flex flex-col gap-y-1.5">
        <Button
          variant="green"
          className="w-44"
          onClick={() => setModalOpen(true)}
          disabled={disabled}
        >
          Adjust
        </Button>
      </div>

      <AdjustMaximumCapacityModal
        isOpen={isModalOpen}
        onClose={onModalClose}
        isLoading={isLoading}
        currentMaxTotalSupply={market.maxTotalSupply}
        newtMaxTotalSupply={newMaxTotalSupplyAmount}
        adjustMaxTotalSupply={handleAdjustMaxTotalSupply}
      />
    </>
  )
}

export default AdjustMaximumCapacity
