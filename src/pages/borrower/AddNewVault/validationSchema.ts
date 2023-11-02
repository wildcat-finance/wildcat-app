import { z } from "zod"
import { utils } from "ethers"

export const validationSchema = z.object({
  vaultType: z.string().min(1),
  asset: z.string().refine((value) => utils.isAddress(value), {
    message:
      "Provided address is invalid. Please insure you have typed correctly.",
  }),
  namePrefix: z.string().min(3),
  symbolPrefix: z.string().min(3),
  maxTotalSupply: z.coerce.number(),
  annualInterestBips: z.coerce.number(),
  delinquencyFeeBips: z.coerce.number(),
  reserveRatioBips: z.coerce.number(),
  delinquencyGracePeriod: z.coerce.number(),
  withdrawalBatchDuration: z.coerce.number(),
})

export type NewMarketFormSchema = z.infer<typeof validationSchema>
