import { z } from "zod"

export const validationSchema = z.object({
  vaultType: z.string(),
  underlyingToken: z.string(),
  namePrefix: z.string(),
  symbolPrefix: z.string(),
  maxAmount: z.number().nonnegative(),
  annualRate: z.number().gte(0).lte(100),
  penaltyRate: z.number().gte(0).lte(100),
  reserveRatio: z.number().gte(0).lte(100),
  gracePeriod: z.number().nonnegative(),
  withdrawalCycle: z.number().nonnegative(),
})

export type FormSchema = z.infer<typeof validationSchema>
