import { z } from "zod";

export const contractHistoryFormSchema = z.object({
    contractCode: z.string().min(2, { message: "Contract code is required" }),
    contractName: z.string().min(2, { message: "Contract name is required" }),
    issuanceType: z.string().min(2, { message: "IssuanceType is required" }),
    status: z.string().min(2, { message: "Status is required" }),
    contractConclusionDate: z
        .string()
        .min(2, { message: "contractConclusionDate is required" }),
    contractStartDate: z.string().date(),
    contractEndDate: z.string().date(),
    placeholder: z.string().min(10, { message: "Phone number is required" }),
    role: z.enum(["admin", "user", "manager"], {
        required_error: "Please select a role",
    }),
    remarks: z.string().optional(),
    isCancel: z.boolean(),
});

export type ContractHistoryForm = z.infer<typeof contractHistoryFormSchema>;
