import React, { useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { DateValue } from "react-aria-components"

import {
  Chip,
  DatePickerInput,
  Table,
  TableCell,
  TableRow,
} from "../../../../components/ui-components"
import {
  CancelRoundBlack,
  ExpandMore,
  Search,
} from "../../../../components/ui-components/icons"
import { PaymentHistoryDetailsProps } from "./type"
import { useGetBorrowerRepayments } from "../../../borrower/VaultDetails/hooks/useGetBorrowerRepayments"

function getFromToTimestamps(dateArray: DateValue[]) {
  const fromTimestamp = dateArray[0]
    ? Math.floor(dateArray[0].toDate("UTC").getTime() / 1000)
    : 0
  const toTimestamp = dateArray[1]
    ? Math.floor(dateArray[1].toDate("UTC").getTime() / 1000)
    : Math.floor(Date.now() / 1000)

  return { fromTimestamp, toTimestamp }
}

export const BorrowersPaymentHistory = ({
  marketAddress,
}: PaymentHistoryDetailsProps) => {
  const [showHistory, setShowHistory] = useState(true)
  const [dateArray, setDateArray] = useState<DateValue[]>([])
  const navigate = useNavigate()

  const { fromTimestamp, toTimestamp } = useMemo(
    () => getFromToTimestamps(dateArray),
    [dateArray],
  )

  const { data } = useGetBorrowerRepayments(
    marketAddress,
    fromTimestamp,
    toTimestamp,
  )

  const isDatePicked = dateArray.length >= 1

  const handleClickMyVaults = () => {
    navigate("/borrower/my-vaults")
  }

  // const [isActivePage, setIsActivePage] = useState(1)
  //
  // function numberToArray(number: number) {
  //   const array = []
  //   for (let i = 1; i <= number; i += 1) {
  //     array.push(i)
  //   }
  //   return array
  // }

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
          <div className="flex justify-end items-center mb-5">
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
                minValue={dateArray[0]}
              />
            </div>
          </div>

          {isDatePicked && (
            <div className="flex justify-end items-center mb-5">
              <Chip className="bg-white w-fit mb-3">
                {dateArray[0]?.toString()} – {dateArray[1]?.toString()}
                <CancelRoundBlack
                  className="ml-2 cursor-pointer"
                  onClick={handleDateReset}
                />
              </Chip>
            </div>
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
            {data &&
              data.map((repayment) => (
                <TableRow key={repayment.blockTimestamp}>
                  <TableCell justify="start">{repayment.from}</TableCell>
                  <TableCell justify="start">
                    {repayment.transactionHash}
                  </TableCell>
                  <TableCell justify="start">
                    {repayment.blockTimestamp}
                  </TableCell>
                  <TableCell justify="start">
                    {repayment.blockTimestamp}
                  </TableCell>
                  <TableCell justify="end">{repayment.assetAmount}</TableCell>
                </TableRow>
              ))}
          </Table>
          {/* <div className="flex justify-center gap-x-1 text-xxs mt-6"> */}
          {/*  {numberToArray(4).map((item) => ( */}
          {/*    <button */}
          {/*      key={item} */}
          {/*      onClick={() => setIsActivePage(item)} */}
          {/*      className={`${isActivePage === item ? "font-bold" : ""}`} */}
          {/*    > */}
          {/*      {item} */}
          {/*    </button> */}
          {/*  ))} */}
          {/* </div> */}
        </div>
      )}
    </div>
  )
}
