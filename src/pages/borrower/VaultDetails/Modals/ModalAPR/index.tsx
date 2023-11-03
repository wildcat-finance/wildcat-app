import { Modal } from "../../../../../components/ui-components"

export const ModalAPR = () => (
  <Modal buttonName="Adjust" buttonColor="green" sign>
    <div>
      <div className="text-base font-bold px-8 w-80 text-center">
        You are changing your lender APR from 0.00% to 0.00%.
      </div>

      <div className="w-full border border-tint-10 my-3" />

      <div className="flex flex-col items-center gap-y-5 px-8">
        <div className="w-72 font-light text-xxs text-center">
          Some text about what you are about to get yourself into and can you
          fulfill the params of doing this and make the text nice and
          descriptive but not too waffly.
        </div>
      </div>
    </div>
  </Modal>
)
