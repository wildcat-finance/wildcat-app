import { z } from "zod"

export const vschema = z.object({
  withdrawalAmount: z.string(),
})

export type WithdrawalValidationType = z.infer<typeof vschema>
