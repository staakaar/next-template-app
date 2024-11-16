import { ContractResponse } from "@/types/api/contract";
import { handleFailed, handleSucceed, path } from "..";

export async function getContracts(
    params?: any
): Promise<ContractResponse[] | undefined> {
    // URLSearchParamsを使用してクエリパラメータを構築
    const searchParams = new URLSearchParams();

    if (params) {
        if (params.keyword) searchParams.append("keyword", params.keyword);
        if (params.status) searchParams.append("status", params.status);
        if (params.page) searchParams.append("page", params.page.toString());
        if (params.limit) searchParams.append("limit", params.limit.toString());
    }

    // クエリパラメータがある場合は追加、ない場合は元のURLのまま
    const url = searchParams.toString()
        ? `${path("get/contracts")}?${searchParams.toString()}`
        : path("get/contracts");

    return fetch(path(`get/contracts`), { cache: "no-cache" })
        .then(handleSucceed)
        .catch(handleFailed);
}
