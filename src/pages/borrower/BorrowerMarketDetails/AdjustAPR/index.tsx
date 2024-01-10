import { ChangeEvent, useEffect, useState } from "react"

import { Button } from "../../../../components/ui-components"
import { AdjustAPRModal } from "../Modals"
import {
  useApprove,
  useAdjustAPR,
  useTerminateMarket,
  useProcessUnpaidWithdrawalBatch,
  useResetReserveRatio,
} from "../hooks/useVaultDetailActions"
import { AdjustAprProps } from "./interface"
import { MARKET_PARAMS_DECIMALS } from "../../../../utils/formatters"
import { DetailsInput } from "../../../../components/ui-components/DetailsInput"
import { SDK_ERRORS_MAPPING } from "../../../../utils/forms/errors"
import { useTransactionWait } from "../../../../store/useTransactionWait"

const AdjustAPR = ({ marketAccount }: AdjustAprProps) => {
  const [isModalOpen, setModalOpen] = useState(false)
  const {
    mutateAsync: mutate,
    isLoading: adjustAprLoading,
    isSuccess,
  } = useAdjustAPR(marketAccount)
  const { isLoading: terminateMarketLoading } =
    useTerminateMarket(marketAccount)
  const { isLoading: isProcessing } =
    useProcessUnpaidWithdrawalBatch(marketAccount)
  const { isLoading: isApproving } = useApprove(
    marketAccount.market.underlyingToken,
    marketAccount.market,
  )
  const { mutateAsync: reset } = useResetReserveRatio(
    marketAccount,
    marketAccount.market.controller,
  )

  const [apr, setApr] = useState("")
  const [newReserveRatio, setNewReserveRatio] = useState<number | undefined>()
  const { isTxInProgress, setisTxInProgress } = useTransactionWait()

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
      setError(SDK_ERRORS_MAPPING.setApr[checkAPRStep.status])
      setNewReserveRatio(undefined)
      return
    }

    setError(undefined)
    const temporaryReserveRatioForChange =
      market.getReserveRatioForNewAPR(parsedNewApr)
    setNewReserveRatio(temporaryReserveRatioForChange)
  }

  const handleAdjustAPR = () => {
    setModalOpen(false)
    setisTxInProgress(true)
    if (!error)
      mutate(parseFloat(apr))
        .finally(() => setisTxInProgress(false))
        .catch((e) => {
          console.log(e)
        })
  }

  const handleResetReserveRatio = () => {
    setisTxInProgress(true)
    reset()
      .finally(() => setisTxInProgress(false))
      .catch((e) => {
        console.log(e)
      })
  }

  const onModalClose = () => {
    setModalOpen(false)
  }

  useEffect(() => {
    if (isSuccess) {
      setApr("")
      onModalClose()
    }
  }, [isSuccess])

  const marketDisabled = marketAccount.market.isClosed
  const reserveRatioChanged =
    newReserveRatio !== null && market.reserveRatioBips !== newReserveRatio
  const isLoading =
    adjustAprLoading || terminateMarketLoading || isProcessing || isApproving
  const disabledApr =
    marketDisabled ||
    !apr ||
    parseFloat(apr) <= 0 ||
    !!error ||
    isLoading ||
    isTxInProgress

  return (
    <>
      <DetailsInput
        decimalScale={MARKET_PARAMS_DECIMALS.annualInterestBips}
        className="w-full"
        placeholder="00.00"
        value={apr}
        onChange={handleAprChange}
        error={!!error}
        market={market}
        helperText="Current Base Rate"
        helperValue={`${market.annualInterestBips / 100}%`}
        errorText={error}
        disabled={isTxInProgress}
      />

      <div className="w-44 flex flex-col gap-y-1.5">
        <Button
          variant="green"
          onClick={() => setModalOpen(true)}
          disabled={disabledApr}
        >
          Adjust
        </Button>

        <Button
          className="w-44 px-2 whitespace-nowrap"
          variant="green"
          onClick={handleResetReserveRatio}
        >
          Reset Reserve Ratio
        </Button>
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
