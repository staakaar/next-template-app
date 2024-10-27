"use server";

import { contractBasicFormSchema, ContractBasicFormData } from "./schema";

export type ContractBasicRequest = {
    contractCode: string;
    contractName: string;
};

export type ResponseMessage = {
    success: boolean;
    message: string;
};

export async function saveContractBasic(
    formData: ContractBasicFormData
): Promise<ResponseMessage | void> {
    const validatedData = contractBasicFormSchema.parse(formData);

    console.log("***", validatedData);
    return { success: true, message: "基本情報の保存に成功しました" };
}

export async function updateContractBasic(
    contractCode: string
): Promise<ResponseMessage | void> {
    console.log("updateContractBasicInfo", contractCode);
    return;
}
