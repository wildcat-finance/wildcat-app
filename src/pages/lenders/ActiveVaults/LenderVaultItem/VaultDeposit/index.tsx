import { Button, NumberInput } from "../../../../../components/ui-components"

export function VaultDeposit({
  nextStep,
}: {
  nextStep?: () => void
  previousStep?: () => void
}) {
  return (
    <>
      {/* <div className="flex-col items-center justify-center"> */}
      <div className="px-5">
        <div className="w-full flex justify-between items-center">
          <div className="font-bold">Deposit</div>
          <div className="flex gap-x-3.5 w-full max-w-lg">
            <NumberInput className="w-full" placeholder="00,000.00" />
            <div className="flex flex-col">
              <Button variant="green" className="w-44">
                Deposit
              </Button>
            </div>
          </div>
        </div>
        <div className="text-xxs text-right mt-1.5 mr-48">
          <span className="font-semibold">Deposit up to </span>
          25,000 DAI
        </div>
      </div>

      <div className="px-5">
        <div className="w-full flex justify-between items-center">
          <div className="font-bold">Withdraw</div>
          <div className="flex gap-x-3.5 w-full max-w-lg">
            <div className="flex flex-1 flex-col items-end">
              <NumberInput className="w-full" placeholder="00,000.00" />
              <div className="text-xxs text-right">
                <span className="font-semibold">Deposit up to </span>
                25,000 DAI
              </div>
            </div>

            <div className="flex flex-col justify-between">
              <Button variant="green" className="w-44">
                Withdraw
              </Button>
              <Button variant="green" className="w-44">
                Claim from Vault
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  )
}
