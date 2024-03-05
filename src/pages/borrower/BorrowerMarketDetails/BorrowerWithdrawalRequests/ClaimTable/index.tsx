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
import { EtherscanLink } from "../../../../../components/ui-components/EtherscanLink"

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

  batches?.forEach((batch) => {
    batch.withdrawals.reduce(
      (acc, w) => acc.add(w.availableWithdrawalAmount),
      market.underlyingToken.getAmount(0),
    )
  })

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
                    <EtherscanLink kind="address" value={lender}>
                      {trimAddress(lender)}
                    </EtherscanLink>
                  </TableCell>
                  <TableCell justify="start">
                    <EtherscanLink kind="tx" value={request.transactionHash}>
                      {trimAddress(request.transactionHash, 24)}
                    </EtherscanLink>
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
                <TableCell justify="start" className="!p-0 !bg-tint-10">
                  <EtherscanLink kind="tx" value={request.transactionHash}>
                    {trimAddress(request.transactionHash, 24)}
                  </EtherscanLink>
                </TableCell>
                <TableCell justify="start" className="!bg-tint-10">
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
