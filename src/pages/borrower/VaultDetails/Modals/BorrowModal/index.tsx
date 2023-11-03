import { Modal } from "../../../../../components/ui-components"

export const BorrowModal = () => (
  <Modal buttonName="Borrow" buttonColor="green" buttonClassName="w-64" sign>
    <div>
      <div className="text-base font-bold px-8 w-100 text-center">
        You are borrowing from your market.
      </div>

      <div className="w-full border border-tint-10 my-3" />

      <div className="flex flex-col items-center gap-y-5 px-8">
        <div className="w-72 font-light text-xxs text-center">
          You are borrowing the following amount from the market and
          transferring it into your wallet:
        </div>
        <div className="w-72 font-bold text-xxs text-center">XX DAI</div>
        <div className="w-72 font-light text-xxs text-center">
          After this, your remaining borrowable amount becomes:
        </div>
        <div className="w-72 font-bold text-xxs text-center">YY DAI</div>
        <div className="w-72 font-light text-xxs text-center">
          NOTE: this text needs to change if trying to borrow too much.
        </div>
      </div>
    </div>
  </Modal>
)
