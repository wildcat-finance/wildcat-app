import { useState } from "react"
import { Button, FormItem, Modal } from "../../../../components/ui-components"
import { MarketPreviewModalProps } from "./interface"

export const MarketPreviewModal = ({
  getValues,
  selectedVaultType,
  token,
  handleSubmit,
  disabled,
  validateForm,
  isDeploying,
}: MarketPreviewModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpen = async () => {
    const isValid = await validateForm()

    if (isValid) {
      setIsModalOpen(true)
    }
  }

  const onClose = () => setIsModalOpen(false)

  return (
    <>
      <Button
        variant="blue"
        className="mt-6"
        onClick={handleOpen}
        disabled={disabled}
      >
        Submit and Create Market
      </Button>

      {isModalOpen && (
        <Modal
          sign={handleSubmit}
          isOpen={isModalOpen}
          onClose={onClose}
          isLoading={isDeploying}
          loadingText="Deploying ..."
        >
          <div className="text-center text-base font-bold">
            Pending Market Details
          </div>
          <div className="w-full border border-tint-10 my-6" />
          <div className="grid grid-rows-5 grid-cols-2 gap-x-8 gap-y-7 px-8">
            <FormItem label="Market Type">
              <input
                className="w-44 h-8 px-3 py-3 text-xxs bg-tint-7.5 border border-tint-8.5 text-black"
                value={selectedVaultType}
                disabled
              />
            </FormItem>
            <FormItem label="Underlying Asset">
              <input
                className="w-44 h-8 px-3 py-3 text-xxs bg-tint-7.5 border border-tint-8.5 text-black"
                value={token?.symbol}
                disabled
              />
            </FormItem>
            <FormItem label="Market Token Name">
              <input
                className="w-44 h-8 px-3 py-3 text-xxs bg-tint-7.5 border border-tint-8.5 text-black"
                value={getValues("namePrefix")}
                disabled
              />
            </FormItem>
            <FormItem label="Market Token Symbol">
              <input
                className="w-44 h-8 px-3 py-3 text-xxs bg-tint-7.5 border border-tint-8.5 text-black"
                value={getValues("symbolPrefix")}
                disabled
              />
            </FormItem>
            <FormItem label="Market Capacity">
              <input
                className="w-44 h-8 px-3 py-3 text-xxs bg-tint-7.5 border border-tint-8.5 text-black"
                value={`${getValues("maxTotalSupply")} ${token?.symbol}`}
                disabled
              />
            </FormItem>
            <FormItem label="Minimum Reserve Ratio">
              <input
                className="w-44 h-8 px-3 py-3 text-xxs bg-tint-7.5 border border-tint-8.5 text-black"
                value={`${getValues("reserveRatioBips")}%`}
                disabled
              />
            </FormItem>
            <FormItem label="APR">
              <input
                className="w-44 h-8 px-3 py-3 text-xxs bg-tint-7.5 border border-tint-8.5 text-black"
                value={`${getValues("annualInterestBips")}%`}
                disabled
              />
            </FormItem>
            <FormItem label="Penalty Rate">
              <input
                className="w-44 h-8 px-3 py-3 text-xxs bg-tint-7.5 border border-tint-8.5 text-black"
                value={`${getValues("delinquencyFeeBips")}%`}
                disabled
              />
            </FormItem>
            <FormItem label="Grace Period Duration">
              <input
                className="w-44 h-8 px-3 py-3 text-xxs bg-tint-7.5 border border-tint-8.5 text-black"
                value={`${getValues("delinquencyGracePeriod")} Hours`}
                disabled
              />
            </FormItem>
            <FormItem label="Withdrawal Cycle Duration">
              <input
                className="w-44 h-8 px-3 py-3 text-xxs bg-tint-7.5 border border-tint-8.5 text-black"
                value={`${getValues("withdrawalBatchDuration")} Hours`}
                disabled
              />
            </FormItem>
          </div>
          <div className="w-full border border-tint-10 mt-9 mb-3.5" />
          <div className="w-72 m-auto leading-3 font-light text-xxs text-center">
            Please review your market parameters before confirming creation.
            Note that once your market is created, you will only be able to
            adjust your APR and market capacity.
          </div>
        </Modal>
      )}
    </>
  )
}
