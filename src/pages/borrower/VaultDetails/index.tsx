import { useNavigate, useParams } from "react-router-dom"

import { useMemo } from "react"
import { TokenAmount } from "@wildcatfi/wildcat-sdk"
import { parseUnits } from "ethers/lib/utils"
import {
  Paper,
  Table,
  TableRow,
  TableCell,
  NumberInput,
  Spinner,
} from "../../../components/ui-components"
import { ServiceAgreementCard } from "../../../components/ServiceAgreementCard"

import { BackArrow } from "../../../components/ui-components/icons/index"

import { RemoveLendersModal, CapacityModal, NewLendersModal } from "./Modals"
import {
  useGetMarket,
  useGetMarketAccountForBorrowerLegacy,
} from "../../../hooks/useGetMarket"
import {
  MARKET_PARAMS_DECIMALS,
  TOKEN_FORMAT_DECIMALS,
} from "../../../utils/formatters"
import BorrowAssets from "./BorrowAssets"
import Repay from "./Repay"
import AdjustAPR from "./AdjustAPR"
import LenderWithdrawalRequests from "./LenderWithdrawalRequests"
import PaymentHistory from "../../../components/PaymentHistory"
import { useGetAuthorisedLenders } from "./hooks/useGetAuthorisedLenders"
import BorrowerMarketOverview from "./BorrowerMarketOverview"

const VaultDetails = () => {
  const navigate = useNavigate()
  const { marketAddress } = useParams()
  const { data: market, isLoadingInitial: isMarketLoading } =
    useGetMarket(marketAddress)

  // Temp solution to keep object the same
  // and prevent Loader blinking
  const memoisedMarket = useMemo(() => market, [market?.address])

  const { data: marketAccount, isLoading: isMarketAccountLoading } =
    useGetMarketAccountForBorrowerLegacy(memoisedMarket)
  const { data: authorisedLenders } = useGetAuthorisedLenders(marketAddress)

  const handleClickMyVaults = () => {
    navigate("/borrower/my-vaults")
  }

  const isLoading = isMarketLoading || isMarketAccountLoading

  if (isLoading) {
    return <Spinner isLoading={isLoading} />
  }

  if (!market || !marketAccount) {
    return <div>Market not found</div>
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
          <div className="text-xxs text-right mt-1.5 mr-48">
            <span className="font-semibold">Available To Borrow:</span>{" "}
            {market.borrowableAssets.format(TOKEN_FORMAT_DECIMALS, true)}
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
          <div className="w-full flex justify-between items-center">
            <div className="font-bold">Adjust Maximum Capacity</div>
            <div className="flex gap-x-3.5 w-full max-w-lg">
              <NumberInput
                decimalScale={MARKET_PARAMS_DECIMALS.maxTotalSupply}
                className="w-full"
                placeholder="10.00"
                min={0}
              />
              <CapacityModal />
            </div>
          </div>
          <div className="text-xxs text-right mt-1.5 mr-48">
            <span className="font-semibold">Current Capacity:</span>{" "}
            {market.maxTotalSupply.format(TOKEN_FORMAT_DECIMALS)}{" "}
            {market.underlyingToken.symbol}
          </div>
        </div>
      </Paper>

      <BorrowerMarketOverview market={market} />

      <LenderWithdrawalRequests market={market} />
      <PaymentHistory market={market} />

      <div className="flex w-full justify-between content-center">
        <div className="text-base font-bold">Authorised Lenders</div>
        <div className="flex gap-x-2">
          <NewLendersModal market={marketAddress!} />
          <RemoveLendersModal market={marketAddress!} />
        </div>
      </div>
      <div className="mt-5 mb-14">
        <Table
          headers={[
            {
              title: "Name",
              align: "start",
              className: "w-44",
            },
            {
              title: "Wallet Address",
              align: "start",
            },
            {
              title: "",
              align: "start",
              className: "w-24",
            },
          ]}
        >
          {authorisedLenders?.map((lender) => (
            <TableRow key={lender.lender}>
              <TableCell justify="start">{}</TableCell>
              <TableCell justify="start">{lender.lender}</TableCell>
              <TableCell justify="center">{}</TableCell>
            </TableRow>
          ))}
        </Table>
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
