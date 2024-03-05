import dayjs from "dayjs"
import {
  formatTokenWithCommas,
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
        title: "Amount",
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
              <EtherscanLink kind="address" value={request.address}>
                {trimAddress(request.address)}
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
            <TableCell justify="end">
              <Tooltip
                content={request
                  .getNormalizedTotalAmount(withdrawal.batch)
                  .format(withdrawal.market.decimals, true)}
              >
                {formatTokenWithCommas(
                  request.getNormalizedTotalAmount(withdrawal.batch),
                  { withSymbol: true },
                )}
              </Tooltip>
            </TableCell>
          </TableRow>
        )),
      )}
  </Table>
)
