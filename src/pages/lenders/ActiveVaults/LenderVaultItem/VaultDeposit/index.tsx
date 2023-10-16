import { Button, NumberInput } from "../../../../../components/ui-components";

export const VaultDeposit = () => {
  return (
    <>
      <div className="px-5">
        <div className="w-full flex justify-between items-center">
          <div className="font-bold">Deposit</div>
          <div className="flex gap-x-3.5 w-full max-w-lg">
            <NumberInput className="w-full" placeholder="00,000.00" />
            <Button variant={"green"} className="w-64">
              Borrow
            </Button>
          </div>
        </div>
        <div className="text-xxs text-right mt-1.5 mr-48">
          <span className="font-semibold">Deposit up to </span>
          25,000 DAI
        </div>
      </div>
    </>
  );
};
