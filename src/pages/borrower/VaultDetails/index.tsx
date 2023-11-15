import { useNavigate, useParams } from "react-router-dom"

import {
  Paper,
  TableItem,
  Table,
  TableRow,
  TableCell,
  NumberInput,
  Spinner,
} from "../../../components/ui-components"
import { ServiceAgreementCard } from "../../../components/ServiceAgreementCard"

import { BackArrow } from "../../../components/ui-components/icons/index"

import { RemoveLendersModal, CapacityModal, NewLendersModal } from "./Modals"
import { useGetMarket, useGetMarketAccount } from "./hooks/useGetMarket"
import {
  formatBps,
  formatSecsToHours,
  MARKET_PARAMS_DECIMALS,
  MARKET_PERCENTAGE_PARAM_DECIMALS,
  TOKEN_FORMAT_DECIMALS,
  trimAddress,
} from "../../../utils/formatters"
import BorrowAssets from "./BorrowAssets"
import Repay from "./Repay"
import AdjustAPR from "./AdjustAPR"
import LenderMarketDetails from "./LenderMarketDetails"
import PaymentHistory from "./PaymentHistory"
import { useGetAuthorisedLenders } from "./hooks/useGetAuthorisedLenders"
import { tableDataMock } from "../../../mocks/vaults"

const VaultDetails = () => {
  const navigate = useNavigate()
  const { marketAddress } = useParams()
  const { data: market, isLoading: isMarketLoading } =
    useGetMarket(marketAddress)
  const { data: marketAccount, isLoading: isMarketAccountLoading } =
    useGetMarketAccount(market)
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

  console.log("MARKET", marketAccount)

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

      <div>
        <div className="text-base font-bold">Market Details</div>
        <div className="flex w-full mt-5 mb-14">
          <div className="w-full">
            <TableItem
              title="Contract Address"
              value={trimAddress(market.address)}
              className="pl-6 pr-24"
            />
            <TableItem
              title="Maximum Capacity"
              value={`${market.maxTotalSupply.format(TOKEN_FORMAT_DECIMALS)} ${
                market.underlyingToken.symbol
              }`}
              className="pl-6 pr-24"
            />
            <TableItem
              title="Lender APR"
              value={`${formatBps(
                market.annualInterestBips,
                MARKET_PARAMS_DECIMALS.annualInterestBips,
              )}%`}
              className="pl-6 pr-24"
            />
            <TableItem
              title="Protocol Fee APR"
              value={`${formatBps(market.protocolFeeBips)}%`}
              className="pl-6 pr-24"
            />
            <TableItem
              title="Penalty Rate APR"
              value={`${formatBps(
                market.delinquencyFeeBips,
                MARKET_PARAMS_DECIMALS.delinquencyFeeBips,
              )}%`}
              className="pl-6 pr-24"
            />
            <TableItem
              title="Minimum Reserve Ratio"
              value={`${formatBps(
                market.reserveRatioBips,
                MARKET_PARAMS_DECIMALS.reserveRatioBips,
              )}%`}
              className="pl-6 pr-24"
            />
            <TableItem
              title="Withdrawal Cycle Duration"
              value={formatSecsToHours(market.pendingWithdrawalExpiry)}
              className="pl-6 pr-24"
            />
            <TableItem
              title="Maximum Grace Period"
              value={formatSecsToHours(market.delinquencyGracePeriod)}
              className="pl-6 pr-24"
            />
          </div>
          <div className="w-full">
            <TableItem
              title="Available Grace Period"
              value="23:12:38"
              className="pr-6 pl-24"
            />
            <TableItem
              title="Repayment To Minimum Reserves"
              value={market.delinquentDebt.format(TOKEN_FORMAT_DECIMALS, true)}
              className="pr-6 pl-24"
            />
            <TableItem
              title="Available To Borrow"
              value={market.borrowableAssets.format(
                TOKEN_FORMAT_DECIMALS,
                true,
              )}
              className="pr-6 pl-24"
            />
            <TableItem
              title="Outstanding Debt"
              value={`${market.totalSupply.format(TOKEN_FORMAT_DECIMALS)} ${
                market.underlyingToken.symbol
              }`}
              className="pr-6 pl-24"
            />
            <TableItem
              title="Assets In Reserves"
              value={market.totalAssets.format(TOKEN_FORMAT_DECIMALS, true)}
              className="pr-6 pl-24"
            />
            <TableItem
              title="Minimum Reserves Required"
              value={market.coverageLiquidity.format(
                TOKEN_FORMAT_DECIMALS,
                true,
              )}
              className="pr-6 pl-24"
            />
            <TableItem
              title="Current Reserve Ratio"
              value={`${market.collateralization.actualRatio.toFixed(
                MARKET_PERCENTAGE_PARAM_DECIMALS,
              )}%`}
              className="pr-6 pl-24"
            />
            <TableItem
              title="Lifetime Accrued Interest"
              value="-"
              className="pr-6 pl-24"
            />
          </div>
        </div>
      </div>

      <LenderMarketDetails tableData={tableDataMock} />
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
