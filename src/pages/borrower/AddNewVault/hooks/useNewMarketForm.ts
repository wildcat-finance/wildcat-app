import { useMemo } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { MarketParameterConstraints } from "@wildcatfi/wildcat-sdk"

import {
  NewMarketFormSchema,
  validationSchema as vschema,
} from "../validationSchema"
import { useGetController } from "../../hooks/useGetController"

const defaultVault: NewMarketFormSchema = {
  vaultType: "",
  asset: "",
  namePrefix: "",
  symbolPrefix: "",
  maxTotalSupply: 0,
  annualInterestBips: 0,
  delinquencyFeeBips: 0,
  reserveRatioBips: 0,
  delinquencyGracePeriod: 0,
  withdrawalBatchDuration: 0,
}

function getContrainNumber(value: number) {
  if (value !== undefined && value > 0) {
    return value / 100
  }

  return value
}
function getValidationSchema(constraints: MarketParameterConstraints) {
  const {
    minimumDelinquencyGracePeriod,
    maximumDelinquencyGracePeriod,
    minimumReserveRatioBips,
    maximumReserveRatioBips,
    minimumDelinquencyFeeBips,
    maximumDelinquencyFeeBips,
    minimumWithdrawalBatchDuration,
    maximumWithdrawalBatchDuration,
    minimumAnnualInterestBips,
    maximumAnnualInterestBips,
  } = constraints

  return vschema.extend({
    deliquecyGracePeriod: vschema.shape.delinquencyGracePeriod
      .min(getContrainNumber(minimumDelinquencyGracePeriod))
      .max(getContrainNumber(maximumDelinquencyGracePeriod)),
    reserveRatioBips: vschema.shape.reserveRatioBips
      .min(getContrainNumber(minimumReserveRatioBips))
      .max(getContrainNumber(maximumReserveRatioBips)),
    delinquencyFeeBips: vschema.shape.delinquencyFeeBips
      .min(getContrainNumber(minimumDelinquencyFeeBips))
      .max(getContrainNumber(maximumDelinquencyFeeBips)),
    withdrawalBatchDuration: vschema.shape.withdrawalBatchDuration
      .min(getContrainNumber(minimumWithdrawalBatchDuration))
      .max(getContrainNumber(maximumWithdrawalBatchDuration)),
    annualInterestBips: vschema.shape.annualInterestBips
      .min(getContrainNumber(minimumAnnualInterestBips))
      .max(getContrainNumber(maximumAnnualInterestBips)),
  })
}

export const useNewMarketForm = () => {
  const { data: controller } = useGetController()

  const validationSchemaAsync = useMemo(() => {
    if (controller?.constraints) {
      return getValidationSchema(controller.constraints)
    }

    return vschema
  }, [controller?.constraints])

  const {
    formState: { errors: formErrors },
    handleSubmit,
    getValues,
    setValue,
    watch,
    register,
  } = useForm<NewMarketFormSchema>({
    defaultValues: defaultVault,
    resolver: zodResolver(validationSchemaAsync),
    mode: "onBlur",
  })

  return {
    handleSubmit,
    getValues,
    setValue,
    watch,
    register,
    formErrors,
  }
}