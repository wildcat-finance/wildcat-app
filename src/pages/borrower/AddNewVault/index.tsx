import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Token } from "@wildcatfi/wildcat-sdk"

import { ServiceAgreementCard } from "../../../components/ServiceAgreementCard"
import {
  Paper,
  Chip,
  Button,
  FormItem,
  Select,
  TextInput,
  NumberInput,
} from "../../../components/ui-components"
import { TokenSelector } from "./TokenSelector"

import arrowBack from "../../../components/ui-components/icons/arrow_back_ios.svg"
import { SelectOptionItem } from "../../../components/ui-components/Select/interface"
import { mockedVaultTypes } from "../../../mocks/vaults"
import { useDeployMarket } from "./hooks/useDeployMarket"
import { useTokenMetadata } from "../hooks/useTokenMetaData"
import { MarketPreviewModal } from "./MarketPreviewModal"
import { defaultMarketForm, useNewMarketForm } from "./hooks/useNewMarketForm"
import { useGetController } from "../hooks/useGetController"
import { ValidationSchemaType } from "./hooks/validationSchema"
import { BASE_PATHS } from "../../../routes/constants"
import { BORROWER_PATHS } from "../routes/constants"
import { getMinMaxFromConstraints } from "../utils/borrowerFormUtils"
import { MARKET_BIPS_DECIMAL_SCALES } from "../../../utils/formatters"

export const mockedVaultTypesOptions: SelectOptionItem[] = mockedVaultTypes.map(
  (vaultType) => ({
    id: vaultType.value,
    label: vaultType.label,
    value: vaultType.value,
  }),
)

const AddNewVault = () => {
  const {
    handleSubmit,
    getValues,
    setValue,
    watch,
    register,
    formState: { errors },
    trigger,
    setFocus,
  } = useNewMarketForm()
  const { data: controller, isLoading: isControllerLoading } =
    useGetController()
  const [tokenAsset, setTokenAsset] = useState<Token | undefined>()
  const { deployNewMarket, isDeploying } = useDeployMarket()
  const navigate = useNavigate()
  const [selectedVault, setSelectedVault] = useState<SelectOptionItem | null>(
    mockedVaultTypesOptions[0],
  )

  const handleClickMyVaults = () => {
    navigate(`${BASE_PATHS.Borrower}/${BORROWER_PATHS.MyVaults}`)
  }

  const handleMarketTypeSelect = (value: SelectOptionItem | null) => {
    setValue("vaultType", value?.value || "")
    setSelectedVault(value)
  }

  const assetWatch = watch("asset")

  const { data: assetData } = useTokenMetadata({
    address: assetWatch?.toLowerCase(),
  })

  useEffect(() => {
    setTokenAsset(assetData)
  }, [assetData])

  const handleDeployMarket = handleSubmit(() => {
    const marketParams = getValues()

    if (assetData && tokenAsset) {
      deployNewMarket({
        namePrefix: marketParams.namePrefix,
        symbolPrefix: marketParams.symbolPrefix,
        annualInterestBips: Number(marketParams.annualInterestBips) * 100,
        delinquencyFeeBips: Number(marketParams.delinquencyFeeBips) * 100,
        reserveRatioBips: Number(marketParams.reserveRatioBips) * 100,
        delinquencyGracePeriod:
          Number(marketParams.delinquencyGracePeriod) * 60 * 60,
        withdrawalBatchDuration:
          Number(marketParams.withdrawalBatchDuration) * 60 * 60,
        maxTotalSupply: Number(marketParams.maxTotalSupply) * 100,
        assetData: tokenAsset,
      })
    }
  })

  const handleValidateForm = async () => {
    const isValid = await trigger()

    if (!isValid) {
      const firstErrorField = Object.keys(
        errors,
      )[0] as keyof ValidationSchemaType

      if (firstErrorField) setFocus(firstErrorField)
    }

    return isValid
  }

  const isLoading = isDeploying || isControllerLoading

  const vaultTypeRegister = register("vaultType")
  const assetRegister = register("asset")

  const handleTokenSelect = async (value: string) => {
    setValue("asset", value)
    await trigger("asset")
  }

  const getNumberFieldDefaultValue = (field: keyof ValidationSchemaType) =>
    controller?.constraints
      ? getMinMaxFromConstraints(controller.constraints, field).min
      : defaultMarketForm[field]

  const getNumberFieldConstraints = (field: string) =>
    getMinMaxFromConstraints(controller?.constraints, field)

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
            error={Boolean(errors.vaultType)}
            errorText={errors.vaultType?.message}
            tooltip="Dictates market logic and enforces minimum and maximum
                     values on the parameters you provide below."
          >
            <Select
              ref={vaultTypeRegister.ref}
              onBlur={vaultTypeRegister.onBlur}
              selected={selectedVault}
              options={mockedVaultTypesOptions}
              onChange={handleMarketTypeSelect}
            />
          </FormItem>

          <FormItem
            label="Underlying Asset"
            className="mb-5 pb-4"
            error={Boolean(errors.asset)}
            errorText={errors.asset?.message}
            tooltip="The token that you want to borrow, e.g. WETH, DAI, CRV."
          >
            <TokenSelector
              onChange={handleTokenSelect}
              onBlur={assetRegister.onBlur}
              error={Boolean(errors.asset)}
              ref={assetRegister.ref}
            />
          </FormItem>

          <FormItem
            label="Market Token Name Prefix"
            className="mb-5 pb-4"
            endDecorator={<Chip className="w-32 ml-3">Dai Stablecoin</Chip>}
            error={Boolean(errors.namePrefix)}
            errorText={errors.namePrefix?.message}
            tooltip="The identifier that attaches to the front of the name of the underlying
                                asset in order to distinguish the market token issued to lenders.
                                For example, entering 'Test' here when the underlying asset is Dai
                                Stablecoin will result in your lenders being issued a market token
                                named Test Dai Stablecoin."
          >
            <TextInput
              {...register("namePrefix")}
              className="w-72"
              error={Boolean(errors.namePrefix)}
            />
          </FormItem>

          <FormItem
            label="Market Token Symbol Prefix"
            className="mb-5 pb-4"
            endDecorator={<Chip className="w-32 ml-3">DAI</Chip>}
            error={Boolean(errors.symbolPrefix)}
            errorText={errors.symbolPrefix?.message}
            tooltip="Symbol version of the market token to be issued to lenders (e.g. TSTDAI)."
          >
            <TextInput
              {...register("symbolPrefix")}
              className="w-72"
              error={Boolean(errors.symbolPrefix)}
            />
          </FormItem>

          <FormItem
            label="Market Capacity"
            className="mb-5 pb-4"
            endDecorator={<Chip className="w-32 ml-3">DAI</Chip>}
            error={Boolean(errors.maxTotalSupply)}
            errorText={errors.maxTotalSupply?.message}
            tooltip="Maximum quantity of underlying assets that you wish to borrow from lenders."
          >
            <NumberInput
              className="w-72"
              {...register("maxTotalSupply")}
              defaultValue={getNumberFieldDefaultValue("maxTotalSupply")}
              error={Boolean(errors.maxTotalSupply)}
              decimalScale={MARKET_BIPS_DECIMAL_SCALES.maxTotalSupply}
            />
          </FormItem>

          <FormItem
            label="Minimum Reserve Ratio"
            className="mb-5 pb-4"
            endDecorator={
              <Chip className="w-11 justify-center font-bold">%</Chip>
            }
            error={Boolean(errors.reserveRatioBips)}
            errorText={errors.reserveRatioBips?.message}
            tooltip="Minimum deposits you need to keep within your market to avoid triggering
                     a penalty, calculated as a percentage of your outstanding debt (ie. total
                     amount of market tokens in circulation). You cannot withdraw reserved assets
                     from your vault, but you still pay interest on them."
          >
            <NumberInput
              {...register("reserveRatioBips")}
              error={Boolean(errors.reserveRatioBips)}
              decimalScale={MARKET_BIPS_DECIMAL_SCALES.reserveRatioBips}
              defaultValue={getNumberFieldDefaultValue("reserveRatioBips")}
              min={getNumberFieldConstraints("reserveRatioBips").min}
              max={getNumberFieldConstraints("reserveRatioBips").max}
            />
          </FormItem>

          <FormItem
            label="APR"
            className="mb-5 pb-4"
            endDecorator={
              <Chip className="w-11 justify-center font-bold">%</Chip>
            }
            error={Boolean(errors.annualInterestBips)}
            errorText={errors.annualInterestBips?.message}
            tooltip="Annual interest rate that you are offering to your lenders for
                     depositing underlying assets into this market for you to borrow.
                     Note that your actual interest rate might be higher than the APR
                     if you have selected a market type that imposes a protocol fee."
          >
            <NumberInput
              {...register("annualInterestBips")}
              error={Boolean(errors.annualInterestBips)}
              decimalScale={MARKET_BIPS_DECIMAL_SCALES.annualInterestBips}
              defaultValue={getNumberFieldDefaultValue("annualInterestBips")}
              min={getNumberFieldConstraints("annualInterestBips").min}
              max={getNumberFieldConstraints("annualInterestBips").max}
            />
          </FormItem>

          <FormItem
            label="Penalty Rate:"
            className="mb-5 pb-4"
            endDecorator={
              <Chip className="w-11 justify-center font-bold">%</Chip>
            }
            error={Boolean(errors.delinquencyFeeBips)}
            errorText={errors.delinquencyFeeBips?.message}
            tooltip={`Annual interest rate that you are subject to pay - in addition
                      to the lender APR - in the event that your market reserves go
                      below your minimum reserve (i.e. delinquent).`}
          >
            <NumberInput
              {...register("delinquencyFeeBips")}
              error={Boolean(errors.delinquencyFeeBips)}
              decimalScale={MARKET_BIPS_DECIMAL_SCALES.delinquencyFeeBips}
              defaultValue={getNumberFieldDefaultValue("delinquencyFeeBips")}
              min={getNumberFieldConstraints("delinquencyFeeBips").min}
              max={getNumberFieldConstraints("delinquencyFeeBips").max}
            />
          </FormItem>

          <FormItem
            label="Grace Period Duration:"
            className="mb-5 pb-4"
            endDecorator={
              <Chip className="w-11 justify-center font-bold">Hours</Chip>
            }
            error={Boolean(errors.delinquencyGracePeriod)}
            errorText={errors.delinquencyGracePeriod?.message}
            tooltip="Rolling period for which you are allowed to have deposits below
                     your minimum reserve before the penalty rate is triggered."
          >
            <NumberInput
              {...register("delinquencyGracePeriod")}
              error={Boolean(errors.delinquencyGracePeriod)}
              decimalScale={MARKET_BIPS_DECIMAL_SCALES.delinquencyGracePeriod}
              defaultValue={getNumberFieldDefaultValue(
                "delinquencyGracePeriod",
              )}
              min={getNumberFieldConstraints("delinquencyGracePeriod").min}
              max={getNumberFieldConstraints("delinquencyGracePeriod").max}
            />
          </FormItem>

          <FormItem
            label="Withdrawal Cycle Duration"
            className="mb-5 pb-4"
            endDecorator={
              <Chip className="w-11 justify-center font-bold">hours</Chip>
            }
            error={Boolean(errors.withdrawalBatchDuration)}
            errorText={errors.withdrawalBatchDuration?.message}
            tooltip="When no cycle is currently active and a lender submits a withdrawal
                     request, the withdrawal cycle starts. During the withdrawal cycle
                     duration, other lenders can submit their withdrawal requests. When
                     the withdrawal cycle concludes, withdrawal requests get paid in
                     accordance with the rules of our Service Agreement. Withdrawal cycles
                     are not rolling: at the conclusion of one cycle, the next one will
                     not begin until the next withdrawal request."
          >
            <NumberInput
              {...register("withdrawalBatchDuration")}
              error={Boolean(errors.withdrawalBatchDuration)}
              decimalScale={MARKET_BIPS_DECIMAL_SCALES.withdrawalBatchDuration}
              defaultValue={getNumberFieldDefaultValue(
                "withdrawalBatchDuration",
              )}
              min={getNumberFieldConstraints("withdrawalBatchDuration").min}
              max={getNumberFieldConstraints("withdrawalBatchDuration").max}
            />
          </FormItem>
        </form>

        <MarketPreviewModal
          selectedVaultType={selectedVault?.label || ""}
          getValues={getValues}
          token={tokenAsset}
          handleSubmit={handleDeployMarket}
          isDeploying={isDeploying}
          disabled={isLoading}
          validateForm={handleValidateForm}
        />
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
