"use client";
import { selectedContractCodeState } from "@/stores/contracts/atom";
import { redirect } from "next/navigation";
import { useRecoilValue } from "recoil";

const ContractBasicDefault = () => {
    return null;
    // const selectedContractCode = useRecoilValue(selectedContractCodeState);
    // redirect(`/contract/${selectedContractCode}/contract-basic`);
};

export default ContractBasicDefault;
