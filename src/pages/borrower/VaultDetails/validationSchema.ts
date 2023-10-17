import { z } from 'zod';

export const validationSchema = z.object({
  borrow: z.string(),
  repay: z.string(),
  annualInterestRate: z.string(),
  capacity: z.string(),
});

export type FormSchema = z.infer<typeof validationSchema>