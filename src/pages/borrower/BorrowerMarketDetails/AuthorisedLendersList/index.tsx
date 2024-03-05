import {
  Table,
  TableCell,
  TableRow,
  Spinner,
} from "../../../../components/ui-components"

import { AuthorisedLendersListProps } from "./interface"
import { useGetAuthorisedLendersByMarket } from "../hooks/useGetAuthorisedLenders"
import { EtherscanLink } from "../../../../components/ui-components/EtherscanLink"

export const AuthorisedLendersList = ({
  marketAddress,
}: AuthorisedLendersListProps) => {
  const { data: authorisedLenders, isLoading } =
    useGetAuthorisedLendersByMarket(marketAddress)

  return (
    <>
      <Table
        headers={[
          {
            title: "Name",
            align: "start",
            className: "w-44",
          },
          {
            title: "Wallet Address",
            align: "start",
          },
          {
            title: "",
            align: "start",
            className: "w-24",
          },
        ]}
      >
        {authorisedLenders &&
          authorisedLenders.map((lender) => (
            <TableRow key={lender}>
              <TableCell justify="start" />
              <TableCell justify="start">
                <EtherscanLink kind="address" value={lender}>
                  {lender}
                </EtherscanLink>
              </TableCell>
              <TableCell justify="center" />
            </TableRow>
          ))}
      </Table>

      <Spinner isLoading={isLoading} fixedDisable className="w-5 h-5 mt-2" />
    </>
  )
}
