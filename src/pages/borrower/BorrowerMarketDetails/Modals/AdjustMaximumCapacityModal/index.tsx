import { Modal } from "../../../../../components/ui-components"
import { AdjustMaximumCapacityModalProps } from "./interface"
import { TOKEN_FORMAT_DECIMALS } from "../../../../../utils/formatters"

export const AdjustMaximumCapacityModal = ({
  marketSymbol,
  onClose,
  isOpen = false,
  currentMaxTotalSupply,
  newtMaxTotalSupply,
  isLoading,
  adjustMaxTotalSupply,
}: AdjustMaximumCapacityModalProps) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    onClick={adjustMaxTotalSupply}
    isLoading={isLoading}
    firstBtnText="Confirm"
  >
    <div>
      <div className="text-base font-bold px-8 w-80 text-center">
        You are changing your maximum market capacity.
      </div>

      <div className="w-full border border-tint-10 my-3" />

      <div className="flex flex-col items-center gap-y-5 px-8">
        <div className="w-72 font-light text-xxs text-center">
          By confirming this transaction, you are changing the maximum amount of
          deposits you are comfortable paying interest on from:
        </div>
        <div className="w-72 font-bold text-xxs text-center">
          {currentMaxTotalSupply.format(TOKEN_FORMAT_DECIMALS)} {marketSymbol}{" "}
          to {newtMaxTotalSupply.format(TOKEN_FORMAT_DECIMALS)} {marketSymbol}
        </div>
      </div>
    </div>
  </Modal>
)
