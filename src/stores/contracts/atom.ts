import { useFetchContracts } from "@/lib/contract/api";
// import { Contract } from "@/types/api/contract";
import { atom, selector, selectorFamily } from "recoil";

// export const contractListState = atom<Contract[]>({
//     key: "contractListState",
//     default: [],
// });

/** ページネーション */
export const contractQueryParamsState = atom({
    key: "contractQueryParamsState",
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
        const params = get(contractQueryParamsState);
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
        const selectedCode = get(selectedContractCodeState);
        return (
            contractList.find((contract) => contract.code === selectedCode) ||
            null
        );
    },
});
