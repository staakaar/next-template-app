import useSWR from "swr";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import {
    ContractHistoryForm,
    contractHistoryListResponseSchema,
} from "@/lib/contractHistory/schema";

const fetcher = async (
    url: string
): Promise<ContractHistoryForm[] | undefined> => {
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

    const parsedData = contractHistoryListResponseSchema.safeParse(
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

export function useContractHistory(contractCode: string) {
    const { data, error, mutate } = useSWR<ContractHistoryForm[] | undefined>(
        contractCode ? `/api/v1/contract-history/${contractCode}` : null,
        fetcher,
        {
            onError: (error) => {},
        }
    );

    return {
        contractHistory: data as ContractHistoryForm[],
        isLoading: !error && !data,
        isError: error,
        mutate,
    };
}
