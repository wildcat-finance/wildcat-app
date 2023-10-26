import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useController, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { ServiceAgreementCard } from "../../../components/ServiceAgreementCard"
import {
  Paper,
  Chip,
  Button,
  FormItem,
  Select,
  FormNumberInput,
  TextInput,
  Modal,
} from "../../../components/ui-components"
import { TokenSelector } from "./TokenSelector"

import { SignIcon } from "../../../components/ui-components/icons"
import arrowBack from "../../../components/ui-components/icons/arrow_back_ios.svg"

import { validationSchema, FormSchema } from "./validationSchema"
import { SelectOptionItem } from "../../../components/ui-components/Select/interface"
import { mockedVaultTypes } from "../../../mocks/vaults"

const mockedVaultTypesOptions: SelectOptionItem[] = mockedVaultTypes.map(
  (vaultType) => ({
    id: vaultType,
    label: vaultType,
    value: vaultType,
  }),
)

const mockedNewMarket = {
  vaultType: "Market Type",
  underlyingToken: "DAI",
  namePrefix: "Blossom Dai Stablecoin",
  symbolPrefix: "blsmDAI",
  maxAmount: 30000,
  annualRate: 10,
  penaltyRate: 10,
  reserveRatio: 10,
  gracePeriod: 24,
  withdrawalCycle: 48,
}

const defaultVault: FormSchema = {
  vaultType: "",
  underlyingToken: "",
  namePrefix: "",
  symbolPrefix: "",
  maxAmount: 0,
  annualRate: 0,
  penaltyRate: 0,
  reserveRatio: 0,
  gracePeriod: 0,
  withdrawalCycle: 0,
}

const AddNewVault = () => {
  const {
    control,
    formState: { errors: formErrors },
  } = useForm<FormSchema>({
    defaultValues: defaultVault,
    resolver: zodResolver(validationSchema),
    mode: "onBlur",
  })
  const navigate = useNavigate()

  const [selectedVault, setSelectedVault] = useState<SelectOptionItem | null>(
    null,
  )

  const handleClickMyVaults = () => {
    navigate("/borrower/my-vaults")
  }

  const { field: namePrefixField } = useController({
    name: "namePrefix",
    control,
  })

  const { field: symbolPrefixField } = useController({
    name: "symbolPrefix",
    control,
  })

  const handleVaultSelect = (value: SelectOptionItem | null) => {
    setSelectedVault(value)
  }

  return (
    <div>
      <Button
        variant="outline"
        className="flex items-center gap-x-2 mb-8"
        onClick={handleClickMyVaults}
      >
        <img src={arrowBack} alt="Back" />
        <p className="text-xs font-normal underline">My Markets</p>
      </Button>
      <div className="text-green text-2xl font-bold mb-8 w-2/3">New Market</div>

      <Paper className="p-8 bg-tint-10 border-tint-8">
        <form className="flex flex-col items-start">
          <FormItem
            label="Market Type"
            className="mb-5 pb-4"
            error={Boolean(formErrors.vaultType?.message)}
            errorText={formErrors.vaultType?.message}
            tooltip="Dictates market logic and enforces minimum and maximum
                     values on the parameters you provide below."
          >
            <Select
              selected={selectedVault}
              options={mockedVaultTypesOptions}
              onChange={handleVaultSelect}
            />
          </FormItem>

          <FormItem
            label="Underlying Asset"
            className="mb-5 pb-4"
            error={Boolean(formErrors.underlyingToken?.message)}
            errorText={formErrors.underlyingToken?.message}
            tooltip="The token that you want to borrow, e.g. WETH, DAI, CRV."
          >
            <TokenSelector />
          </FormItem>

          <FormItem
            label="Market Token Name Prefix"
            className="mb-5 pb-4"
            endDecorator={<Chip className="w-32 ml-3">Dai Stablecoin</Chip>}
            error={Boolean(formErrors.namePrefix?.message)}
            errorText={formErrors.namePrefix?.message}
            tooltip="The identifier that attaches to the front of the name of the underlying
                                asset in order to distinguish the market token issued to lenders.
                                For example, entering 'Test' here when the underlying asset is Dai
                                Stablecoin will result in your lenders being issued a market token
                                named Test Dai Stablecoin."
          >
            <TextInput
              {...namePrefixField}
              className="w-72"
              error={Boolean(formErrors.namePrefix?.message)}
            />
          </FormItem>

          <FormItem
            label="Market Token Symbol Prefix"
            className="mb-5 pb-4"
            endDecorator={<Chip className="w-32 ml-3">DAI</Chip>}
            error={Boolean(formErrors.symbolPrefix?.message)}
            errorText={formErrors.symbolPrefix?.message}
            tooltip="Symbol version of the market token to be issued to lenders (e.g. TSTDAI)."
          >
            <TextInput
              {...symbolPrefixField}
              className="w-72"
              error={Boolean(formErrors.symbolPrefix?.message)}
            />
          </FormItem>

          <FormNumberInput
            decimalScale={4}
            label="Market Capacity"
            endDecorator={<Chip className="w-32 ml-3">DAI</Chip>}
            control={control}
            formErrors={formErrors}
            name="maxAmount"
            inputClass="w-72"
            tooltip="Maximum quantity of underlying assets that you wish to borrow from lenders."
          />

          <FormNumberInput
            decimalScale={2}
            label="Minimum Reserve Ratio"
            endDecorator={
              <Chip className="w-11 justify-center font-bold">%</Chip>
            }
            control={control}
            formErrors={formErrors}
            name="reserveRatio"
            tooltip="Minimum deposits you need to keep within your market to avoid triggering
                     a penalty, calculated as a percentage of your outstanding debt (ie. total 
                     amount of market tokens in circulation). You cannot withdraw reserved assets 
                     from your vault, but you still pay interest on them."
          />

          <FormNumberInput
            decimalScale={2}
            label="APR"
            max={100}
            endDecorator={
              <Chip className="w-11 justify-center font-bold">%</Chip>
            }
            control={control}
            formErrors={formErrors}
            name="annualRate"
            tooltip="Annual interest rate that you are offering to your lenders for 
                     depositing underlying assets into this market for you to borrow.
                     Note that your actual interest rate might be higher than the APR
                     if you have selected a market type that imposes a protocol fee."
          />

          <FormNumberInput
            decimalScale={2}
            label="Penalty Rate:"
            max={100}
            endDecorator={
              <Chip className="w-11 justify-center font-bold">%</Chip>
            }
            control={control}
            formErrors={formErrors}
            name="penaltyRate"
            tooltip={`Annual interest rate that you are subject to pay - in addition
                      to the lender APR - in the event that your market reserves go
                      below your minimum reserve (i.e. delinquent).`}
          />

          <FormNumberInput
            decimalScale={1}
            label="Grace Period Duration:"
            endDecorator={
              <Chip className="w-11 justify-center font-bold">Hours</Chip>
            }
            control={control}
            formErrors={formErrors}
            name="gracePeriod"
            tooltip="Rolling period for which you are allowed to have deposits below 
                     your minimum reserve before the penalty rate is triggered."
          />

          <FormNumberInput
            decimalScale={1}
            label="Withdrawal Cycle Duration"
            endDecorator={
              <Chip className="w-11 justify-center font-bold">hours</Chip>
            }
            control={control}
            formErrors={formErrors}
            name="withdrawalCycle"
            tooltip="When no cycle is currently active and a lender submits a withdrawal 
                     request, the withdrawal cycle starts. During the withdrawal cycle 
                     duration, other lenders can submit their withdrawal requests. When 
                     the withdrawal cycle concludes, withdrawal requests get paid in 
                     accordance with the rules of our Service Agreement. Withdrawal cycles 
                     are not rolling: at the conclusion of one cycle, the next one will 
                     not begin until the next withdrawal request."
          />

          <div>
            <div
              className="flex justify-between items-start mb-5"
              style={{ width: "236px" }}
            >
              <label className="font-bold text-xxs">
                Master Loan Agreement
              </label>
            </div>

            <div className="text-xxs">
              As a borrower, you must read and sign the
              <span className="text-xxs font-bold">
                {" "}
                Wildcat Master Loan Agreement{" "}
              </span>
              for this market before creation. to create this market.
            </div>
            <div className="text-xxs">
              Note that each lender signature of the MLA will be optional in
              case you both prefer using your own off-platform agreements.
            </div>

            <Button className="mt-5" variant="blue" icon={<SignIcon />}>
              Sign
            </Button>
          </div>
        </form>
        <Modal
          buttonClassName="mt-10"
          buttonName="Submit and Create Market"
          buttonColor="blue"
          sign
        >
          <div className="text-center text-base font-bold">
            Pending Market Details
          </div>
          <div className="w-full border border-tint-10 my-6" />
          <div className="grid grid-rows-5 grid-cols-2 gap-x-8 gap-y-7 px-8">
            <FormItem label="Market Type">
              <input
                className="w-44 h-8 px-3 py-3 text-xxs bg-tint-7.5 border border-tint-8.5 text-black"
                value={mockedNewMarket.vaultType}
                disabled
              />
            </FormItem>
            <FormItem label="Underlying Asset">
              <input
                className="w-44 h-8 px-3 py-3 text-xxs bg-tint-7.5 border border-tint-8.5 text-black"
                value={mockedNewMarket.underlyingToken}
                disabled
              />
            </FormItem>
            <FormItem label="Market Token Name">
              <input
                className="w-44 h-8 px-3 py-3 text-xxs bg-tint-7.5 border border-tint-8.5 text-black"
                value={mockedNewMarket.namePrefix}
                disabled
              />
            </FormItem>
            <FormItem label="Market Token Symbol">
              <input
                className="w-44 h-8 px-3 py-3 text-xxs bg-tint-7.5 border border-tint-8.5 text-black"
                value={mockedNewMarket.symbolPrefix}
                disabled
              />
            </FormItem>
            <FormItem label="Market Capacity">
              <input
                className="w-44 h-8 px-3 py-3 text-xxs bg-tint-7.5 border border-tint-8.5 text-black"
                value={`${mockedNewMarket.maxAmount} ${mockedNewMarket.underlyingToken}`}
                disabled
              />
            </FormItem>
            <FormItem label="Minimum Reserve Ratio">
              <input
                className="w-44 h-8 px-3 py-3 text-xxs bg-tint-7.5 border border-tint-8.5 text-black"
                value={`${mockedNewMarket.reserveRatio}%`}
                disabled
              />
            </FormItem>
            <FormItem label="APR">
              <input
                className="w-44 h-8 px-3 py-3 text-xxs bg-tint-7.5 border border-tint-8.5 text-black"
                value={`${mockedNewMarket.annualRate}%`}
                disabled
              />
            </FormItem>
            <FormItem label="Penalty Rate">
              <input
                className="w-44 h-8 px-3 py-3 text-xxs bg-tint-7.5 border border-tint-8.5 text-black"
                value={`${mockedNewMarket.penaltyRate}%`}
                disabled
              />
            </FormItem>
            <FormItem label="Grace Period Duration">
              <input
                className="w-44 h-8 px-3 py-3 text-xxs bg-tint-7.5 border border-tint-8.5 text-black"
                value={`${mockedNewMarket.gracePeriod} Hours`}
                disabled
              />
            </FormItem>
            <FormItem label="Withdrawal Cycle Duration">
              <input
                className="w-44 h-8 px-3 py-3 text-xxs bg-tint-7.5 border border-tint-8.5 text-black"
                value={`${mockedNewMarket.withdrawalCycle} Hours`}
                disabled
              />
            </FormItem>
          </div>
          <div className="w-full border border-tint-10 mt-9 mb-3.5" />
          <div className="w-72 m-auto leading-3 font-light text-xxs text-center">
            Please review your market parameters before confirming creation.
            Note that once your market is created, you will only be able to
            adjust your APR and market capacity.
          </div>
        </Modal>
      </Paper>

      <ServiceAgreementCard
        className="mt-10"
        title="Wildcat Service Agreement"
        description="You agreed to the Wildcat Service Agreement on 12-Sept-2023"
      />
    </div>
  )
}

export default AddNewVault
