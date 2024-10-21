import { useFetchContracts } from "@/lib/contract/api";
// import { Contract } from "@/types/api/contract";
import { atom, selector, selectorFamily } from "recoil";

// export const contractListState = atom<Contract[]>({
//     key: "contractListState",
//     default: [],
// });

/** 契約書ページネーション */
export const contractPageOptionsState = atom({
    key: "contractPageOptionsState",
    default: {
        page: 0,
        pageSize: 50,
        search: "",
    },
});

export const contractsQuery = selectorFamily({
    key: "contractsQuery",
    get:
        (params) =>
        async ({ get }) => {
            const { page, pageSize, search }: any = params;
            const response = await useFetchContracts(page, pageSize, search);
            // if (!response.ok) {
            //     throw new Error("Failed to fetch contracts");
            // }
            // const data = await response.json();
            return response;
        },
});

/** 契約書一覧 */
export const contractListState = selector({
    key: "contractListState",
    get: ({ get }) => {
        const params = get(contractPageOptionsState);
        return get(contractsQuery(params));
    },
});

export const selectedContractCodeState = atom({
    key: "selectedContractCodeState",
    default: "",
});

export const selectedContractSelector = selector({
    key: "selectedContractSelector",
    get: ({ get }) => {
        const contractList = get(contractListState);
        console.log("selectedContractSelector", contractList);
        const selectedCode = get(selectedContractCodeState);
        console.log("selectedContractSelector", selectedCode);
        return (
            contractList.contracts.find(
                (contract) => contract.contractCode === selectedCode
            ) || null
        );
    },
});
