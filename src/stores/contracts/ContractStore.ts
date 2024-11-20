import { Contract } from "@/types/api/contract";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// state actions mutations
export type ContractState = {
    contracts: Contract[];
    selectedContractCode: string;
    selectedContract: Contract | null;
    setContracts: (contracts: Contract[]) => void;
    setSelectedContract: (contract: Contract) => void;
    setSelectedContractCode: (contractCode: string) => void;
    resetContracts: () => void;
    resetSelectedContract: () => void;
    resetSelectedContractCode: () => void;
};

const useContractStore = create<ContractState>()(
    persist(
        (set) => ({
            contracts: [],
            selectedContract: null,
            selectedContractCode: "",
            setContracts: (contracts) =>
                set((state) => ({ ...state, contracts })),
            setSelectedContract: (contract: Contract) =>
                set({ selectedContract: contract }),
            setSelectedContractCode: (contractCode: string) =>
                set((state) => ({ ...state, contractCode })),
            resetContracts: () => set((state) => ({ ...state, contracts: [] })),
            resetSelectedContract: () =>
                set((state) => ({ ...state, selectedContract: null })),
            resetSelectedContractCode: () =>
                set((state) => ({ ...state, selectedContractCode: "" })),
        }),
        {
            name: "contract-store",
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useContractStore;
