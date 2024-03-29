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

export const ThisCycleTable = ({
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
        className: "w-40",
      },
      {
        title: "Amount",
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
                  .getNormalizedTotalAmount(batch)
                  .format(batch.market.decimals, true)}
              >
                {formatTokenWithCommas(
                  withdrawal.getNormalizedTotalAmount(batch),
                  { withSymbol: true },
                )}
              </Tooltip>
            </TableCell>
          </TableRow>
        )),
      )}
  </Table>
)
