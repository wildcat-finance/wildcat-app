import { z } from "zod"

export const vschema = z.object({
  depositAmount: z.string(),
})

export type DepositValidationType = z.infer<typeof vschema>
