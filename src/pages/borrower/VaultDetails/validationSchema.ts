import { z } from "zod"

export const validationSchema = z.object({
  borrow: z.coerce.number(),
  repay: z.coerce.number(),
  annualInterestRate: z.coerce.number(),
  capacity: z.coerce.number(),
})

export enum VALIDATION_SCHEMA_FIELDS {
  borrow = "borrow",
  repay = "repay",
  annualInterestRate = "annualInterestRate",
  capacity = "capacity",
}

export type NewMarketFormSchema = z.infer<typeof validationSchema>
