import dayjs from "dayjs"
import { mulDiv } from "@wildcatfi/wildcat-sdk"
import { BigNumber } from "ethers"
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
import { EtherscanBaseUrl } from "../../../../../config/networks"

const DATE_FORMAT = "DD-MMM-YYYY HH:mm"

export const WithdrawalsTable = ({ withdrawals }: WithdrawalsTableProps) => (
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
        title: "Claimed",
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
    {withdrawals &&
      withdrawals.map((wd) =>
        wd.requests.map((withdrawal) => (
          <TableRow key={withdrawal.id}>
            <TableCell justify="start">
              <a
                className="hover:underline"
                href={`${EtherscanBaseUrl}/address/${withdrawal.address}`}
                target="_blank"
                rel="noreferrer"
              >
                {trimAddress(withdrawal.address)}
              </a>
            </TableCell>
            <TableCell justify="start">
              <a
                className="hover:underline"
                href={`${EtherscanBaseUrl}/tx/${withdrawal.transactionHash}`}
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
              {wd.market.underlyingToken
                .getAmount(
                  wd.normalizedAmountWithdrawn.mulDiv(
                    withdrawal.scaledAmount,
                    wd.scaledAmount,
                  ),
                )
                .format(TOKEN_FORMAT_DECIMALS, true)}
            </TableCell>
            <TableCell justify="end">
              {withdrawal
                .getNormalizedAmountOwed(wd)
                .format(TOKEN_FORMAT_DECIMALS, true)}
            </TableCell>
          </TableRow>
        )),
      )}
  </Table>
)
