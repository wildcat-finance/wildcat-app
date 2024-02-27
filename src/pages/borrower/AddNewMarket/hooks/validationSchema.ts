import { z } from "zod"
import { utils } from "ethers"
import {
  isLetterNumberSpace,
  isLetterNumber,
} from "../../../../forms/validations"

export const validationSchema = z.object({
  vaultType: z.string().min(1),
  asset: z.string().refine((value) => utils.isAddress(value), {
    message: "Invalid address: please ensure you have the correct token.",
  }),
  namePrefix: z
    .string()
    .min(3)
    .refine(isLetterNumberSpace.validate, isLetterNumberSpace.message),
  symbolPrefix: z
    .string()
    .min(3)
    .refine(isLetterNumber.validate, isLetterNumber.message),
  maxTotalSupply: z.coerce.string(),
  annualInterestBips: z.coerce.number(),
  delinquencyFeeBips: z.coerce.number(),
  reserveRatioBips: z.coerce.number(),
  delinquencyGracePeriod: z.coerce.number(),
  withdrawalBatchDuration: z.coerce.number(),
})

export type ValidationSchemaType = z.infer<typeof validationSchema>
