import { z } from "zod";

export const tradePartnerFormSchema = z.object({
    tradeCompanyId: z.string().min(2, { message: "" }),
    tradeCompanyName: z.string().min(2, { message: "" }),
    tradeCompanyAddress: z.string().optional(),
    tradePersonId: z.string().min(2, { message: "" }),
    tradePersonName: z.string().min(2, { message: "" }),
    tradePartnerDepartmentId: z.string().min(2, { message: "" }),
    tradePartnerDepartmentName: z.string().min(2, { message: "" }),
});

export type TradePartnerFormData = z.infer<typeof tradePartnerFormSchema>;
