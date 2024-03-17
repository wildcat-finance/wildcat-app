import dayjs from "dayjs"
import {
  WithdrawalBatch,
  WithdrawalRequestRecord,
} from "@wildcatfi/wildcat-sdk"
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
import { useLenderNameStore } from "../../../../../../store/useLenderNameStore"
import { LenderNameStore } from "../../../../../../store/interface"

const DATE_FORMAT = "DD-MMM-YYYY HH:mm"

function WithdrawalRow({
  batch,
  withdrawal,
  store,
}: {
  batch: WithdrawalBatch
  withdrawal: WithdrawalRequestRecord
  store: LenderNameStore
}) {
  return (
    <TableRow key={withdrawal.id}>
      <TableCell justify="start">
        <EtherscanLink kind="address" value={withdrawal.address}>
          {store[`lender-name-${withdrawal.address}`]
            ? store[`lender-name-${withdrawal.address}`]
            : trimAddress(withdrawal.address)}
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
            .getNormalizedAmountOwed(batch)
            .format(batch.market.decimals, true)}
        >
          {formatTokenWithCommas(withdrawal.getNormalizedAmountOwed(batch), {
            withSymbol: true,
          })}
        </Tooltip>
      </TableCell>
    </TableRow>
  )
}

export const PrevCycleTable = ({
  withdrawalBatches,
}: WithdrawalsTableProps) => {
  const lenderNameStore = useLenderNameStore()

  return (
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
          batch.requests
            .filter((withdrawal) =>
              withdrawal.getNormalizedAmountOwed(batch).gt(0),
            )
            .map((withdrawal) => (
              <WithdrawalRow
                batch={batch}
                withdrawal={withdrawal}
                store={lenderNameStore}
              />
            )),
        )}
    </Table>
  )
}
