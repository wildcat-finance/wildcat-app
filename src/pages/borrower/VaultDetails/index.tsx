import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { DateValue } from "react-aria-components"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Button,
  FormItem,
  Paper,
  NumberInput,
  TableItem,
  Chip,
  DatePickerInput,
} from "../../../components/ui-components"
import { ServiceAgreementCard } from "../../../components/ServiceAgreementCard"

import arrowBack from "../../../components/ui-components/icons/arrow_back_ios.svg"
import expandMore from "../../../components/ui-components/icons/expand_more.svg"
import expandLess from "../../../components/ui-components/icons/expand_less.svg"
import {
  CancelRound,
  CancelRoundBlack,
  Search,
} from "../../../components/ui-components/icons/index"
import { FormSchema, validationSchema } from "./validationSchema"
import RemoveLendersModal from "./RemoveLendersModal"
import { NewLendersModal } from "./NewLendersModal"
import Table from "../../../components/ui-components/Table"
import TableRow from "../../../components/ui-components/Table/TableRow"
import { TableItem as TableItem2 } from "../../../components/ui-components/Table/TableItem"
import { ModalAPR } from "./ModalAPR"
import { CapacityModal } from "./CapacityModal"
import { BorrowModal } from "./BorrowModal"
import { RepayModal } from "./RepayModal"

const tableData = [
  {
    lender: "Hudson",
    dateSubmitted: "12-Jul-2023",
    dateExecuted: "12-Jul-2023",
    amount: "1,000 DAI",
    status: "Pending",
    wallet: "0x287324837498sjdf098234lkjsef08234af",
  },
  {
    lender: "Smith",
    dateSubmitted: "15-Jul-2023",
    dateExecuted: "20-Jul-2023",
    amount: "2,500 DAI",
    status: "Approved",
    wallet: "0x874329847234sjdf432432lkjsef82384ad",
  },
  {
    lender: "Johnson",
    dateSubmitted: "10-Jul-2023",
    dateExecuted: "12-Jul-2023",
    amount: "500 DAI",
    status: "Completed",
    wallet: "0x129084379012sjdf987651lkjsef76543az",
  },
  {
    lender: "Brown",
    dateSubmitted: "18-Jul-2023",
    dateExecuted: "19-Jul-2023",
    amount: "3,000 DAI",
    status: "Rejected",
    wallet: "0x768209478645sjdf784356lkjsef76598ba",
  },
  {
    lender: "Davis",
    dateSubmitted: "22-Jul-2023",
    dateExecuted: "25-Jul-2023",
    amount: "1,200 DAI",
    status: "Approved",
    wallet: "0x329847325478sjdf657890lkjsef23487cd",
  },
  {
    lender: "Miller",
    dateSubmitted: "14-Jul-2023",
    dateExecuted: "16-Jul-2023",
    amount: "800 DAI",
    status: "Pending",
    wallet: "0x534982374568sjdf239804lkjsef65432fd",
  },
  {
    lender: "Wilson",
    dateSubmitted: "11-Jul-2023",
    dateExecuted: "14-Jul-2023",
    amount: "1,750 DAI",
    status: "Completed",
    wallet: "0x784938274561sjdf128743lkjsef23467de",
  },
]

// const vaultData = {
//   Capacity: "50,000 DAI",
//   APR: "10%",
//   PenaltyRate: "10%",
//   MinimumReserveRatio: "25%",
//   WithdrawalCycle: "48 hours",
//   MaxGracePeriod: "24 hours",
//   CurrentSupply: "24 hours",
//   MinimumReservesRequired: "25%",
//   CurrentReserves: "9,000 DAI",
//   CurrentReserveRatio: "144%",
//   Withdrawn: "0 DAI",
//   UpcomingWithdrawals: "0 DAI",
//   IncurredInterests: "10%",
//   AvailableForWithdrawal: "3 DAI",
// }

const defaultDetails: FormSchema = {
  borrow: "",
  repay: "",
  annualInterestRate: "",
  capacity: "",
}

function numberToArray(number: number) {
  const array = []
  for (let i = 1; i <= number; i += 1) {
    array.push(i)
  }
  return array
}

function VaultDetails() {
  const navigate = useNavigate()
  const [isExpanded, setIsExpanded] = useState(true)
  const [isActivePage, setIsActivePage] = useState(1)
  const [dateArray, setDateArray] = useState<DateValue[]>([])

  const isDatePicked = dateArray.length >= 1

  const handleFirstDateChange = (date: DateValue) => {
    setDateArray([date, dateArray[1]])
  }

  const handleSecondDateChange = (date: DateValue) => {
    setDateArray([dateArray[0], date])
  }

  const handleDateReset = () => {
    setDateArray([])
  }

  const { setValue } = useForm<FormSchema>({
    defaultValues: defaultDetails,
    resolver: zodResolver(validationSchema),
    mode: "onBlur",
  })

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded)
  }

  const handleClickMyVaults = () => {
    navigate("/borrower/my-vaults")
  }

  const expandIcon = isExpanded ? expandLess : expandMore

  const handleFieldChange = (field: string, value: string | number) => {
    setValue(field as keyof typeof defaultDetails, String(value))
  }

  return (
    <div>
      <Button
        variant="outline"
        className="flex items-center gap-x-2 mb-8 px-0"
        onClick={handleClickMyVaults}
      >
        <img src={arrowBack} alt="Back" />
        <p className="text-xs font-normal underline">My Markets</p>
      </Button>
      <div className="text-green text-2xl font-bold mb-8 w-2/3">
        Blossom Dai Stablecoin
      </div>
      <Paper className="flex flex-col gap-y-5 border-0 px-6 py-5 mb-14 bg-tint-10 border-tint-8 rounded-3xl">
        <div>
          <div className="w-full flex justify-between items-center">
            <div className="font-bold">Borrow</div>
            <div className="flex gap-x-3.5 w-full max-w-lg">
              <NumberInput
                decimalScale={4}
                onChange={(value) => handleFieldChange("borrow", value)}
                className="w-full"
                placeholder="00,000.00"
              />
              <BorrowModal />
            </div>
          </div>
          <div className="text-xxs text-right mt-1.5 mr-48">
            <span className="font-semibold">Borrow up to </span>
          </div>
        </div>
        <div>
          <div className="w-full flex justify-between">
            <div className="font-bold mt-3">Repay</div>
            <div className="flex items-center gap-x-3.5 w-full max-w-lg">
              <div className="w-full">
                <NumberInput
                  decimalScale={4}
                  className="w-full"
                  placeholder="00,000.00"
                  min={0}
                  max={9000}
                  onChange={(value) => handleFieldChange("repay", value)}
                />
                <div className="text-xxs text-right mt-1.5 mr-auto pr-1.5 w-full">
                  <span className="font-semibold">Repay up to </span>
                </div>
              </div>
              <div className="w-44 flex flex-col gap-y-1.5">
                <RepayModal />
                <Button
                  variant="green"
                  className="w-full px-2 whitespace-nowrap"
                >
                  Repay to minimum reserve ratio
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="w-full flex justify-between">
            <div className="font-bold mt-3">Annual interest rate (%)</div>
            <div className="flex items-center gap-x-3.5 w-full max-w-lg">
              <div className="w-full">
                <NumberInput
                  decimalScale={2}
                  className="w-full"
                  placeholder="00,000.00"
                  min={0}
                  max={9000}
                  onChange={(value) =>
                    handleFieldChange("annualInterestRate", value)
                  }
                />
                <div className="text-xxs text-right mt-1.5 mr-auto pr-1.5 w-full">
                  <span className="font-semibold">Current </span>
                </div>
              </div>
              <div className="w-44 flex flex-col gap-y-1.5">
                <ModalAPR />
                <Button variant="red" className="w-44 px-2 whitespace-nowrap">
                  Terminate Market
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="w-full flex justify-between items-center">
            <div className="font-bold">Capacity</div>
            <div className="flex gap-x-3.5 w-full max-w-lg">
              <NumberInput
                decimalScale={4}
                onChange={(value) => handleFieldChange("capacity", value)}
                className="w-full"
                placeholder="10.00"
                min={0}
              />
              <CapacityModal />
            </div>
          </div>
          <div className="text-xxs text-right mt-1.5 mr-48">
            <span className="font-semibold">Current </span>
          </div>
        </div>
      </Paper>
      <div className="mb-14">
        <div className="flex justify-between mb-3">
          <div className="text-base font-bold">Withdrawals</div>
          <div className="flex gap-16">
            <div className="flex gap-x-2">
              <div className="inline text-black text-xs font-bold">
                Cycle start
              </div>
              <div className="text-black text-xs">23-Dec-2023</div>
            </div>
            <div className="flex gap-x-2">
              <div className="inline text-black text-xs font-bold">
                Cycle end
              </div>
              <div className="text-black text-xs">25-Dec-2023</div>
            </div>
          </div>
        </div>
        <div className="flex gap-x-1 mb-6">
          <div className="inline text-black text-xs font-bold">
            Pending withdrawal in current cycle:
          </div>
          <div className="text-black text-xs">5,000 DAI</div>
        </div>
        <div className="flex justify-between items-center mb-5">
          <div className="flex">
            <button onClick={handleClickMyVaults}>
              <img src={arrowBack} alt="Back" className="h-3 w-3" />
            </button>
            <div className="flex gap-x-5">
              <div className="text-black text-xs underline">19-20 Dec-2023</div>
              <div className="text-black text-xs underline">21-22-Dec-2023</div>
              <div className="text-black text-xs underline">21-22-Dec-2023</div>
              <div className="inline text-black text-xs font-bold">
                Current cycle
              </div>
            </div>
          </div>
          <div className="flex items-center gap-x-3">
            <DatePickerInput
              placeholder="Date from"
              onChange={handleFirstDateChange}
              value={dateArray[0]}
            />
            <DatePickerInput
              placeholder="Date to"
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
            },
            {
              title: "Date submitted",
              align: "end",
              className: "w-40",
            },
            {
              title: "Date executed",
              align: "end",
              className: "w-40",
            },
            {
              title: "Amount",
              align: "end",
              className: "w-40",
            },
            {
              title: "Status",
              align: "end",
              className: "w-40",
            },
          ]}
        >
          {tableData.map((item) => (
            <TableRow key={item.wallet}>
              <TableItem2 justify="start">{item.lender}</TableItem2>
              <TableItem2 justify="end">{item.dateSubmitted}</TableItem2>
              <TableItem2 justify="end">{item.dateExecuted}</TableItem2>
              <TableItem2 justify="end">{item.amount}</TableItem2>
              <TableItem2 justify="end">{item.status}</TableItem2>
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
      <div className="text-base font-bold">Details</div>
      <div className="flex w-full mt-5 mb-14">
        <div className="w-full">
          <TableItem
            title="Capacity"
            value="50,000 DAI"
            className="pl-6 pr-24"
          />
          <TableItem title="APR" value="10%" className="pl-6 pr-24" />
          <TableItem title="Penalty Rate" value="10%" className="pl-6 pr-24" />
          <TableItem
            title="Minimum Reserve Ratio"
            value="25%"
            className="pl-6 pr-24"
          />
          <TableItem
            title="Withdrawal Cycle"
            value="48 hours"
            className="pl-6 pr-24"
          />
          <TableItem
            title="Max Grace Period"
            value="24 hours"
            className="pl-6 pr-24"
          />
          <TableItem
            title="Available Grace"
            value="12 hours"
            className="pl-6 pr-24"
          />
          <TableItem title="" value="" className="pl-6 pr-24" />
        </div>
        <div className="w-full">
          <TableItem
            title="Current Supply"
            value="24 hours"
            className="pr-6 pl-24"
          />
          <TableItem
            title="Minimum Reserves Required"
            value="25%"
            className="pr-6 pl-24"
          />
          <TableItem
            title="Current Reserves"
            value="9,000 DAI"
            className="pr-6 pl-24"
          />
          <TableItem
            title="Current Reserve Ratio"
            value="144%"
            className="pr-6 pl-24"
          />
          <TableItem title="Withdrawn" value="0 DAI" className="pr-6 pl-24" />
          <TableItem
            title="Upcoming Withdrawals"
            value="0 DAI"
            className="pr-6 pl-24"
          />
          <TableItem
            title="Incurred Interests"
            value="10%"
            className="pr-6 pl-24"
          />
          <TableItem
            title="Available for Withdrawal"
            value="3 DAI"
            className="pr-6 pl-24"
          />
        </div>
      </div>

      <div className="flex w-full justify-between content-center">
        <div className="text-base font-bold">Lenders</div>
        <div className="flex gap-x-2">
          <NewLendersModal />
          <RemoveLendersModal lenders={tableData} />
        </div>
      </div>
      <div className="mt-5 mb-14">
        <Table
          headers={[
            {
              title: "Name",
              align: "start",
              className: "w-44",
            },
            {
              title: "Wallet",
              align: "start",
            },
            {
              title: "",
              align: "start",
              className: "w-24",
            },
          ]}
        >
          {tableData.map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <TableRow key={index}>
              <TableItem2 justify="start">{item.lender}</TableItem2>
              <TableItem2 justify="end">{item.wallet}</TableItem2>
              <TableItem2 justify="end">
                <Button
                  variant={item.status === "Pending" ? "white-brown" : "red"}
                  className="max-h-5 w-24 gap-x-2.5"
                >
                  {item.status === "Pending" ? "Pending" : "Remove"}
                  <div className="flex items-center w-3 h-3">
                    <CancelRound />
                  </div>
                </Button>
              </TableItem2>
            </TableRow>
          ))}
        </Table>
      </div>

      <div className="flex w-full justify-between content-center">
        <div className="text-base font-bold">Market interaction history</div>
        <Button
          variant="outline"
          className="flex items-center gap-x-2"
          onClick={toggleAccordion}
        >
          <p className="text-xs font-normal underline cursor-pointer">
            {isExpanded ? "Hide History" : "Show History"}
          </p>
          <img src={expandIcon} className="w-5" alt="Back" />
        </Button>
      </div>
      {isExpanded && (
        <Paper className="border-tint-10 mt-5 bg-white h-48 p-5 flex flex-col gap-y-6 overflow-auto">
          <div className="text-xs">
            <div>1 Sep 2023; 13:37:00</div>
            Lender 0xdeadbeef deposited 10 DAI (example)
          </div>
          <div className="text-xs">
            <div>28 Aug 2023; 14:24:38</div>
            Borrower returned 1,000 DAI to market, new reserve ratio XX%
            (example)
          </div>
          <div className="text-xs">
            <div>28 Aug 2023; 14:24:38</div>
            Lender 0xcatcafe made withdrawal request for 9,000 DAI: 4,000 DAI
            added to the reserved assets pool, 5,000 DAI pending (example)
          </div>
        </Paper>
      )}

      <div className="text-base font-bold mt-14">
        Market Controller / Some title
      </div>
      <div className="flex flex-wrap gap-x-7 mb-14 mt-5">
        <FormItem className="w-72" label="Market type" tooltip="test">
          <NumberInput className="w-72" />
        </FormItem>
        <FormItem
          className="w-72"
          label="Market contract address"
          tooltip="test"
        >
          <NumberInput className="w-72" />
        </FormItem>
      </div>

      <div className="flex justify-between items-center">
        <ServiceAgreementCard
          title="Market Master Loan Agreement"
          description="You signed the blsmDAI Master Loan Agreement on 17-Sept-2023"
        />
      </div>

      <ServiceAgreementCard
        className="mt-10"
        title="Wildcat Service Agreement"
        description="You agreed to the Wildcat Service Agreement on 12-Sept-2023"
      />
    </div>
  )
}

export default VaultDetails
