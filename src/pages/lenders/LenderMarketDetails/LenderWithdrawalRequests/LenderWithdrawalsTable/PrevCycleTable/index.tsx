import dayjs from "dayjs"
import {
  TOKEN_FORMAT_DECIMALS,
  trimAddress,
} from "../../../../../../utils/formatters"
import {
  Table,
  TableCell,
  TableRow,
  Tooltip,
} from "../../../../../../components/ui-components"
import { WithdrawalsTableProps } from "./interface"
import { EtherscanLink } from "../../../../../../components/ui-components/EtherscanLink"

const DATE_FORMAT = "DD-MMM-YYYY HH:mm"

export const PrevCycleTable = ({ withdrawals }: WithdrawalsTableProps) => (
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
        title: "Amount",
        align: "end",
        className: "w-32",
      },
    ]}
  >
    {withdrawals &&
      withdrawals.map((wd) =>
        wd.requests
          .filter((withdrawal) =>
            withdrawal.getNormalizedAmountOwed(wd.batch).gt(0),
          )
          .map((withdrawal) => (
            <TableRow key={withdrawal.id}>
              <TableCell justify="start">
                <EtherscanLink kind="address" value={withdrawal.address}>
                  {trimAddress(withdrawal.address)}
                </EtherscanLink>
              </TableCell>
              <TableCell justify="start">
                <EtherscanLink kind="tx" value={withdrawal.transactionHash}>
                  {trimAddress(withdrawal.transactionHash, 24)}
                </EtherscanLink>
              </TableCell>
              <TableCell justify="start">
                {dayjs(withdrawal.blockTimestamp * 1000).format(DATE_FORMAT)}
              </TableCell>
              <TableCell justify="end">
                <Tooltip
                  content={withdrawal
                    .getNormalizedAmountOwed(wd.batch)
                    .format(wd.market.decimals, true)}
                >
                  {withdrawal
                    .getNormalizedAmountOwed(wd.batch)
                    .format(TOKEN_FORMAT_DECIMALS, true)}
                </Tooltip>
              </TableCell>
            </TableRow>
          )),
      )}
  </Table>
)
