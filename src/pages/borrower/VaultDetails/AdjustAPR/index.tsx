import React, { ChangeEvent, useEffect, useState } from "react"

import { TokenAmount } from "@wildcatfi/wildcat-sdk"
import { Button, NumberInput } from "../../../../components/ui-components"
import { AdjustAPRModal } from "../Modals"
import {
  useApprove,
  useAdjustAPR,
  useTerminateMarket,
} from "../hooks/useVaultDetailActions"
import { AdjustAprProps } from "./interface"
import {
  MARKET_PARAMS_DECIMALS,
  TOKEN_FORMAT_DECIMALS,
} from "../../../../utils/formatters"
import { toastifyError, toastifyInfo } from "../../../../components/toasts"

const AdjustAPR = ({ marketAccount }: AdjustAprProps) => {
  const [isModalOpen, setModalOpen] = useState(false)
  const {
    mutate,
    isLoading: adjustAprLoading,
    isSuccess,
  } = useAdjustAPR(marketAccount)
  const { mutate: terminateMarket, isLoading: terminateMarketLoading } =
    useTerminateMarket(marketAccount)
  const { mutateAsync: approve, isLoading: isApproving } = useApprove(
    marketAccount.market.underlyingToken,
    marketAccount.market,
  )
  const [apr, setApr] = useState("0")
  const [newReserveRatio, setNewReserveRatio] = useState<number | undefined>()
  const [allowanceRemainder, setAllowanceRemainder] =
    useState<TokenAmount | null>(null)
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

  const handleApprove = async () => {
    if (allowanceRemainder) {
      await approve(allowanceRemainder).then(() => {
        setAllowanceRemainder(null)
      })
    }
  }

  const handleTerminateMarket = () => {
    const terminateMarketStep = marketAccount.checkCloseMarketStep()

    if (terminateMarketStep.status === "InsufficientAllowance") {
      toastifyInfo(
        `Need to approve ${terminateMarketStep.remainder.format(
          TOKEN_FORMAT_DECIMALS,
          true,
        )} `,
      )
      setAllowanceRemainder(terminateMarketStep.remainder)
    } else if (terminateMarketStep.status !== "Ready") {
      toastifyError(terminateMarketStep.status)
    } else {
      terminateMarket()
    }
  }

  const onModalClose = () => {
    setModalOpen(false)
  }

  useEffect(() => {
    if (isSuccess) {
      setApr("0")
      onModalClose()
    }
  }, [isSuccess])

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
        <Button
          variant="green"
          onClick={() => setModalOpen(true)}
          disabled={disabledApr}
        >
          Adjust
        </Button>

        {allowanceRemainder ? (
          <Button
            variant="green"
            className="w-44 px-2 whitespace-nowrap"
            onClick={handleApprove}
            disabled={isApproving}
          >
            Approve
          </Button>
        ) : (
          <Button
            variant="red"
            className="w-44 px-2 whitespace-nowrap"
            disabled={isLoading}
            onClick={handleTerminateMarket}
          >
            Terminate Market
          </Button>
        )}
      </div>

      <AdjustAPRModal
        isOpen={isModalOpen}
        onClose={onModalClose}
        adjustAPR={handleAdjustAPR}
        currentAPR={market.annualInterestBips / 100}
        newAPR={parseFloat(apr)}
        newReserveRatio={newReserveRatio}
        reserveRatioChanged={reserveRatioChanged}
        isLoading={isLoading}
      />
    </>
  )
}

export default AdjustAPR
