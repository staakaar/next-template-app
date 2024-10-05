import { handleFailed, handleSucceed, path } from "..";

/** 会社設定API */
export type CompanySettingResponse = {
    test: String;
};

export async function getCompanySettings(): Promise<
    CompanySettingResponse | undefined
> {
    return await fetch(path(`/company-settings`), {
        method: "GET",
        next: { revalidate: 0 },
    })
        .then(handleSucceed)
        .catch(handleFailed);
}

/** post */

/** put */
