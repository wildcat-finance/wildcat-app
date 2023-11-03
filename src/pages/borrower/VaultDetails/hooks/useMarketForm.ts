import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { useMemo } from "react"
import { MarketParameterConstraints } from "@wildcatfi/wildcat-sdk"
import {
  validationSchema as vschema,
  NewMarketFormSchema,
} from "../validationSchema"
import { useGetController } from "../../hooks/useGetController"

const defaultMarketForm: Partial<NewMarketFormSchema> = {
  borrow: 0,
  repay: 0,
  annualInterestRate: 0,
  capacity: 0,
}

function getContrainNumber(value: number) {
  if (value !== undefined && value > 0) {
    return value / 100
  }

  return value
}
function getValidationSchema(constraints: MarketParameterConstraints) {
  const { minimumAnnualInterestBips, maximumAnnualInterestBips } = constraints

  return vschema.extend({
    annualInterestRate: vschema.shape.annualInterestRate
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

  return useForm<NewMarketFormSchema>({
    defaultValues: defaultMarketForm,
    resolver: zodResolver(validationSchemaAsync),
    mode: "onBlur",
  })
}
