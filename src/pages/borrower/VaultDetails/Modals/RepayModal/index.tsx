import { Modal } from "../../../../../components/ui-components"

export const RepayModal = () => (
  <Modal buttonName="Repay" buttonColor="green" buttonClassName="w-full" sign>
    <div>
      <div className="text-base font-bold px-8 w-80 text-center">
        You are repaying 0.00 DAI.
      </div>

      <div className="w-full border border-tint-10 my-3" />

      <div className="flex flex-col items-center gap-y-5 px-8">
        <div className="w-72 font-light text-xxs text-center">
          By confirming this transaction, you are transferring the below amount
          to the market reserves:
        </div>
        <div className="w-72 font-bold text-xxs text-center">XX DAI</div>
        <div className="w-72 font-light text-xxs text-center">
          Market reserves after this repayment will be:
        </div>
        <div className="w-72 font-bold text-xxs text-center">YY DAI</div>
      </div>
    </div>
  </Modal>
)
