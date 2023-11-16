import dayjs from "dayjs"
import { BigNumber } from "ethers"
import {
  formatTokenAmount,
  TOKEN_FORMAT_DECIMALS,
  trimAddress,
} from "../../../../../utils/formatters"
import {
  Table,
  TableCell,
  TableRow,
} from "../../../../../components/ui-components"
import { WithdrawalsTableProps } from "./interface"

const DATE_FORMAT = "DD-MMM-YYYY"

export const WithdrawalsTable = ({
  withdrawals,
  underlyingToken,
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
        title: "Amount",
        align: "end",
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
                href={`https://sepolia.etherscan.io/address/${withdrawal.account.address}`}
                target="_blank"
                rel="noreferrer"
              >
                {trimAddress(withdrawal.account.address)}
              </a>
            </TableCell>
            <TableCell justify="start">
              <a
                className="hover:underline"
                href={`https://sepolia.etherscan.io/tx/${withdrawal.transactionHash}`}
                target="_blank"
                rel="noreferrer"
              >
                {trimAddress(withdrawal.transactionHash, 24)}
              </a>
            </TableCell>
            <TableCell justify="start">
              {dayjs(withdrawal.blockTimestamp * 1000).format(DATE_FORMAT)}
            </TableCell>
            <TableCell justify="end">
              {formatTokenAmount(
                BigNumber.from(withdrawal.scaledAmount),
                underlyingToken.decimals,
                TOKEN_FORMAT_DECIMALS,
              )}{" "}
              {underlyingToken.symbol}
            </TableCell>
          </TableRow>
        )),
      )}
  </Table>
)
