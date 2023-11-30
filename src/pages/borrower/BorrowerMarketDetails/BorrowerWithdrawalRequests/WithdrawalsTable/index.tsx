import dayjs from "dayjs"
import {
  TOKEN_FORMAT_DECIMALS,
  trimAddress,
} from "../../../../../utils/formatters"
import {
  Table,
  TableCell,
  TableRow,
} from "../../../../../components/ui-components"
import { WithdrawalsTableProps } from "./interface"
import { getEtherscanLink } from "../../../../../utils/links"

const DATE_FORMAT = "DD-MMM-YYYY HH:mm"

export const WithdrawalsTable = ({
  withdrawalBatches,
}: WithdrawalsTableProps) => (
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
        className: "w-52",
      },
      {
        title: "Requested",
        align: "start",
        className: "w-32",
      },
      {
        title: "Paid",
        align: "start",
        className: "w-32",
      },
      {
        title: "Owed",
        align: "end",
        className: "w-32",
      },
    ]}
  >
    {withdrawalBatches &&
      withdrawalBatches.map((batch) =>
        batch.requests.map((withdrawal) => (
          <TableRow key={withdrawal.id}>
            <TableCell justify="start">
              <a
                className="hover:underline"
                href={getEtherscanLink(withdrawal.address, "address")}
                target="_blank"
                rel="noreferrer"
              >
                {trimAddress(withdrawal.address)}
              </a>
            </TableCell>
            <TableCell justify="start">
              <a
                className="hover:underline"
                href={getEtherscanLink(withdrawal.transactionHash, "tx")}
                target="_blank"
                rel="noreferrer"
              >
                {trimAddress(withdrawal.transactionHash, 24)}
              </a>
            </TableCell>
            <TableCell justify="start">
              {dayjs(withdrawal.blockTimestamp * 1000).format(DATE_FORMAT)}
            </TableCell>
            <TableCell justify="start">
              {withdrawal.normalizedAmount.format(TOKEN_FORMAT_DECIMALS, true)}
            </TableCell>
            <TableCell justify="start">
              {withdrawal
                .getNormalizedAmountPaid(batch)
                .format(TOKEN_FORMAT_DECIMALS, true)}
            </TableCell>
            <TableCell justify="end">
              {withdrawal
                .getNormalizedAmountOwed(batch)
                .format(TOKEN_FORMAT_DECIMALS, true)}
            </TableCell>
          </TableRow>
        )),
      )}
  </Table>
)
