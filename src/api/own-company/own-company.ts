import useSWR from "swr";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import { OwnCompanyForm, ownCompanyFormSchema } from "@/lib/ownCompany/schema";

const fetcher = async (url: string): Promise<OwnCompanyForm | undefined> => {
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

    const parsedData = ownCompanyFormSchema.safeParse(response.data);

    if (!parsedData.success) {
        notifications.show({
            title: "エラー",
            message: "自社情報データの中に不正データが存在します。",
            color: "red",
        });
    }

    return parsedData.data;
};

export function useOwnCompany(contractCode: string) {
    const { data, error, mutate } = useSWR<OwnCompanyForm | undefined>(
        contractCode ? `/api/v1/own-company/${contractCode}` : null,
        fetcher,
        {
            onError: (error) => {},
        }
    );

    return {
        ownCompany: data as OwnCompanyForm,
        isLoading: !error && !data,
        isError: error,
        mutate,
    };
}
