import dayjs from "dayjs"
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
import { EtherscanLink } from "../../../../../components/ui-components/EtherscanLink"

const DATE_FORMAT = "DD-MMM-YYYY HH:mm"

const TABLE_HEADER_CONFIG = [
  {
    title: "Batch",
    align: "start",
    className: "w-8",
  },
  {
    title: "Lender",
    align: "start",
    className: "w-40",
  },
  {
    title: "Transaction ID",
    align: "start",
    className: "w-64",
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

export const ClaimTable = ({ batches }: ClaimTableProps) => (
  <Table headers={TABLE_HEADER_CONFIG}>
    {(batches ?? []).map((batch) => (
      <TableRow key={batch.expiry}>
        <TableCell justify="start" className="w-8">
          {batch.expiry}
        </TableCell>

        <td colSpan={4}>
          <table className="w-full">
            {batch.withdrawals.map((withdrawal) => (
              <TableRow key={withdrawal.lender}>
                <TableCell
                  justify="start"
                  className="first:pl-0 w-40"
                  style={{ paddingLeft: 0 }}
                >
                  <EtherscanLink kind="address" value={withdrawal.lender}>
                    {trimAddress(withdrawal.lender)}
                  </EtherscanLink>
                </TableCell>
                <td colSpan={3}>
                  <table className="w-full">
                    <TableRow>
                      <TableCell
                        justify="start"
                        className="first:pl-0 w-64"
                        style={{
                          paddingLeft: 0,
                          paddingTop: 10,
                        }}
                      >
                        {withdrawal.requests.map((request) => (
                          <TableRow key={request.id}>
                            <TableCell
                              justify="start"
                              className="first:pl-0 w-64"
                              style={{ paddingLeft: 0 }}
                            >
                              <EtherscanLink
                                kind="tx"
                                value={request.transactionHash}
                              >
                                {trimAddress(request.transactionHash, 24)}
                              </EtherscanLink>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableCell>

                      <TableCell
                        justify="start"
                        className="first:pl-0 w-40"
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

                      <TableCell justify="end" className="w-40 first:pl-0">
                        {formatTokenWithCommas(
                          withdrawal.availableWithdrawalAmount,
                        )}
                      </TableCell>
                    </TableRow>
                  </table>
                </td>
              </TableRow>
            ))}
          </table>
        </td>
      </TableRow>
    ))}
  </Table>
)
