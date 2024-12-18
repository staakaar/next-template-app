import { z } from "zod";

export const contractAuthorityFormSchema = z.object({
    userId: z.string(),
});

// レスポンス専用の型
export const contractAuthorityListResponseSchema = z.array(
    contractAuthorityFormSchema
);

export type ContractAuthorityForm = z.infer<typeof contractAuthorityFormSchema>;
