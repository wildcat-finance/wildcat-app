import React, { ChangeEvent, useEffect, useState } from "react"

import { TokenAmount } from "@wildcatfi/wildcat-sdk"
import { parseUnits } from "ethers/lib/utils"
import { Button } from "../../../../components/ui-components"
import { AdjustMaximumCapacityModal } from "../Modals"
import { useSetMaxTotalSupply } from "../hooks/useVaultDetailActions"
import { AdjustMaximumCapacityProps } from "./interface"
import {
  MARKET_PARAMS_DECIMALS,
  TOKEN_FORMAT_DECIMALS,
} from "../../../../utils/formatters"
import { DetailsInput } from "../../../../components/ui-components/DetailsInput"

const AdjustMaximumCapacity = ({
  marketAccount,
}: AdjustMaximumCapacityProps) => {
  const [isModalOpen, setModalOpen] = useState(false)
  const { mutate, isLoading, isSuccess } = useSetMaxTotalSupply(marketAccount)
  const [newMaxTotalSupply, setNewMaxTotalSupply] = useState("")
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
      setNewMaxTotalSupply("")
      onModalClose()
    }
  }, [isSuccess])

  const newMaxTotalSupplyAmount = new TokenAmount(
    parseUnits(newMaxTotalSupply || "0", market.underlyingToken.decimals),
    market.underlyingToken,
  )

  const marketDisabled = marketAccount.market.isClosed
  const disabled =
    marketDisabled ||
    !!error ||
    isLoading ||
    newMaxTotalSupplyAmount.raw.isZero()

  return (
    <>
      <DetailsInput
        decimalScale={MARKET_PARAMS_DECIMALS.maxTotalSupply}
        className="w-full"
        placeholder="00,000.00"
        min={0}
        onChange={handleMaxTotalSupplyChange}
        value={newMaxTotalSupply}
        market={market}
        helperText="Current Capacity"
        helperValue={`${market.maxTotalSupply.format(TOKEN_FORMAT_DECIMALS)} ${
          market.underlyingToken.symbol
        }`}
        errorText={error}
      />

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
        marketSymbol={market.underlyingToken.symbol}
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
