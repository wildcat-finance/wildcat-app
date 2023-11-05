import { z } from "zod"

export const validationSchema = z.object({
  vaultType: z.string(),
  asset: z.string(),
  namePrefix: z.string(),
  symbolPrefix: z.string(),
  maxTotalSupply: z.string(),
  annualInterestBips: z.string(),
  delinquencyFeeBips: z.string(),
  reserveRatioBips: z.string(),
  delinquencyGracePeriod: z.string(),
  withdrawalBatchDuration: z.string(),
})

export type NewMarketFormSchema = z.infer<typeof validationSchema>
