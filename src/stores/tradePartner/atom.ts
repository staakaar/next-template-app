import { TradePartnerFormData } from "@/lib/tradePartner/schema";
import { atom } from "recoil";

export type TradePartnerForm = {
    tradeCompanyId: string;
    tradeCompanyName: string;
    tradeCompanyAddress: string;
    tradePersonId: string;
    tradePersonName: string;
    tradePartnerDepartmentId: string;
    tradePartnerDepartmentName: string;
};

export const defaultTradePartnerForm: TradePartnerForm = Object.freeze({
    tradeCompanyId: "",
    tradeCompanyName: "",
    tradeCompanyAddress: "",
    tradePersonId: "",
    tradePersonName: "",
    tradePartnerDepartmentId: "",
    tradePartnerDepartmentName: "",
});

export const tradePartnerFormState = atom<TradePartnerFormData>({
    key: "tradePartnerFormState",
    default: defaultTradePartnerForm,
});
