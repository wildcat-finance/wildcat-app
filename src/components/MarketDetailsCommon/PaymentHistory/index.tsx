import React, { useState } from "react"
// import { DateValue } from "react-aria-components"
import dayjs from "dayjs"

// import { BigNumber } from "ethers"
import { Table, TableCell, TableRow } from "../../ui-components"
import { ExpandMore } from "../../ui-components/icons"
import { PaymentHistoryDetailsProps } from "./interface"
import { TOKEN_FORMAT_DECIMALS, trimAddress } from "../../../utils/formatters"
import { EtherscanLink } from "../../ui-components/EtherscanLink"

// function getFromToTimestamps(dateArray: DateValue[]) {
//   const fromTimestamp = dateArray[0]
//     ? Math.floor(dateArray[0].toDate("UTC").getTime() / 1000)
//     : 0
//   const toTimestamp = dateArray[1]
//     ? Math.floor(dateArray[1].toDate("UTC").getTime() / 1000)
//     : Math.floor(Date.now() / 1000)
//
//   return { fromTimestamp, toTimestamp }
// }

const DATE_FORMAT = "DD-MMM-YYYY HH:mm"

const PaymentHistory = ({ market }: PaymentHistoryDetailsProps) => {
  const [showHistory, setShowHistory] = useState(false)
  // const [dateArray, setDateArray] = useState<DateValue[]>([])

  // const { fromTimestamp, toTimestamp } = useMemo(
  //   () => getFromToTimestamps(dateArray),
  //   [dateArray],
  // )
  //
  // const isDatePicked = dateArray.length >= 1

  // const [isActivePage, setIsActivePage] = useState(1)
  //
  // function numberToArray(number: number) {
  //   const array = []
  //   for (let i = 1; i <= number; i += 1) {
  //     array.push(i)
  //   }
  //   return array
  // }

  // const handleDateReset = () => {
  //   setDateArray([])
  // }
  // const handleSecondDateChange = (date: DateValue) => {
  //   setDateArray([dateArray[0], date])
  // }
  // const handleFirstDateChange = (date: DateValue) => {
  //   setDateArray([date, dateArray[1]])
  // }
  const toggleAccordion = () => {
    setShowHistory(!showHistory)
  }

  // const { underlyingToken } = market

  return (
    <div className="mb-14">
      <div className="flex w-full justify-between content-center">
        <div className="text-base font-bold">Borrower Repayment History</div>
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
        <div className="mt-8">
          {/* <div className="flex justify-end items-center mb-5"> */}
          {/*  <div className="flex items-center gap-x-3"> */}
          {/*    <DatePickerInput */}
          {/*      placeholder="Date From" */}
          {/*      onChange={handleFirstDateChange} */}
          {/*      value={dateArray[0]} */}
          {/*    /> */}
          {/*    <DatePickerInput */}
          {/*      placeholder="Date To" */}
          {/*      onChange={handleSecondDateChange} */}
          {/*      value={dateArray[1]} */}
          {/*      minValue={dateArray[0]} */}
          {/*    /> */}
          {/*  </div> */}
          {/* </div> */}

          {/* {isDatePicked && ( */}
          {/*  <div className="flex justify-end items-center mb-5"> */}
          {/*    <Chip className="bg-white w-fit mb-3"> */}
          {/*      {dateArray[0]?.toString()} – {dateArray[1]?.toString()} */}
          {/*      <CancelRoundBlack */}
          {/*        className="ml-2 cursor-pointer" */}
          {/*        onClick={handleDateReset} */}
          {/*      /> */}
          {/*    </Chip> */}
          {/*  </div> */}
          {/* )} */}

          {/* {!isDatePicked && <div className="h-8 w-8 mb-3" />} */}

          <Table
            headers={[
              {
                title: "Sender",
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
                title: "Amount Repaid",
                align: "end",
              },
            ]}
          >
            {market.repaymentRecords.map((repayment) => (
              <TableRow key={repayment.blockTimestamp}>
                <TableCell justify="start">
                  <EtherscanLink kind="address" value={repayment.from}>
                    {trimAddress(repayment.from)}
                  </EtherscanLink>
                </TableCell>
                <TableCell justify="start">
                  <EtherscanLink kind="tx" value={repayment.transactionHash}>
                    {trimAddress(repayment.transactionHash, 24)}
                  </EtherscanLink>
                </TableCell>
                <TableCell justify="start">
                  {dayjs(repayment.blockTimestamp * 1000).format(DATE_FORMAT)}
                </TableCell>
                <TableCell justify="end">
                  {repayment.amount.format(TOKEN_FORMAT_DECIMALS, true)}
                </TableCell>
              </TableRow>
            ))}
          </Table>
          {/* <Spinner isLoading={!data} fixedDisable className="w-5 h-5 mt-2" /> */}
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

export default PaymentHistory
