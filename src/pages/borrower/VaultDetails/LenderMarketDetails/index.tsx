import React, { useState } from "react"
import {
  Chip,
  Table,
  TableCell,
  TableRow,
} from "../../../../components/ui-components"
import { ExpandMore } from "../../../../components/ui-components/icons"
import { LenderMarketDetailsProps } from "./type"

const LenderMarketDetails = ({ tableData }: LenderMarketDetailsProps) => {
  const [thisCycle, setThisCycle] = useState(false)
  const [prevCycle, setPrevCycle] = useState(false)

  const toggleAccordion = (index: number) => {
    if (index === 1) {
      setThisCycle(!thisCycle)
    } else if (index === 2) {
      setPrevCycle(!prevCycle)
    }
  }

  return (
    <div className="mb-14">
      <div className="flex justify-between items-center mb-8">
        <div className="text-base font-bold">Lender Withdrawal Requests</div>
        <div className="flex gap-x-7 items-center">
          <Chip color="green" className="w-fit !h-6 text-white">
            Ongoing Cycle
          </Chip>
          <div className="flex gap-x-2">
            <div className="inline text-black text-xs font-bold">Start</div>
            <div className="text-black text-xs"> </div>
          </div>
          <div className="flex gap-x-2">
            <div className="inline text-black text-xs font-bold">End</div>
            <div className="text-black text-xs"> </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4 pr-6">
        <div className="inline text-black text-xs font-bold">
          Total Withdrawal Requests Outstanding
        </div>
        <Chip className="w-20 flex justify-center">15,000 DAI</Chip>
      </div>
      <div className="h-12 flex justify-between items-center bg-tint-10 px-6">
        <div className="inline text-black text-xs font-bold">
          Requests Made In This Cycle
        </div>
        <div className="flex gap-x-4 items-center">
          {thisCycle ? (
            <ExpandMore
              className="transform rotate-180"
              onClick={() => toggleAccordion(1)}
            />
          ) : (
            <ExpandMore onClick={() => toggleAccordion(1)} />
          )}
          <Chip className="w-20 flex justify-center">5,000 DAI</Chip>
        </div>
      </div>
      {thisCycle && (
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
              className: "w-52",
            },
            {
              title: "",
              align: "center",
              className: "w-28",
            },
            {
              title: "Amount",
              align: "end",
            },
          ]}
        >
          {tableData.map((item) => (
            <TableRow key={item.wallet}>
              <TableCell justify="start">{item.lender}</TableCell>
              <TableCell justify="start">{item.txID}</TableCell>
              <TableCell justify="start">{item.dateExecuted}</TableCell>
              <TableCell justify="end">
                <div />
              </TableCell>
              <TableCell justify="end">{item.amount}</TableCell>
            </TableRow>
          ))}
        </Table>
      )}
      <div className="h-12 flex justify-between items-center bg-tint-10 px-6 mt-6">
        <div className="inline text-black text-xs font-bold">
          Requests Made In Previous Cycles
        </div>
        <div className="flex gap-x-4 items-center">
          {prevCycle ? (
            <ExpandMore
              className="transform rotate-180"
              onClick={() => toggleAccordion(2)}
            />
          ) : (
            <ExpandMore onClick={() => toggleAccordion(2)} />
          )}
          <Chip className="w-20 flex justify-center">10,000 DAI</Chip>
        </div>
      </div>
      {prevCycle && (
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
              className: "w-52",
            },
            {
              title: "Date Queued",
              align: "start",
              className: "w-28",
            },
            {
              title: "Amount",
              align: "end",
            },
          ]}
        >
          {tableData.map((item) => (
            <TableRow key={item.wallet}>
              <TableCell justify="start">{item.lender}</TableCell>
              <TableCell justify="start">{item.txID}</TableCell>
              <TableCell justify="start">{item.dateExecuted}</TableCell>
              <TableCell justify="start">{item.dateExecuted}</TableCell>
              <TableCell justify="end">{item.amount}</TableCell>
            </TableRow>
          ))}
        </Table>
      )}
    </div>
  )
}

export default LenderMarketDetails
