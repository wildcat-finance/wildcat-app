import { useMemo } from "react"
import { useForm } from "react-hook-form"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { MarketAccount } from "@wildcatfi/wildcat-sdk"

import { vschema, WithdrawalValidationType } from "./validationSchema"
import { SDK_ERRORS_MAPPING } from "../../../../../utils/forms/errors"

const defaultValues = {
  withdrawalAmount: "",
}

export const useWithdrawalForm = (marketAccount: MarketAccount) => {
  const validationSchemaAsync = useMemo(() => {
    if (marketAccount) {
      return vschema.extend({
        withdrawalAmount: vschema.shape.withdrawalAmount.superRefine(
          (withdrawalAmount, ctx) => {
            const tokenAmount =
              marketAccount.market.underlyingToken.parseAmount(
                withdrawalAmount || "0",
              )
            const { status } =
              marketAccount.checkQueueWithdrawalStep(tokenAmount)

            if (status !== "Ready") {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: SDK_ERRORS_MAPPING.queueWithdrawal[status],
              })
            }
          },
        ),
      })
    }

    return vschema
  }, [marketAccount])

  return useForm<WithdrawalValidationType>({
    defaultValues,
    resolver: zodResolver(validationSchemaAsync),
    mode: "onChange",
  })
}
