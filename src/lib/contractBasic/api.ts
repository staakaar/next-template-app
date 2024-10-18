"use server";

import { contractBasicFormSchema, ContractBasicForm } from "./schema";

export type ContractBasicRequest = {
    contractCode: string;
    contractName: string;
};

export async function saveContractBasic(formData: ContractBasicForm) {
    const validatedData = contractBasicFormSchema.parse(formData);

    console.log("***", validatedData);
    return { success: true, message: "基本情報の保存に成功しました" };
}

export async function updateContractBasic(contractCode: string) {
    console.log("updateContractBasicInfo", contractCode);
}
