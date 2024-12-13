import { z } from "zod";

export const contractHistoryFormSchema = z.object({
    beforeValue: z.string().optional(),
    afterValue: z.string().optional(),
    personInCharge: z.string().optional(),
    updateAt: z.string().date(),
});

// レスポンス専用の型
export const contractHistoryListResponseSchema = z.array(
    contractHistoryFormSchema
);

export type ContractHistoryForm = z.infer<typeof contractHistoryFormSchema>;
