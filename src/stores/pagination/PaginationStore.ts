import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type PaginationOptions = {
    pageSize: number;
    pageNumber: number;
};

// state actions mutations
export type PaginationState = {
    contractPageOptions: PaginationOptions;
    setContractPageOptions: (options: PaginationOptions) => void;
    resetContractPageOptions: () => void;
};

export const usePaginationStore = create<PaginationState>()(
    persist(
        (set) => ({
            contractPageOptions: {} as PaginationOptions,
            setContractPageOptions: (options: PaginationOptions) =>
                set((state) => ({ ...state, contractPageOptions: options })),
            resetContractPageOptions: () =>
                set((state) => ({
                    ...state,
                    contractPageOptions: {} as PaginationOptions,
                })),
        }),
        {
            name: "pagination-store",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
