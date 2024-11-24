import { z } from "zod";

export const ownCompanyFormSchema = z.object({
    ownCompanyPersonInCharge: z
        .string()
        .min(2, { message: "ownCompanyPersonInCharge is required" }),
    ownCompanyDepartmentName: z
        .string()
        .min(2, { message: "ownCompanyDepartmentName is required" }),
    externalLink: z.string().min(2, { message: "externalLink is required" }),
    isCancellation: z.boolean(),
    cancellationText: z.string().optional(),
    // 権限
    // notifications settings
});

export type OwnCompanyForm = z.infer<typeof ownCompanyFormSchema>;
