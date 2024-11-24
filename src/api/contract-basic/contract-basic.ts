import useSWR from "swr";
import axios from "axios";
import {
    ContractBasicForm,
    contractBasicFormSchema,
} from "@/lib/contractBasic/schema";
import { notifications } from "@mantine/notifications";

const fetcher = async (url: string): Promise<ContractBasicForm | undefined> => {
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

    const parsedData = contractBasicFormSchema.safeParse(response.data);

    if (!parsedData.success) {
        notifications.show({
            title: "エラー",
            message: "契約書基本情報データの中に不正データが存在します。",
            color: "red",
        });
    }

    return parsedData.data;
};

export function useContractBasic(contractCode: string) {
    const { data, error, mutate } = useSWR<ContractBasicForm | undefined>(
        contractCode ? `/api/v1/contract/${contractCode}` : null,
        fetcher,
        {
            onError: (error) => {},
        }
    );

    return {
        contractBasic: data as ContractBasicForm,
        isLoading: !error && !data,
        isError: error,
        mutate,
    };
}
