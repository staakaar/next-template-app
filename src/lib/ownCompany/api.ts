"use server";

import { ownCompanyFormSchema, OwnCompanyForm } from "./schema";

export type ContractBasicRequest = {
    contractCode: string;
    contractName: string;
};

export type ResponseMessage = {
    success: boolean;
    message: string;
};

export async function saveOwnCompany(
    formData: OwnCompanyForm
): Promise<ResponseMessage | void> {
    const validatedData = ownCompanyFormSchema.parse(formData);

    console.log("***", validatedData);
    return { success: true, message: "自社情報の保存に成功しました" };
}

export async function updateOwnCompany(
    contractCode: string
): Promise<ResponseMessage | void> {
    console.log("updateOwnCompany", contractCode);
    return;
}
