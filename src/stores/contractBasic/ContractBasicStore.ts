import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { ContractBasicFormData } from "@/lib/contractBasic/schema";

export type Role = "admin" | "user" | "manager";

export type ContractBasic = {
    contractCode: string;
    contractName: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: Role;
    department: string;
    startDate: string;
    salary: string;
    comments: string;
};

export const defaultContractBasicForm: ContractBasicFormData = Object.freeze({
    contractCode: "",
    contractName: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "admin",
    department: "",
    startDate: "",
    salary: "0",
    comments: "",
});

export type ContractBasicState = {
    contractBasic: ContractBasic;
    setContractBasic: (contractBasic: ContractBasic) => void;
    resetContractBasic: () => void;
};

export const useContractBasicStore = create<ContractBasicState>()(
    persist(
        (set) => ({
            contractBasic: {} as ContractBasic,
            setContractBasic: (contractBasic: ContractBasic) =>
                set((state) => ({ ...state, contractBasic: contractBasic })),
            resetContractBasic: () =>
                set((state) => ({
                    ...state,
                    contractBasic: {} as ContractBasic,
                })),
        }),
        {
            name: "contract-basic-store",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
