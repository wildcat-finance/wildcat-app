import dayjs from "dayjs"
import {
  WithdrawalBatch,
  WithdrawalRequestRecord,
} from "@wildcatfi/wildcat-sdk"
import {
  TOKEN_FORMAT_DECIMALS,
  trimAddress,
} from "../../utils/formatters"
import {
  Table,
  TableCell,
  TableRow,
  Tooltip,
} from "../ui-components"
import { WithdrawalsTableProps } from "./interface"
import { EtherscanLink } from "../ui-components/EtherscanLink"
import {
  LenderNameStore,
  useLenderNameStore,
} from "../../../../../../store/useLenderNameStore"

const DATE_FORMAT = "DD-MMM-YYYY HH:mm"

function WithdrawalRow({
  withdrawal,
  kind,
  batch,
  store,
}: {
  batch: WithdrawalBatch
  withdrawal: WithdrawalRequestRecord
  kind: "pending" | "expired" | "complete"
  store: LenderNameStore
}) {
  const tokenAmount =
    kind === "pending"
      ? withdrawal.getNormalizedTotalAmount(batch)
      : withdrawal.getNormalizedAmountOwed(batch)
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
        <Tooltip content={tokenAmount.format(batch.market.decimals, true)}>
          {tokenAmount.format(TOKEN_FORMAT_DECIMALS, true)}
        </Tooltip>
      </TableCell>
    </TableRow>
  )
}

function WithdrawalsTable({
  withdrawals,
  kind,
}: WithdrawalsTableProps & { kind: "pending" | "expired" | "complete" }) {
  const store = useLenderNameStore()
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
      {withdrawals &&
        withdrawals.map((wd) =>
          wd.requests
            .filter((withdrawal) =>
              kind === "expired"
                ? withdrawal.getNormalizedAmountOwed(wd.batch).gt(0)
                : true,
            )
            .map((withdrawal) => (
              <WithdrawalRow
                kind={kind}
                withdrawal={withdrawal}
                batch={wd.batch}
                store={store}
              />
            )),
        )}
    </Table>
  )
}

export const PrevCycleTable = ({
  withdrawals,
  underlyingToken,
}: WithdrawalsTableProps) => (
  <WithdrawalsTable
    kind="expired"
    underlyingToken={underlyingToken}
    withdrawals={withdrawals}
  />
)
