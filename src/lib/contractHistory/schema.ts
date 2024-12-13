import { z } from "zod";

export const contractHistoryFormSchema = z.object({
    beforeValue: z.string().optional(),
    afterValue: z.string().optional(),
    personInCharge: z.string().optional(),
    updateAt: z.string().date(),
});

export type ContractHistoryForm = z.infer<typeof contractHistoryFormSchema>;
