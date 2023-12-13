import dayjs from "dayjs"
import { LenderWithdrawalStatus } from "@wildcatfi/wildcat-sdk"
import {
  TOKEN_FORMAT_DECIMALS,
  trimAddress,
} from "../../../../../utils/formatters"
import {
  Table,
  TableCell,
  TableRow,
} from "../../../../../components/ui-components"
import { ClaimTableProps } from "./type"
import { EtherscanBaseUrl } from "../../../../../config/networks"

const DATE_FORMAT = "DD-MMM-YYYY HH:mm"

export const ClaimTable = ({ batches, market }: ClaimTableProps) => {
  const withdrawals: { [key: string]: LenderWithdrawalStatus[] } = {}

  batches?.forEach((batch) => {
    batch.withdrawals.forEach((withdrawal) => {
      if (!withdrawals[withdrawal.lender]) {
        withdrawals[withdrawal.lender] = []
      }
      if (withdrawal.availableWithdrawalAmount.raw.isZero()) {
        return
      }
      withdrawals[withdrawal.lender].push(withdrawal)
    })
  })

  console.log("суки", withdrawals, batches)

  return (
    <Table
      headers={[
        {
          title: "Lender",
          align: "start",
          className: "w-40",
        },
        {
          title: "Transaction ID",
          align: "start",
          className: "w-72",
        },
        {
          title: "Date Submitted",
          align: "start",
          className: "w-40",
        },
        {
          title: "Claimable",
          align: "end",
          className: "w-40",
        },
      ]}
    >
      {Object.keys(withdrawals).map((lender) =>
        withdrawals[lender].map((withdrawal, i) =>
          withdrawal.batch.requests.map((request, j) => {
            const requestNumber = withdrawals[lender].reduce(
              (acc, curr) => curr.batch.requests.length + acc,
              0,
            )
            const claimableAmount = withdrawals[lender].reduce(
              (acc, w) => acc.add(w.availableWithdrawalAmount),
              market.underlyingToken.getAmount(0),
            )
            if (i === 0 && j === 0) {
              return (
                <TableRow key={lender}>
                  <TableCell justify="start" rowSpan={requestNumber}>
                    <a
                      className="hover:underline"
                      href={`${EtherscanBaseUrl}/address/${lender}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {trimAddress(lender)}
                    </a>
                  </TableCell>
                  <TableCell justify="start">
                    <a
                      className="hover:underline"
                      href={`${EtherscanBaseUrl}/tx/${request.transactionHash}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {trimAddress(request.transactionHash, 24)}
                    </a>
                  </TableCell>
                  <TableCell justify="start">
                    {dayjs(request.blockTimestamp * 1000).format(DATE_FORMAT)}
                  </TableCell>
                  <TableCell justify="end" rowSpan={requestNumber}>
                    {claimableAmount.format(TOKEN_FORMAT_DECIMALS, true)}
                  </TableCell>
                </TableRow>
              )
            }
            return (
              <TableRow key={lender}>
                <TableCell justify="start">
                  <a
                    className="hover:underline"
                    href={`${EtherscanBaseUrl}/tx/${request.transactionHash}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {trimAddress(request.transactionHash, 24)}
                  </a>
                </TableCell>
                <TableCell justify="start">
                  {dayjs(request.blockTimestamp * 1000).format(DATE_FORMAT)}
                </TableCell>
              </TableRow>
            )
          }),
        ),
      )}
    </Table>
  )
}
