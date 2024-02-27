import dayjs from "dayjs"
import { LenderWithdrawalStatus } from "@wildcatfi/wildcat-sdk"
import {
  formatTokenWithCommas,
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

const TABLE_HEADER_CONFIG = [
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
    title: "Amount",
    align: "end",
    className: "w-40",
  },
]

export const ClaimTable = ({ expiredPendingWithdrawals }: ClaimTableProps) => {
  const expiredPendingWithdrawalsByLender: {
    [key: string]: LenderWithdrawalStatus[]
  } = {}

  expiredPendingWithdrawals.forEach((batch) => {
    if (batch.availableWithdrawalAmount.raw.isZero()) {
      return
    }

    if (!expiredPendingWithdrawalsByLender[batch.lender]) {
      expiredPendingWithdrawalsByLender[batch.lender] = []
    }

    expiredPendingWithdrawalsByLender[batch.lender].push(batch)
  })

  return (
    <Table headers={TABLE_HEADER_CONFIG}>
      {Object.keys(expiredPendingWithdrawalsByLender).map((lender) => (
        <TableRow key={lender}>
          <TableCell justify="start">
            <a
              className="hover:underline"
              href={`${EtherscanBaseUrl}/address/${lender}`}
              target="_blank"
              rel="noreferrer"
            >
              {trimAddress(lender)}
            </a>
          </TableCell>

          <td colSpan={3}>
            <table className="w-full">
              {expiredPendingWithdrawalsByLender[lender].map((withdrawal) => (
                <TableRow>
                  <TableCell
                    justify="start"
                    className="first:pl-0"
                    style={{
                      width: "47%",
                      paddingLeft: 0,
                      paddingTop: 10,
                    }}
                  >
                    {withdrawal.requests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell
                          justify="start"
                          className="first:pl-0"
                          style={{ width: "47.5%", paddingLeft: 0 }}
                        >
                          <a
                            className="hover:underline"
                            href={`${EtherscanBaseUrl}/tx/${request.transactionHash}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {trimAddress(request.transactionHash, 24)}
                          </a>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableCell>

                  <TableCell
                    justify="start"
                    style={{
                      paddingLeft: 0,
                      paddingTop: 10,
                    }}
                  >
                    {withdrawal.requests.map((request) => (
                      <TableRow>
                        <TableCell
                          justify="start"
                          className="first:pl-0"
                          style={{
                            paddingLeft: 0,
                          }}
                        >
                          {dayjs(request.blockTimestamp * 1000).format(
                            DATE_FORMAT,
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableCell>

                  <TableCell justify="end">
                    {formatTokenWithCommas(
                      withdrawal.availableWithdrawalAmount,
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </table>
          </td>
        </TableRow>
      ))}
    </Table>
  )
}
