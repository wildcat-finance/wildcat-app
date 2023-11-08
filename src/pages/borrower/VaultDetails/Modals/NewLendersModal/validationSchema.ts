import { z } from "zod"

export const newLenderValisationSchema = z
  .object({
    lenderWallet: z.string(),
  })
  .required()

export type NewLenderFormSchema = z.infer<typeof newLenderValisationSchema>
