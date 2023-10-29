import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Token } from "@wildcatfi/wildcat-sdk"

import { Text } from "react-aria-components"
import { ServiceAgreementCard } from "../../../components/ServiceAgreementCard"
import {
  Paper,
  Chip,
  Button,
  FormItem,
  Select,
  TextInput,
  NumberInput,
  Spinner,
} from "../../../components/ui-components"
import { TokenSelector } from "./TokenSelector"

import { SignIcon } from "../../../components/ui-components/icons"
import arrowBack from "../../../components/ui-components/icons/arrow_back_ios.svg"
import { SelectOptionItem } from "../../../components/ui-components/Select/interface"
import { mockedVaultTypes } from "../../../mocks/vaults"
import { useDeployMarket } from "./hooks/useDeployMarket"
import { useTokenMetadata } from "../hooks/useTokenMetaData"
import { MarketPreviewModal } from "./MarketPreviewModal"
import { useNewMarketForm } from "./hooks/useNewMarketForm"
import { useGetController } from "../hooks/useGetController"

const mockedVaultTypesOptions: SelectOptionItem[] = mockedVaultTypes.map(
  (vaultType) => ({
    id: vaultType,
    label: vaultType,
    value: vaultType,
  }),
)

const AddNewVault = () => {
  const { handleSubmit, getValues, setValue, watch, register, formErrors } =
    useNewMarketForm()
  const { data: controller, isLoading: isControllerLoading } =
    useGetController()
  const [tokenAsset, setTokenAsset] = useState<Token | undefined>()
  const { deployNewMarket, isDeploying } = useDeployMarket()
  const navigate = useNavigate()
  const [selectedVault, setSelectedVault] = useState<SelectOptionItem | null>(
    null,
  )

  const handleClickMyVaults = () => {
    navigate("/borrower/my-vaults")
  }

  const handleVaultSelect = (value: SelectOptionItem | null) => {
    setSelectedVault(value)
  }

  const assetWatch = watch("asset")

  const { data: assetData, isLoading: assetDataLoading } = useTokenMetadata({
    address: assetWatch.toLowerCase(),
  })

  useEffect(() => {
    setTokenAsset(assetData)
  }, [assetData])

  const handleDeployMarket = () => {
    const marketParams = getValues()

    if (assetData && tokenAsset) {
      deployNewMarket({
        ...marketParams,
        annualInterestBips: Number(marketParams.annualInterestBips) * 100,
        delinquencyFeeBips: Number(marketParams.delinquencyFeeBips) * 100,
        reserveRatioBips: Number(marketParams.reserveRatioBips) * 100,
        delinquencyGracePeriod: Number(marketParams.delinquencyGracePeriod),
        withdrawalBatchDuration: Number(marketParams.withdrawalBatchDuration),
        maxTotalSupply: Number(marketParams.maxTotalSupply) * 100,
        asset: assetData,
      })
    }
  }

  const isLoading = assetDataLoading || isDeploying || isControllerLoading

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
        <form
          className="flex flex-col items-start"
          onSubmit={handleSubmit(handleDeployMarket)}
        >
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
              noneOption={false}
            />
          </FormItem>

          <FormItem
            label="Underlying Asset"
            className="mb-5 pb-4"
            error={Boolean(formErrors.asset?.message)}
            errorText={formErrors.asset?.message}
            tooltip="The token that you want to borrow, e.g. WETH, DAI, CRV."
          >
            <TokenSelector onChange={(value) => setValue("asset", value)} />
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
              {...register("namePrefix")}
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
              {...register("symbolPrefix")}
              className="w-72"
              error={Boolean(formErrors.symbolPrefix?.message)}
            />
          </FormItem>

          <FormItem
            label="Market Capacity"
            className="mb-5 pb-4"
            endDecorator={<Chip className="w-32 ml-3">DAI</Chip>}
            error={Boolean(formErrors.maxTotalSupply?.message)}
            errorText={formErrors.maxTotalSupply?.message}
            tooltip="Maximum quantity of underlying assets that you wish to borrow from lenders."
          >
            {/* <NumberInput className="w-72" {...register("maxTotalSupply")} /> */}
            <TextInput className="w-72" {...register("maxTotalSupply")} />
          </FormItem>

          <FormItem
            label="Minimum Reserve Ratio"
            className="mb-5 pb-4"
            endDecorator={
              <Chip className="w-11 justify-center font-bold">%</Chip>
            }
            error={Boolean(formErrors.reserveRatioBips?.message)}
            errorText={formErrors.reserveRatioBips?.message}
            tooltip="Minimum deposits you need to keep within your market to avoid triggering
                     a penalty, calculated as a percentage of your outstanding debt (ie. total
                     amount of market tokens in circulation). You cannot withdraw reserved assets
                     from your vault, but you still pay interest on them."
          >
            {/* <NumberInput {...register("reserveRatioBips")} decimalScale={2} /> */}
            <TextInput className="w-72" {...register("reserveRatioBips")} />
          </FormItem>

          <FormItem
            label="APR"
            className="mb-5 pb-4"
            endDecorator={
              <Chip className="w-11 justify-center font-bold">%</Chip>
            }
            error={Boolean(formErrors.annualInterestBips?.message)}
            errorText={formErrors.annualInterestBips?.message}
            tooltip="Annual interest rate that you are offering to your lenders for 
                     depositing underlying assets into this market for you to borrow.
                     Note that your actual interest rate might be higher than the APR
                     if you have selected a market type that imposes a protocol fee."
          >
            {/* <NumberInput */}
            {/*  {...register("annualInterestBips")} */}
            {/*  decimalScale={2} */}
            {/*  max={controller?.constraints?.maximumAnnualInterestBips} */}
            {/* /> */}
            <TextInput className="w-72" {...register("annualInterestBips")} />
          </FormItem>

          <FormItem
            label="Penalty Rate:"
            className="mb-5 pb-4"
            endDecorator={
              <Chip className="w-11 justify-center font-bold">%</Chip>
            }
            error={Boolean(formErrors.delinquencyFeeBips?.message)}
            errorText={formErrors.delinquencyFeeBips?.message}
            tooltip={`Annual interest rate that you are subject to pay - in addition
                      to the lender APR - in the event that your market reserves go
                      below your minimum reserve (i.e. delinquent).`}
          >
            {/* <NumberInput */}
            {/*  {...register("delinquencyFeeBips")} */}
            {/*  decimalScale={2} */}
            {/*  max={controller?.constraints?.maximumDelinquencyFeeBips} */}
            {/* /> */}
            <TextInput className="w-72" {...register("delinquencyFeeBips")} />
          </FormItem>

          <FormItem
            label="Grace Period Duration:"
            className="mb-5 pb-4"
            endDecorator={
              <Chip className="w-11 justify-center font-bold">Hours</Chip>
            }
            error={Boolean(formErrors.delinquencyGracePeriod?.message)}
            errorText={formErrors.delinquencyGracePeriod?.message}
            tooltip="Rolling period for which you are allowed to have deposits below
                     your minimum reserve before the penalty rate is triggered."
          >
            {/* <NumberInput */}
            {/*  {...register("delinquencyGracePeriod")} */}
            {/*  decimalScale={1} */}
            {/*  max={controller?.constraints?.maximumDelinquencyGracePeriod} */}
            {/* /> */}
            <TextInput
              className="w-72"
              {...register("delinquencyGracePeriod")}
            />
          </FormItem>

          <FormItem
            label="Withdrawal Cycle Duration"
            className="mb-5 pb-4"
            endDecorator={
              <Chip className="w-11 justify-center font-bold">hours</Chip>
            }
            error={Boolean(formErrors.withdrawalBatchDuration?.message)}
            errorText={formErrors.withdrawalBatchDuration?.message}
            tooltip="When no cycle is currently active and a lender submits a withdrawal
                     request, the withdrawal cycle starts. During the withdrawal cycle
                     duration, other lenders can submit their withdrawal requests. When
                     the withdrawal cycle concludes, withdrawal requests get paid in
                     accordance with the rules of our Service Agreement. Withdrawal cycles
                     are not rolling: at the conclusion of one cycle, the next one will
                     not begin until the next withdrawal request."
          >
            {/* <NumberInput */}
            {/*  {...register("withdrawalBatchDuration")} */}
            {/*  decimalScale={1} */}
            {/*  max={controller?.constraints?.maximumWithdrawalBatchDuration} */}
            {/* /> */}

            <TextInput
              className="w-72"
              {...register("withdrawalBatchDuration")}
            />
          </FormItem>

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

            <Button
              onClick={handleDeployMarket}
              className="mt-5"
              variant="blue"
              icon={<SignIcon />}
              disabled={isLoading}
            >
              Sign
            </Button>
          </div>
        </form>

        <MarketPreviewModal newMarketParams={getValues()} token={tokenAsset} />
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
