import dayjs from "dayjs"
import {
  TOKEN_FORMAT_DECIMALS,
  trimAddress,
} from "../../../../../../utils/formatters"
import {
  Table,
  TableCell,
  TableRow,
} from "../../../../../../components/ui-components"
import { WithdrawalsTableProps } from "./interface"
import { EtherscanBaseUrl } from "../../../../../../config/networks"

const DATE_FORMAT = "DD-MMM-YYYY HH:mm"

export const ThisCycleTable = ({ withdrawals }: WithdrawalsTableProps) => (
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
        title: "Requested",
        align: "start",
        className: "w-32",
      },
      {
        title: "Outstanding",
        align: "end",
        className: "w-32",
      },
    ]}
  >
    {withdrawals &&
      withdrawals.map((withdrawal) =>
        withdrawal.requests.map((request) => (
          <TableRow key={request.id}>
            <TableCell justify="start">
              <a
                className="hover:underline"
                href={`${EtherscanBaseUrl}/address/${request.address}`}
                target="_blank"
                rel="noreferrer"
              >
                {trimAddress(request.address)}
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
            <TableCell justify="start">
              {request.normalizedAmount.format(TOKEN_FORMAT_DECIMALS, true)}
            </TableCell>
            <TableCell justify="end">
              {request
                .getNormalizedAmountOwed(withdrawal.batch)
                .format(TOKEN_FORMAT_DECIMALS, true)}
            </TableCell>
          </TableRow>
        )),
      )}
  </Table>
)
