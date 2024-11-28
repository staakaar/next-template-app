import { TradingPartnerCompany } from "@/types/api/tradePartner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const defaultTradingPartnerCompanyForm: TradingPartnerCompany =
    Object.freeze({
        tradeCompanyId: "",
        tradeCompanyName: "",
        tradeCompanyAddress: "",
        tradeCompanyEmailAddress: "",
    });

export type TradingPartnerCompanyState = {
    tradePartners: TradingPartnerCompany[];
    tradePartner: TradingPartnerCompany;
    setTradePartners: (tradePartners: TradingPartnerCompany[]) => void;
    setTradePartner: (tradePartner: TradingPartnerCompany) => void;
    resetTradePartners: () => void;
    resetTradePartner: () => void;
};

export const useTradePartnerStore = create<TradingPartnerCompanyState>()(
    persist(
        (set) => ({
            tradePartners: [] as TradingPartnerCompany[],
            tradePartner: {} as TradingPartnerCompany,
            setTradePartners: (tradePartners: TradingPartnerCompany[]) =>
                set((state) => ({ ...state, tradePartners })),
            setTradePartner: (tradePartner: TradingPartnerCompany) =>
                set((state) => ({ ...state, tradePartner })),
            resetTradePartners: () =>
                set((state) => ({
                    ...state,
                    tradePartners: [] as TradingPartnerCompany[],
                })),
            resetTradePartner: () =>
                set((state) => ({
                    ...state,
                    tradePartner: {} as TradingPartnerCompany,
                })),
        }),
        {
            name: "trade-partner-store",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
