import { z } from "zod"

export const vschema = z.object({
  repayAmount: z.string(),
})

export type RepayValidationType = z.infer<typeof vschema>
