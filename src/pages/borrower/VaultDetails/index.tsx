import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { DateValue } from "react-aria-components"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { FormSchema, validationSchema } from "./validationSchema"

import {
  Button,
  FormItem,
  Paper,
  NumberInput,
  TableItem,
  Chip,
  DatePickerInput,
  Table,
  TableRow,
  TableCell,
} from "../../../components/ui-components"
import { ServiceAgreementCard } from "../../../components/ServiceAgreementCard"

import {
  CancelRound,
  CancelRoundBlack,
  ExpandMore,
  Search,
  BackArrow,
} from "../../../components/ui-components/icons/index"

import {
  RemoveLendersModal,
  ModalAPR,
  CapacityModal,
  BorrowModal,
  RepayModal,
  NewLendersModal,
} from "./Modals"

const tableData = [
  {
    lender: "Hudson",
    dateSubmitted: "12-Jul-2023",
    dateExecuted: "12-Jul-2023",
    amount: "1,000 DAI",
    status: "Pending",
    wallet: "0x287324837498sjdf098234lkjsef08234af",
    txID: "0x7a8b19c62f3854a9e013d83663dbb6f6",
  },
  {
    lender: "Smith",
    dateSubmitted: "15-Jul-2023",
    dateExecuted: "20-Jul-2023",
    amount: "2,500 DAI",
    status: "Approved",
    wallet: "0x874329847234sjdf432432lkjsef82384ad",
    txID: "0x2e1d4f8a5c7f30b1498d67b20e9a1dc3",
  },
  {
    lender: "Johnson",
    dateSubmitted: "10-Jul-2023",
    dateExecuted: "12-Jul-2023",
    amount: "500 DAI",
    status: "Completed",
    wallet: "0x129084379012sjdf987651lkjsef76543az",
    txID: "0x9f6c57d183eba4c6b705d924a891e1f7",
  },
  {
    lender: "Brown",
    dateSubmitted: "18-Jul-2023",
    dateExecuted: "19-Jul-2023",
    amount: "3,000 DAI",
    status: "Rejected",
    wallet: "0x768209478645sjdf784356lkjsef76598ba",
    txID: "0x4b3e8a91c61d79f5ad35b286a7f2c8d8",
  },
  {
    lender: "Davis",
    dateSubmitted: "22-Jul-2023",
    dateExecuted: "25-Jul-2023",
    amount: "1,200 DAI",
    status: "Approved",
    wallet: "0x329847325478sjdf657890lkjsef23487cd",
    txID: "0xa1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d",
  },
  {
    lender: "Miller",
    dateSubmitted: "14-Jul-2023",
    dateExecuted: "16-Jul-2023",
    amount: "800 DAI",
    status: "Pending",
    wallet: "0x534982374568sjdf239804lkjsef65432fd",
    txID: "0x5c1d9e8f5a3f7b9d0c1b6d1c8e7f5b9a",
  },
  {
    lender: "Wilson",
    dateSubmitted: "11-Jul-2023",
    dateExecuted: "14-Jul-2023",
    amount: "1,750 DAI",
    status: "Completed",
    wallet: "0x784938274561sjdf128743lkjsef23467de",
    txID: "0x3d6a8e7f2b1c0d9f86a2b1d9c5a7f8b0",
  },
]

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
  const [accordionStates, setAccordionStates] = useState([true, true, true])
  const [isActivePage, setIsActivePage] = useState(1)
  const [dateArray, setDateArray] = useState<DateValue[]>([])

  const isDatePicked = dateArray.length >= 1

  const toggleAccordion = (index: number) => {
    const newAccordionStates = [...accordionStates]
    newAccordionStates[index] = !newAccordionStates[index]
    setAccordionStates(newAccordionStates)
  }

  const toggleAccordionIcon = (index: number) =>
    accordionStates[index] ? (
      <ExpandMore
        className="transform rotate-180"
        onClick={() => toggleAccordion(index)}
      />
    ) : (
      <ExpandMore onClick={() => toggleAccordion(index)} />
    )

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

  const handleFieldChange = (field: string, value: string | number) => {
    setValue(field as keyof typeof defaultDetails, String(value))
  }

  const handleClickMyVaults = () => {
    navigate("/borrower/my-vaults")
  }

  return (
    <div>
      <button
        className="flex items-center gap-x-2 mb-8 px-0"
        onClick={handleClickMyVaults}
      >
        <BackArrow />
        <p className="text-xs font-normal underline">My Markets</p>
      </button>
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
                  placeholder="000,00"
                  min={0}
                  max={100}
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
        <div className="flex justify-between items-center mb-8">
          <div className="text-base font-bold">Lender withdrawals</div>
          <div className="flex gap-x-7 items-center">
            <Chip color="green" className="w-fit !h-6 text-white">
              Ongoing cycle
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
            Owed after current cycle end
          </div>
          <Chip className="w-fit">15000 DAI</Chip>
        </div>
        <div className="h-12 flex justify-between items-center bg-tint-10 px-6">
          <div className="inline text-black text-xs font-bold">This cycle</div>
          <div className="flex gap-x-4 items-center">
            {toggleAccordionIcon(0)}
            <Chip className="w-fit">5000 DAI</Chip>
          </div>
        </div>
        {accordionStates[0] && (
          <Table
            headers={[
              {
                title: "Lender",
                align: "start",
                className: "w-40",
              },
              {
                title: "TxID",
                align: "start",
                className: "w-72",
              },
              {
                title: "Date submitted",
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
            Pending from past cycles
          </div>
          <div className="flex gap-x-4 items-center">
            {toggleAccordionIcon(1)}
            <Chip className="w-fit">5000 DAI</Chip>
          </div>
        </div>
        {accordionStates[1] && (
          <Table
            headers={[
              {
                title: "Lender",
                align: "start",
                className: "w-40",
              },
              {
                title: "TxID",
                align: "start",
                className: "w-72",
              },
              {
                title: "Date submitted",
                align: "start",
                className: "w-52",
              },
              {
                title: "Date queued",
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
      <div className="mb-14">
        <div className="text-base font-bold mb-8">Borrower payment history</div>
        <div className="flex justify-between items-center mb-5">
          <div className="flex">
            <button onClick={handleClickMyVaults}>
              <BackArrow />
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
              className: "w-40",
            },
            {
              title: "TxID",
              align: "start",
              className: "w-72",
            },
            {
              title: "Date submitted",
              align: "start",
              className: "w-52",
            },
            {
              title: "Date processed",
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
            // Todo: add key
            // eslint-disable-next-line react/no-array-index-key
            <TableRow key={index}>
              <TableCell justify="start">{item.lender}</TableCell>
              <TableCell justify="start">{item.wallet}</TableCell>
              <TableCell justify="center">
                {item.status === "Pending" && (
                  <Button
                    variant="white-brown"
                    className="max-h-5 w-24 gap-x-2.5"
                  >
                    Pending
                    <div className="flex items-center w-3 h-3">
                      <CancelRound />
                    </div>
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </div>

      <div className="flex w-full justify-between content-center">
        <div className="text-base font-bold">Market interaction history</div>
        <Button
          variant="outline"
          className="flex items-center gap-x-2"
          onClick={() => toggleAccordion(2)}
        >
          <p className="text-xs font-normal underline cursor-pointer">
            {accordionStates[2] ? "Hide History" : "Show History"}
          </p>
          {toggleAccordionIcon(2)}
        </Button>
      </div>
      {accordionStates[2] && (
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
