/** fetch server actions */
import { ApiContext } from "@/types/api";
import { ContractResponse } from "@/types/api/contract";
import useSWR from "swr";

export type QueryParams = {};

/** Request Response型それぞれtypesで指定 */
const fetcher = (url: string): Promise<ContractResponse[] | undefined> =>
    fetch(url).then((res) => res.json());

export default function useFetchContracts(
    page: number,
    pageSize: number,
    search: string
) {
    const context: ApiContext = {
        apiRootUrl: process.env.API_BASE_URL || "http://localhost:8000",
    };

    const { data, error } = useSWR(
        `${context.apiRootUrl}/contracts?page=${page}&pageSize=${pageSize}&search${search}`,
        fetcher,
        {
            revalidateOnFocus: true,
            revalidateOnReconnect: true,
        }
    );
    console.log("t", data);
    console.log(error);

    return {
        data: data,
        isLoading: !error && !data,
        isError: error,
    };
}
