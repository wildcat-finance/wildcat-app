import { useNavigate } from "react-router-dom"
import React, { useState } from "react"
import { DateValue } from "react-aria-components"
import {
  Chip,
  DatePickerInput,
  Table,
  TableCell,
  TableRow,
} from "../../../../components/ui-components"
import {
  BackArrow,
  CancelRoundBlack,
  ExpandMore,
  Search,
} from "../../../../components/ui-components/icons"
import { PaymentHistoryDetailsProps } from "./type"

const PaymentHistory = ({ tableData }: PaymentHistoryDetailsProps) => {
  const [showHistory, setShowHistory] = useState(true)
  const [dateArray, setDateArray] = useState<DateValue[]>([])
  const isDatePicked = dateArray.length >= 1
  const navigate = useNavigate()
  const handleClickMyVaults = () => {
    navigate("/borrower/my-vaults")
  }
  const [isActivePage, setIsActivePage] = useState(1)
  function numberToArray(number: number) {
    const array = []
    for (let i = 1; i <= number; i += 1) {
      array.push(i)
    }
    return array
  }
  const handleDateReset = () => {
    setDateArray([])
  }
  const handleSecondDateChange = (date: DateValue) => {
    setDateArray([dateArray[0], date])
  }
  const handleFirstDateChange = (date: DateValue) => {
    setDateArray([date, dateArray[1]])
  }
  const toggleAccordion = () => {
    setShowHistory(!showHistory)
  }

  return (
    <div className="mb-14">
      <div className="text-base font-bold mb-8" />
      <div className="flex w-full justify-between content-center mb-8">
        <div className="text-base font-bold">Borrower Payment History</div>
        <button
          className="flex items-center gap-x-2"
          onClick={() => toggleAccordion()}
        >
          <p className="text-xs font-normal underline cursor-pointer">
            {showHistory ? "Hide History" : "Show History"}
          </p>
          {showHistory ? (
            <ExpandMore
              className="transform rotate-180"
              onClick={() => toggleAccordion()}
            />
          ) : (
            <ExpandMore onClick={() => toggleAccordion()} />
          )}
        </button>
      </div>
      {showHistory && (
        <div>
          <div className="flex justify-between items-center mb-5">
            <div className="flex">
              <button onClick={handleClickMyVaults}>
                <BackArrow />
              </button>
              <div className="flex gap-x-5">
                <div className="text-black text-xs underline">
                  19-20 Dec-2023
                </div>
                <div className="text-black text-xs underline">
                  21-22-Dec-2023
                </div>
                <div className="text-black text-xs underline">
                  21-22-Dec-2023
                </div>
                <div className="inline text-black text-xs font-bold">
                  Current Cycle
                </div>
              </div>
            </div>
            <div className="flex items-center gap-x-3">
              <DatePickerInput
                placeholder="Date From"
                onChange={handleFirstDateChange}
                value={dateArray[0]}
              />
              <DatePickerInput
                placeholder="Date To"
                onChange={handleSecondDateChange}
                value={dateArray[1]}
              />
              <button onClick={handleClickMyVaults}>
                <Search className="h-6 w-6" />
              </button>
            </div>
          </div>
          {isDatePicked && (
            <Chip className="bg-white w-fit mb-3">
              {dateArray[0]?.toString()} – {dateArray[1]?.toString()}
              <CancelRoundBlack
                className="ml-2 cursor-pointer"
                onClick={handleDateReset}
              />
            </Chip>
          )}
          {!isDatePicked && <div className="h-8 w-8 mb-3" />}
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
                title: "Date Processed",
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
                <TableCell justify="start">{item.dateSubmitted}</TableCell>
                <TableCell justify="start">{item.dateExecuted}</TableCell>
                <TableCell justify="end">{item.amount}</TableCell>
              </TableRow>
            ))}
          </Table>
          <div className="flex justify-center gap-x-1 text-xxs mt-6">
            {numberToArray(4).map((item) => (
              <button
                key={item}
                onClick={() => setIsActivePage(item)}
                className={`${isActivePage === item ? "font-bold" : ""}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default PaymentHistory
