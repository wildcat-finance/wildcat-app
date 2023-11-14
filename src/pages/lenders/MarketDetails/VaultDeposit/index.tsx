import { Button, NumberInput } from "../../../../components/ui-components"
import { MarketProps } from "../VaultInfo/interface"

export function VaultDeposit({ market }: MarketProps) {
  return (
    <div className="rounded-2xl bg-tint-10">
      <div className="px-5 pt-8 pb-12">
        <div className="w-full flex justify-between items-center">
          <div className="font-bold">Deposit</div>
          <div className="flex gap-x-3.5 w-full max-w-lg">
            <NumberInput className="w-full" placeholder="00,000.00" />
            <div className="flex flex-col">
              <Button variant="green" className="w-36">
                Deposit
              </Button>
            </div>
          </div>
        </div>
        <div className="text-xxs text-right mt-1.5 mr-40">
          <span className="font-semibold">Deposit up to </span>
          {market.underlyingToken.symbol}
        </div>
      </div>

      <div className="px-5 rounded-2xl">
        <div className="w-full flex justify-between items-center pb-5">
          <div className="font-bold">Withdraw</div>
          <div className="flex gap-x-3.5 w-full max-w-lg">
            <div className="flex flex-1 flex-col items-end">
              <NumberInput className="w-full" placeholder="00,000.00" />
              <div className="text-xxs text-right mt-1.5 flex-col flex">
                <p className="mb-3.5">
                  <span className="font-semibold">Withdraw up to </span>
                  {market.underlyingToken.symbol}
                </p>
                <p>
                  <span className="font-semibold">
                    WReserved assets awaiting cycle:{" "}
                  </span>
                  {market.underlyingToken.symbol}
                </p>
                <p className="mb-3.5">
                  <span className="font-semibold">Pending withdrawals: </span>
                  {market.underlyingToken.symbol}
                </p>
                <p>
                  <span className="font-semibold">Claimable from vault: </span>
                  {market.underlyingToken.symbol}
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-between">
              <Button variant="green" className="w-36">
                Withdraw
              </Button>
              <Button variant="green" className="w-36">
                Claim from Vault
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}