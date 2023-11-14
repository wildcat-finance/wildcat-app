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

const tableData = [
  {
    lender: "Hudson",
    dateSubmitted: "12-Jul-2023",
    dateExecuted: "12-Jul-2023",
    amount: "1,000 DAI",
    status: "Pending",
    wallet: "0x287324837498sjdf098234lkjsef08234af",
    txID: "0x7a8b19c62f3854a9e013d83663dbb6f6",
  },
  {
    lender: "Smith",
    dateSubmitted: "15-Jul-2023",
    dateExecuted: "20-Jul-2023",
    amount: "2,500 DAI",
    status: "Approved",
    wallet: "0x874329847234sjdf432432lkjsef82384ad",
    txID: "0x2e1d4f8a5c7f30b1498d67b20e9a1dc3",
  },
  {
    lender: "Johnson",
    dateSubmitted: "10-Jul-2023",
    dateExecuted: "12-Jul-2023",
    amount: "500 DAI",
    status: "Completed",
    wallet: "0x129084379012sjdf987651lkjsef76543az",
    txID: "0x9f6c57d183eba4c6b705d924a891e1f7",
  },
  {
    lender: "Brown",
    dateSubmitted: "18-Jul-2023",
    dateExecuted: "19-Jul-2023",
    amount: "3,000 DAI",
    status: "Rejected",
    wallet: "0x768209478645sjdf784356lkjsef76598ba",
    txID: "0x4b3e8a91c61d79f5ad35b286a7f2c8d8",
  },
  {
    lender: "Davis",
    dateSubmitted: "22-Jul-2023",
    dateExecuted: "25-Jul-2023",
    amount: "1,200 DAI",
    status: "Approved",
    wallet: "0x329847325478sjdf657890lkjsef23487cd",
    txID: "0xa1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d",
  },
  {
    lender: "Miller",
    dateSubmitted: "14-Jul-2023",
    dateExecuted: "16-Jul-2023",
    amount: "800 DAI",
    status: "Pending",
    wallet: "0x534982374568sjdf239804lkjsef65432fd",
    txID: "0x5c1d9e8f5a3f7b9d0c1b6d1c8e7f5b9a",
  },
  {
    lender: "Wilson",
    dateSubmitted: "11-Jul-2023",
    dateExecuted: "14-Jul-2023",
    amount: "1,750 DAI",
    status: "Completed",
    wallet: "0x784938274561sjdf128743lkjsef23467de",
    txID: "0x3d6a8e7f2b1c0d9f86a2b1d9c5a7f8b0",
  },
]

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

      <LenderMarketDetails tableData={tableData} />
      <PaymentHistory tableData={tableData} />

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
