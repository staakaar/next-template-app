import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type PaginationOptions = {
    pageSize: number;
    pageNumber: number;
};

// state actions mutations
export type PaginationState = {
    contractPageOptions: PaginationOptions;
    itemPageOptions: PaginationOptions;
    tradePartnerPageOptions: PaginationOptions;
    setContractPageOptions: (options: PaginationOptions) => void;
    setItemPageOptions: (options: PaginationOptions) => void;
    setTradePartnerPageOptions: (options: PaginationOptions) => void;
    resetContractPageOptions: () => void;
    resetItemPageOptions: () => void;
    resetTradePartnerPageOptions: () => void;
};

export const usePaginationStore = create<PaginationState>()(
    persist(
        (set) => ({
            contractPageOptions: {} as PaginationOptions,
            itemPageOptions: {} as PaginationOptions,
            tradePartnerPageOptions: {} as PaginationOptions,
            setItemPageOptions: (options: PaginationOptions) =>
                set((state) => ({ ...state, itemPageOptions: options })),
            setContractPageOptions: (options: PaginationOptions) =>
                set((state) => ({ ...state, contractPageOptions: options })),
            setTradePartnerPageOptions: (options: PaginationOptions) =>
                set((state) => ({
                    ...state,
                    tradePartnerPageOptions: options,
                })),
            resetContractPageOptions: () =>
                set((state) => ({
                    ...state,
                    contractPageOptions: {} as PaginationOptions,
                })),
            resetItemPageOptions: () =>
                set((state) => ({
                    ...state,
                    itemPageOptions: {} as PaginationOptions,
                })),
            resetTradePartnerPageOptions: () =>
                set((state) => ({
                    ...state,
                    tradePartnerPageOptions: {} as PaginationOptions,
                })),
        }),
        {
            name: "pagination-store",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
