import { z } from "zod"

export const validationSchema = z.object({
  vaultType: z.string(),
  asset: z.string(),
  namePrefix: z.string(),
  symbolPrefix: z.string(),
  maxTotalSupply: z.coerce.number(),
  annualInterestBips: z.coerce.number(),
  delinquencyFeeBips: z.coerce.number(),
  reserveRatioBips: z.coerce.number(),
  delinquencyGracePeriod: z.coerce.number(),
  withdrawalBatchDuration: z.coerce.number(),
})

export type NewMarketFormSchema = z.infer<typeof validationSchema>
