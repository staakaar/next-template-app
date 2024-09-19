import { ContractBasicFormSchema } from "@/lib/contract/schema";
import { atom } from "recoil";

export type ContractBasicForm = {
    code: string;
    contractName: string;
};

export const defaultContractBasicForm: ContractBasicForm = Object.freeze({
    code: "",
    contractName: "",
});

export const contractBasicFormState = atom<ContractBasicFormSchema>({
    key: "contractBasicFormState",
    default: defaultContractBasicForm,
});
