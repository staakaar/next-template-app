// import { useFetchContracts } from "@/lib/contract/api";
import { Contract } from "@/types/api/contract";
// // import { Contract } from "@/types/api/contract";
// import { atom, selector, selectorFamily } from "recoil";

// /** 契約書ページネーション */
// export const contractPageOptionsState = atom({
//     key: "contractPageOptionsState",
//     default: {
//         page: 0,
//         pageSize: 50,
//         search: "",
//     },
// });

// export const contractsQuery = selectorFamily({
//     key: "contractsQuery",
//     get:
//         (params) =>
//         async ({ get }) => {
//             const { page, pageSize, search }: any = params;
//             const response = await useFetchContracts(page, pageSize, search);
//             // if (!response.ok) {
//             //     throw new Error("Failed to fetch contracts");
//             // }
//             // const data = await response.json();
//             return response;
//         },
// });

// /** 契約書一覧 */
// export const contractListState = selector({
//     key: "contractListState",
//     get: ({ get }) => {
//         const params = get(contractPageOptionsState);
//         return get(contractsQuery(params));
//     },
// });

// export const selectedContractCodeState = atom({
//     key: "selectedContractCodeState",
//     default: "",
// });

// export const selectedContractSelector = selector({
//     key: "selectedContractSelector",
//     get: ({ get }) => {
//         const contractList = get(contractListState);
//         console.log("selectedContractSelector", contractList);
//         const selectedCode = get(selectedContractCodeState);
//         console.log("selectedContractSelector", selectedCode);
//         return (
//             contractList.contracts.find(
//                 (contract) => contract.contractCode === selectedCode
//             ) || null
//         );
//     },
// });

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

export const useContractStore = create<ContractState>()(
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
