import dayjs from "dayjs"
import { trimAddress } from "../../../../../utils/formatters"
import {
  Table,
  TableCell,
  TableRow,
} from "../../../../../components/ui-components"
import { ClaimTableProps } from "./type"
import { EtherscanLink } from "../../../../../components/ui-components/EtherscanLink"

const DATE_FORMAT = "DD-MMM-YYYY HH:mm"

export const ClaimTable = ({ withdrawalBatches }: ClaimTableProps) => (
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
            <TableCell justify="start">
              <div />
            </TableCell>
          </TableRow>
        )),
      )}
  </Table>
)
