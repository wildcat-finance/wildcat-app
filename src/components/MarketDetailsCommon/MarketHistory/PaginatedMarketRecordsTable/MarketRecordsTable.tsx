/* eslint-disable no-underscore-dangle */
import { Market, MarketRecord } from "@wildcatfi/wildcat-sdk"
import dayjs from "dayjs"
import {
  TOKEN_FORMAT_DECIMALS,
  trimAddress,
} from "../../../../utils/formatters"
import { Spinner, Table, TableCell, TableRow } from "../../../ui-components"
import { EtherscanLink } from "../../../ui-components/EtherscanLink"
import {
  LenderNameStore,
  useLenderNameStore,
} from "../../../../store/useLenderNameStore"
import { useBorrowerNameOrAddress } from "../../../../hooks/useBorrowerNames"

const DATE_FORMAT = "DD-MMM-YYYY HH:mm"

const getRecordText = (
  record: MarketRecord,
  lenderNames: LenderNameStore,
  borrowerName: string,
): string => {
  if (record.__typename === "AnnualInterestBipsUpdated") {
    return `Interest rate changed from ${
      record.oldAnnualInterestBips / 100
    }% to ${record.newAnnualInterestBips / 100}%`
  }
  if (record.__typename === "Borrow") {
    return `${borrowerName} borrowed ${record.amount.format(
      TOKEN_FORMAT_DECIMALS,
      true,
    )}`
  }
  if (record.__typename === "DebtRepaid") {
    return `${borrowerName} repaid ${record.amount.format(
      TOKEN_FORMAT_DECIMALS,
      true,
    )}`
  }
  if (record.__typename === "Deposit") {
    const lenderName =
      lenderNames[`lender-name-${record.address.toLowerCase()}`]
    const label = lenderName ?? trimAddress(record.address)
    return `${label} loaned ${record.amount.format(
      TOKEN_FORMAT_DECIMALS,
      true,
    )}`
  }
  if (record.__typename === "DelinquencyStatusChanged") {
    if (!record.isDelinquent) return `Market back in good standing`
    const delinquentDebt = record.liquidityCoverageRequired
      .satsub(record.totalAssets)
      .format(TOKEN_FORMAT_DECIMALS, true)
    return `Market delinquent by ${delinquentDebt}`
  }
  if (record.__typename === "FeesCollected") {
    return `${record.amount.format(
      TOKEN_FORMAT_DECIMALS,
      true,
    )} collected in protocol fees`
  }
  if (record.__typename === "MarketClosed") {
    return `Market closed`
  }
  if (record.__typename === "WithdrawalRequest") {
    const lenderName =
      lenderNames[`lender-name-${record.address.toLowerCase()}`]
    const label = lenderName ?? trimAddress(record.address)
    return `${label} requested withdrawal of ${record.normalizedAmount.format(
      TOKEN_FORMAT_DECIMALS,
      true,
    )}`
  }
  // if (record.__typename === "MaxTotalSupplyUpdated") {
  const kind = record.newMaxTotalSupply.gt(record.oldMaxTotalSupply)
    ? "increased"
    : "reduced"
  return `Market capacity ${kind} to ${record.newMaxTotalSupply.format(
    TOKEN_FORMAT_DECIMALS,
    true,
  )}`
}

function MarketRecordRow({
  record,
  store,
  borrowerName,
}: {
  record: MarketRecord
  store: LenderNameStore
  borrowerName: string
}) {
  return (
    <TableRow key={record.transactionHash}>
      <TableCell justify="start">
        <EtherscanLink kind="tx" value={record.transactionHash}>
          {trimAddress(record.transactionHash, 10)}
        </EtherscanLink>
      </TableCell>
      <TableCell justify="start">
        {dayjs(record.blockTimestamp * 1000).format(DATE_FORMAT)}
      </TableCell>
      <TableCell justify="end">
        {getRecordText(record, store, borrowerName)}
      </TableCell>
    </TableRow>
  )
}

export type MarketRecordsTableProps = {
  market: Market
  records?: MarketRecord[]
  isLoading?: boolean
}

export function MarketRecordsTable({
  market,
  records,
  isLoading,
}: MarketRecordsTableProps) {
  const store = useLenderNameStore()
  const name = useBorrowerNameOrAddress(market.borrower)
  return (
    <Table
      headers={[
        {
          title: "Transaction ID",
          align: "start",
          className: "w-40",
        },
        {
          title: "Time",
          align: "start",
          className: "w-40",
        },
        {
          title: "Event",
          align: "end",
          className: "w-72",
        },
      ]}
    >
      {isLoading && <Spinner isLoading={isLoading} fixedDisable />}
      {records &&
        records.map((record) => (
          <MarketRecordRow record={record} store={store} borrowerName={name} />
        ))}
    </Table>
  )
}
