import { useNavigate, useParams } from "react-router-dom"

import { Paper, Spinner } from "../../../components/ui-components"
import { ServiceAgreementCard } from "../../../components/ServiceAgreementCard"

import { BackArrow } from "../../../components/ui-components/icons/index"

import { RemoveLendersModal, NewLendersModal } from "./Modals"
import { useGetMarket } from "../../../hooks/useGetMarket"
import { useGetMarketAccountForBorrowerLegacy } from "../../../hooks/useGetMarketAccount"
import BorrowAssets from "./BorrowAssets"
import Repay from "./Repay"
import AdjustAPR from "./AdjustAPR"
import LenderWithdrawalRequests from "./LenderWithdrawalRequests"
import PaymentHistory from "../../../components/PaymentHistory"
import BorrowerMarketOverview from "./BorrowerMarketOverview"
import { AuthorisedLendersList } from "./AuthorisedLendersList"
import AdjustMaximumCapacity from "./AdjustMaximumCapacity"

const VaultDetails = () => {
  const navigate = useNavigate()
  const { marketAddress } = useParams()
  const { data: market, isInitialLoading: isMarketLoading } = useGetMarket({
    marketAddress,
  })

  const { data: marketAccount } = useGetMarketAccountForBorrowerLegacy(market)

  const handleClickMyVaults = () => {
    navigate("/borrower/my-vaults")
  }

  const isLoading = isMarketLoading

  if (isLoading) {
    return <Spinner isLoading={isLoading} />
  }

  if (!market || !marketAccount) {
    return <Spinner isLoading={isLoading} />
  }

  return (
    <div>
      <button
        className="flex items-center gap-x-2 mb-8 px-0"
        onClick={handleClickMyVaults}
      >
        <BackArrow />
        <p className="text-xs font-normal underline">My Markets</p>
      </button>
      <div className="text-green text-2xl font-bold mb-8 w-2/3">
        {market.name}
      </div>
      <Paper className="flex flex-col gap-y-5 border-0 px-6 py-5 mb-14 bg-tint-10 border-tint-8 rounded-3xl">
        <div>
          <div className="w-full flex justify-between items-center">
            <div className="font-bold">Borrow Assets</div>
            <div className="flex gap-x-3.5 w-full max-w-lg">
              <BorrowAssets
                borrowableAssets={market.borrowableAssets}
                marketAccount={marketAccount}
              />
            </div>
          </div>
        </div>
        <div>
          <div className="w-full flex justify-between">
            <div className="font-bold mt-3">Repay Debt</div>
            <div className="flex items-center gap-x-3.5 w-full max-w-lg">
              <Repay marketAccount={marketAccount} />
            </div>
          </div>
        </div>
        <div>
          <div className="w-full flex justify-between">
            <div className="font-bold mt-3">Adjust Lender APR</div>
            <div className="flex items-center gap-x-3.5 w-full max-w-lg">
              <AdjustAPR marketAccount={marketAccount} />
            </div>
          </div>
        </div>
        <div>
          <div className="w-full flex justify-between">
            <div className="font-bold mt-3">Adjust Maximum Capacity</div>
            <div className="flex gap-x-3.5 w-full max-w-lg">
              <AdjustMaximumCapacity marketAccount={marketAccount} />
            </div>
          </div>
        </div>
      </Paper>

      <BorrowerMarketOverview market={market} />

      <LenderWithdrawalRequests market={market} />
      <PaymentHistory market={market} />

      <div className="flex w-full justify-between content-center">
        <div className="text-base font-bold">Authorised Lenders</div>
        <div className="flex gap-x-2">
          <NewLendersModal market={market} />
          <RemoveLendersModal market={market} />
        </div>
      </div>
      <div className="mt-5 mb-14">
        <AuthorisedLendersList marketAddress={market.address} />
      </div>

      <ServiceAgreementCard
        className="mt-10"
        title="Wildcat Service Agreement"
        description="You agreed to the Wildcat Service Agreement on 12-Sept-2023"
      />
    </div>
  )
}

export default VaultDetails
