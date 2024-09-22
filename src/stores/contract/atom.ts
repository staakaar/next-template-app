import { ContractBasicFormData } from "@/lib/contract/schema";
import { atom } from "recoil";

export type Role = "admin" | "user" | "manager";

export type ContractBasicForm = {
    contractCode: string;
    contractName: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: Role;
    department: string;
    // startDate: Date;
    salary: string;
    comments: string;
};

export const defaultContractBasicForm: ContractBasicForm = Object.freeze({
    contractCode: "",
    contractName: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "admin",
    department: "",
    // startDate: Date.now(),
    salary: "0",
    comments: "",
});

export const contractBasicFormState = atom<ContractBasicFormData>({
    key: "contractBasicFormState",
    default: defaultContractBasicForm,
});
