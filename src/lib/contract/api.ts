"use client";
import { ApiContext } from "@/types/api";
import { ContractResponse } from "@/types/api/contract";
import { redirect } from "next/navigation";
import { z } from "zod";

export type QueryParams = {};

/** Request Response型それぞれtypesで指定 axiosにする */
const fetcher = (url: string): Promise<ContractResponse[] | undefined> =>
    fetch(url).then((res) => res.json());

export async function useFetchContracts(
    page: number,
    pageSize?: number,
    search?: string
) {
    const context: ApiContext = {
        apiRootUrl: process.env.API_BASE_URL || "http://localhost:8000",
    };

    // const { data, error } = useSWR(
    //     `${context.apiRootUrl}/contracts?page=${page}&pageSize=${pageSize}&search${search}`,
    //     fetcher,
    //     {
    //         revalidateOnFocus: true,
    //         revalidateOnReconnect: true,
    //     }
    // );

    const d = generateMockContracts(100);

    return d;
}

/** ダミーデータを用意 */
const generateMockContracts = (count: number): ContractResponse => {
    const contracts = Array.from({ length: count }, (_, index) => ({
        contractCode: `C${index + 1}`,
        contractName: `Contract ${index + 1}`,
        contractStatus: `${index % 2 == 0 ? "CREATE" : "UNDER_CONSTRUCTION"}`,
        tradePartner: `Partner ${index + 1}`,
        contractPersonInCharge: `Person ${index + 1}`,
    }));

    return {
        contracts,
        totalCount: count,
    };
};

// 以下不要
const formSchema = z.object({
    username: z.string().min(2, {
        message: "ユーザー名は必須です。",
    }),
});

export async function onContractBasicSubmit(
    values: z.infer<typeof formSchema>
) {
    console.log(values.username);
    redirect("/contract-all");
}
