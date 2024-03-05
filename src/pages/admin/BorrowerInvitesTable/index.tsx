/* eslint-disable no-nested-ternary */
import dayjs from "dayjs"
import { trimAddress } from "../../../utils/formatters"
import {
  Button,
  Table,
  TableCell,
  TableRow,
} from "../../../components/ui-components"
import { TargetChainId } from "../../../config/networks"
import { BorrowerInvite } from "../hooks/useBorrowerInvites"
import { EtherscanLink } from "../../../components/ui-components/EtherscanLink"

const DATE_FORMAT = "DD-MMM-YYYY"

export type BorrowerInvitesTableProps = {
  borrowerInvites: BorrowerInvite[]
  isRegistering: boolean
  register: (address: string) => void
}

export const BorrowerInvitesTable = ({
  borrowerInvites,
  isRegistering,
  register,
}: BorrowerInvitesTableProps) => (
  <Table
    headers={[
      {
        title: "Borrower",
        align: "start",
        className: "w-40",
      },
      {
        title: "Name",
        align: "start",
        className: "w-40",
      },
      {
        title: "Time Invited",
        align: "start",
        className: "w-32",
      },
      {
        title: "Time Accepted",
        align: "start",
        className: "w-32",
      },
      {
        title: "Registered on-chain",
        align: "start",
        className: "w-32",
      },
    ]}
  >
    {borrowerInvites.map((borrower) => (
      <TableRow key={borrower.address}>
        <TableCell justify="start">
          <EtherscanLink kind="address" value={borrower.address}>
            {trimAddress(borrower.address)}
          </EtherscanLink>
        </TableCell>
        <TableCell justify="start">{borrower.name}</TableCell>
        <TableCell justify="start">
          {dayjs(+borrower.timeInvited).format(DATE_FORMAT)}
        </TableCell>
        <TableCell justify="start">
          {borrower.timeAccepted
            ? dayjs(+borrower.timeAccepted).format(DATE_FORMAT)
            : "Pending signature"}
        </TableCell>
        <TableCell justify="start">
          {(TargetChainId === 1
            ? borrower.registeredMainnet
            : borrower.registeredSepolia) === 1 ? (
            `Registered`
          ) : borrower.timeAccepted ? (
            <Button
              variant="green"
              disabled={isRegistering}
              onClick={() => register(borrower.address)}
            >
              Register
            </Button>
          ) : (
            "N/A"
          )}
        </TableCell>
      </TableRow>
    ))}
  </Table>
)
