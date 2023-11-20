import { ChangeEvent, useEffect, useState } from "react"

import { CloseMarketStatus } from "@wildcatfi/wildcat-sdk"
import { Button, NumberInput } from "../../../../components/ui-components"
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

const AdjustAPR = ({ marketAccount }: AdjustAprProps) => {
  const [isModalOpen, setModalOpen] = useState(false)
  const {
    mutate,
    isLoading: adjustAprLoading,
    isSuccess,
  } = useAdjustAPR(marketAccount)
  const { mutate: terminateMarket, isLoading: terminateMarketLoading } =
    useTerminateMarket(marketAccount)
  const { mutateAsync: processUnpaidWithdrawalBatch, isLoading: isProcessing } =
    useProcessUnpaidWithdrawalBatch(marketAccount.market)
  const { mutateAsync: approve, isLoading: isApproving } = useApprove(
    marketAccount.market.underlyingToken,
    marketAccount.market,
  )
  const [apr, setApr] = useState("0")
  const [newReserveRatio, setNewReserveRatio] = useState<number | undefined>()
  const [isTerminating, setIsTerminating] = useState(false)

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
        .catch((err) => {})
    } else if (terminateMarketStep.status === "UnpaidWithdrawalBatches") {
      const { length } = market.unpaidWithdrawalBatchExpiries
      processUnpaidWithdrawalBatch()
        .then(() => {
          if (length > 1) {
            toastifyInfo(
              `Need to process ${
                length - 1
              } unpaid withdrawal batches before closing market`,
            )
          }
        })
        .catch((err) => {})
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
      setApr("0")
      onModalClose()
    }
  }, [isSuccess])

  const reserveRatioChanged =
    newReserveRatio !== null && market.reserveRatioBips !== newReserveRatio
  const isLoading =
    adjustAprLoading || terminateMarketLoading || isProcessing || isApproving
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

        <Button
          variant={terminateButtonColor}
          className="w-44 px-2 whitespace-nowrap"
          disabled={isLoading}
          onClick={handleTerminateMarket}
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
