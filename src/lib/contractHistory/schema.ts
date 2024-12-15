import { z } from "zod";

export const contractHistoryFormSchema = z.object({
    contractHistoryId: z.string().max(50),
    beforeValue: z.string(),
    afterValue: z.string(),
    personInCharge: z.string(),
    updateAt: z.string().date(),
});

// レスポンス専用の型
export const contractHistoryListResponseSchema = z.array(
    contractHistoryFormSchema
);

export type ContractHistoryForm = z.infer<typeof contractHistoryFormSchema>;
