"use client";
import useSWR from "swr";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import {
    ContractAuthorityForm,
    contractAuthorityListResponseSchema,
} from "@/lib/contract-authority/schema";

const fetcher = async (
    url: string
): Promise<ContractAuthorityForm[] | undefined> => {
    const response = await axios.get(url);

    if (!response.data) {
        // response error
        notifications.show({
            title: "エラー",
            message: response?.data?.message || "データの取得に失敗しました",
            color: "red",
        });
        return;
    }

    const parsedData = contractAuthorityListResponseSchema.safeParse(
        response.data
    );

    if (!parsedData.success) {
        notifications.show({
            title: "エラー",
            message: "契約書基本情報データの中に不正データが存在します。",
            color: "red",
        });
    }

    return parsedData.data;
};

export function useContractAuthority(contractCode: string) {
    const { data, error, mutate } = useSWR<ContractAuthorityForm[] | undefined>(
        contractCode ? `/api/v1/contract-authority/${contractCode}` : null,
        fetcher,
        {
            onError: (error) => {},
        }
    );

    const tmpData = [
        {
            userId: "user1",
        },
        {
            userId: "user1",
        },
    ] as ContractAuthorityForm[];

    return {
        contractAuthority: !tmpData ? [] : (tmpData as ContractAuthorityForm[]),
        isLoading: !error && !data,
        isError: error,
        mutate,
    };
}
