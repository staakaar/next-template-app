import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type TradePartner = {
    tradeCompanyId: string;
    tradeCompanyName: string;
    tradeCompanyAddress: string;
    tradePersonId: string;
    tradePersonName: string;
    tradePartnerDepartmentId: string;
    tradePartnerDepartmentName: string;
};

export const defaultTradePartnerForm: TradePartner = Object.freeze({
    tradeCompanyId: "",
    tradeCompanyName: "",
    tradeCompanyAddress: "",
    tradePersonId: "",
    tradePersonName: "",
    tradePartnerDepartmentId: "",
    tradePartnerDepartmentName: "",
});

export type TradePartnerState = {
    tradePartners: TradePartner[];
    tradePartner: TradePartner;
    setTradePartners: (tradePartners: TradePartner[]) => void;
    setTradePartner: (tradePartner: TradePartner) => void;
    resetTradePartners: () => void;
    resetTradePartner: () => void;
};

export const useTradePartnerStore = create<TradePartnerState>()(
    persist(
        (set) => ({
            tradePartners: [] as TradePartner[],
            tradePartner: {} as TradePartner,
            setTradePartners: (tradePartners: TradePartner[]) =>
                set((state) => ({ ...state, tradePartners })),
            setTradePartner: (tradePartner: TradePartner) =>
                set((state) => ({ ...state, tradePartner })),
            resetTradePartners: () =>
                set((state) => ({
                    ...state,
                    tradePartners: [] as TradePartner[],
                })),
            resetTradePartner: () =>
                set((state) => ({
                    ...state,
                    tradePartner: {} as TradePartner,
                })),
        }),
        {
            name: "trade-partner-store",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
