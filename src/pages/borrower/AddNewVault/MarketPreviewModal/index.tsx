import { useState } from "react"
import { Button, FormItem, Modal } from "../../../../components/ui-components"
import { MarketPreviewModalProps } from "./interface"

export const MarketPreviewModal = ({
  newMarketParams,
  token,
  handleSubmit,
  isDeploying,
}: MarketPreviewModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const onClose = () => setIsModalOpen(false)

  return (
    <>
      <Button
        variant="blue"
        className="mt-10"
        onClick={() => setIsModalOpen(true)}
        disabled={isDeploying}
      >
        Submit and Create Market
      </Button>

      <Modal sign={handleSubmit} isOpen={isModalOpen} onClose={onClose}>
        <div className="text-center text-base font-bold">
          Pending Market Details
        </div>
        <div className="w-full border border-tint-10 my-6" />
        <div className="grid grid-rows-5 grid-cols-2 gap-x-8 gap-y-7 px-8">
          <FormItem label="Market Type">
            <input
              className="w-44 h-8 px-3 py-3 text-xxs bg-tint-7.5 border border-tint-8.5 text-black"
              value={newMarketParams.vaultType}
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
              value={newMarketParams.namePrefix}
              disabled
            />
          </FormItem>
          <FormItem label="Market Token Symbol">
            <input
              className="w-44 h-8 px-3 py-3 text-xxs bg-tint-7.5 border border-tint-8.5 text-black"
              value={newMarketParams.symbolPrefix}
              disabled
            />
          </FormItem>
          <FormItem label="Market Capacity">
            <input
              className="w-44 h-8 px-3 py-3 text-xxs bg-tint-7.5 border border-tint-8.5 text-black"
              value={`${newMarketParams.maxTotalSupply} ${token?.symbol}`}
              disabled
            />
          </FormItem>
          <FormItem label="Minimum Reserve Ratio">
            <input
              className="w-44 h-8 px-3 py-3 text-xxs bg-tint-7.5 border border-tint-8.5 text-black"
              value={`${newMarketParams.reserveRatioBips}%`}
              disabled
            />
          </FormItem>
          <FormItem label="APR">
            <input
              className="w-44 h-8 px-3 py-3 text-xxs bg-tint-7.5 border border-tint-8.5 text-black"
              value={`${newMarketParams.annualInterestBips}%`}
              disabled
            />
          </FormItem>
          <FormItem label="Penalty Rate">
            <input
              className="w-44 h-8 px-3 py-3 text-xxs bg-tint-7.5 border border-tint-8.5 text-black"
              value={`${newMarketParams.delinquencyFeeBips}%`}
              disabled
            />
          </FormItem>
          <FormItem label="Grace Period Duration">
            <input
              className="w-44 h-8 px-3 py-3 text-xxs bg-tint-7.5 border border-tint-8.5 text-black"
              value={`${newMarketParams.delinquencyGracePeriod} Hours`}
              disabled
            />
          </FormItem>
          <FormItem label="Withdrawal Cycle Duration">
            <input
              className="w-44 h-8 px-3 py-3 text-xxs bg-tint-7.5 border border-tint-8.5 text-black"
              value={`${newMarketParams.withdrawalBatchDuration} Hours`}
              disabled
            />
          </FormItem>
        </div>
        <div className="w-full border border-tint-10 mt-9 mb-3.5" />
        <div className="w-72 m-auto leading-3 font-light text-xxs text-center">
          Please review your market parameters before confirming creation. Note
          that once your market is created, you will only be able to adjust your
          APR and market capacity.
        </div>
      </Modal>
    </>
  )
}
