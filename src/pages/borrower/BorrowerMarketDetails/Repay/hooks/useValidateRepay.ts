import { useMemo } from "react"
import { useForm } from "react-hook-form"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { MarketAccount } from "@wildcatfi/wildcat-sdk"

import { vschema, RepayValidationType } from "./validationSchema"
import { SDK_ERRORS_MAPPING } from "../../../../../utils/forms/errors"

const defaultValues = {
  repayAmount: "",
}

export const useRepayForm = (marketAccount: MarketAccount) => {
  const validationSchemaAsync = useMemo(() => {
    if (marketAccount) {
      return vschema.extend({
        repayAmount: vschema.shape.repayAmount.superRefine(
          (repayAmount, ctx) => {
            const tokenAmount =
              marketAccount.market.underlyingToken.parseAmount(
                repayAmount || "0",
              )
            const { status } = marketAccount.checkRepayStep(tokenAmount)

            if (status !== "Ready" && status !== "InsufficientAllowance") {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: SDK_ERRORS_MAPPING.repay[status],
              })
            }
          },
        ),
      })
    }

    return vschema
  }, [marketAccount])

  return useForm<RepayValidationType>({
    defaultValues,
    resolver: zodResolver(validationSchemaAsync),
    mode: "onChange",
  })
}
