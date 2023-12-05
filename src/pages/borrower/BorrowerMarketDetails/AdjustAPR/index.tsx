import { ChangeEvent, useEffect, useState } from "react"

import { CloseMarketStatus, minTokenAmount } from "@wildcatfi/wildcat-sdk"
import { Button } from "../../../../components/ui-components"
import { AdjustAPRModal } from "../Modals"
import {
  useApprove,
  useAdjustAPR,
  useTerminateMarket,
  useProcessUnpaidWithdrawalBatch,
} from "../hooks/useVaultDetailActions"
import { AdjustAprProps } from "./interface"
import {
  MARKET_PARAMS_DECIMALS,
  TOKEN_FORMAT_DECIMALS,
} from "../../../../utils/formatters"
import { toastifyError, toastifyInfo } from "../../../../components/toasts"
import { ButtonProps } from "../../../../components/ui-components/Button/interface"
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
  const { mutate: terminateMarket, isLoading: terminateMarketLoading } =
    useTerminateMarket(marketAccount)
  const {
    mutateAsync: repayAndProcessUnpaidWithdrawalBatch,
    isLoading: isProcessing,
  } = useProcessUnpaidWithdrawalBatch(marketAccount.market)
  const { mutateAsync: approve, isLoading: isApproving } = useApprove(
    marketAccount.market.underlyingToken,
    marketAccount.market,
  )
  const [apr, setApr] = useState("")
  const [newReserveRatio, setNewReserveRatio] = useState<number | undefined>()
  const [isTerminating, setIsTerminating] = useState(false)
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

  const terminateMarketStep = marketAccount.checkCloseMarketStep()

  const handleTerminateMarket = () => {
    if (!isTerminating) {
      setIsTerminating(true)
      if (terminateMarketStep.status === "InsufficientAllowance") {
        toastifyInfo(
          `Need to approve ${terminateMarketStep.remainder.format(
            TOKEN_FORMAT_DECIMALS,
            true,
          )} `,
        )
      } else if (terminateMarketStep.status === "UnpaidWithdrawalBatches") {
        toastifyInfo(
          `Need to process ${market.unpaidWithdrawalBatchExpiries.length} unpaid withdrawal batches before closing market`,
        )
      }
      return
    }

    if (terminateMarketStep.status === "InsufficientAllowance") {
      approve(terminateMarketStep.remainder)
        .then(() => {
          if (market.unpaidWithdrawalBatchExpiries.length) {
            toastifyInfo(
              `Need to process ${market.unpaidWithdrawalBatchExpiries.length} unpaid withdrawal batches before closing market`,
            )
          }
        })
        .catch(() => {})
    } else if (terminateMarketStep.status === "UnpaidWithdrawalBatches") {
      const { length } = market.unpaidWithdrawalBatchExpiries
      const repayAmount = minTokenAmount(
        market.outstandingDebt,
        market.underlyingToken.getAmount(marketAccount.underlyingApproval),
      )
      repayAndProcessUnpaidWithdrawalBatch({
        tokenAmount: repayAmount,
        maxBatches: length,
      })
    } else if (terminateMarketStep.status !== "Ready") {
      toastifyError(terminateMarketStep.status)
    } else {
      terminateMarket()
    }
  }

  const getButtonTextAndColor = (
    isActive: boolean,
    step: CloseMarketStatus,
  ): [string, ButtonProps["variant"]] => {
    if (isActive && step.status === "InsufficientAllowance") {
      return ["Approve", "green"]
    }
    if (isActive && step.status === "UnpaidWithdrawalBatches") {
      return ["Close Unpaid Batch", "green"]
    }
    return ["Terminate Market", "red"]
  }

  const [terminateButtonText, terminateButtonColor] = getButtonTextAndColor(
    isTerminating,
    terminateMarketStep,
  )

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
          variant={terminateButtonColor}
          className="w-44 px-2 whitespace-nowrap"
          onClick={handleTerminateMarket}
          disabled={marketDisabled || isLoading || isTxInProgress}
        >
          {terminateButtonText}
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
