// "use server";

import { ContractDetailResponse } from "@/types/api/contractDetails";

export function useFetchContractDetails(): ContractDetailResponse {
    const context: ApiContext = {
        apiRootUrl: process.env.API_BASE_URL || "http://localhost:8000",
    };

    const contractDetails = generateMockContractDetails(5);

    return contractDetails;
}

/** ダミーデータを用意 */
const generateMockContractDetails = (count: number): ContractDetailResponse => {
    const items = Array.from({ length: count }, (_, index) => ({
        itemId: `itemId ${index + 1}`,
        itemName: `itemName ${index + 1}`,
        expenseCode: `expenseCode ${index + 1}`,
        expenseName: `expenseName ${index + 1}`,
        quantity: `qantity ${index + 1}`,
        unit: `unit ${index + 1}`,
        unitPrice: `unitPrice ${index + 1}`,
    }));

    return {
        items,
        totalCount: count,
    } as ContractDetailResponse;
};

export async function updateContractDetails(
    contractCode: string
): Promise<any> {
    console.log("updateContractDetails", contractCode);
}
