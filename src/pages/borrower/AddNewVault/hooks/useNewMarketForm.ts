import { useMemo } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { MarketParameterConstraints } from "@wildcatfi/wildcat-sdk"

import { formatConstrainToNumber } from "../../../../utils/formatters"

import {
  ValidationSchemaType,
  validationSchema as vschema,
} from "./validationSchema"
import { useGetController } from "../../../../hooks/useGetController"
import { mockedVaultTypes } from "../../../../mocks/vaults"

export const defaultMarketForm: Partial<ValidationSchemaType> = {
  vaultType: mockedVaultTypes[0].value,
  maxTotalSupply: 0,
  annualInterestBips: 0,
  delinquencyFeeBips: 0,
  reserveRatioBips: 0,
  delinquencyGracePeriod: 0,
  withdrawalBatchDuration: 0,
}

function getValidationSchema(constraints: MarketParameterConstraints) {
  const getFormattedConstrain = (key: keyof MarketParameterConstraints) =>
    formatConstrainToNumber(constraints, key)

  return vschema.extend({
    delinquencyGracePeriod: vschema.shape.delinquencyGracePeriod
      .min(getFormattedConstrain("minimumDelinquencyGracePeriod"))
      .max(getFormattedConstrain("maximumDelinquencyGracePeriod")),
    reserveRatioBips: vschema.shape.reserveRatioBips
      .min(getFormattedConstrain("minimumReserveRatioBips"))
      .max(getFormattedConstrain("maximumReserveRatioBips")),
    delinquencyFeeBips: vschema.shape.delinquencyFeeBips
      .min(getFormattedConstrain("minimumDelinquencyFeeBips"))
      .max(getFormattedConstrain("maximumDelinquencyFeeBips")),
    withdrawalBatchDuration: vschema.shape.withdrawalBatchDuration
      .min(getFormattedConstrain("minimumWithdrawalBatchDuration"))
      .max(getFormattedConstrain("maximumWithdrawalBatchDuration")),
    annualInterestBips: vschema.shape.annualInterestBips
      .min(getFormattedConstrain("minimumAnnualInterestBips"))
      .max(getFormattedConstrain("maximumAnnualInterestBips")),
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

  return useForm<ValidationSchemaType>({
    defaultValues: defaultMarketForm,
    resolver: zodResolver(validationSchemaAsync),
    mode: "onChange",
  })
}
