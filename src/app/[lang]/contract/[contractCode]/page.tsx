"use client";
import { useContractStore } from "@/stores/contracts/ContractStore";
import { redirect, useParams } from "next/navigation";
import { useEffect } from "react";

const ContractDetail = () => {
    const params = useParams();
    const contractCode = params.contractCode;
    console.log(contractCode);

    if (!contractCode || Array.isArray(contractCode)) {
        redirect("/contract-all");
    }

    const { setSelectedContractCode } = useContractStore();

    console.log("contractDetailContainer", contractCode);

    // 権限チェック

    useEffect(() => {
        setSelectedContractCode(contractCode);
    }, [contractCode, setSelectedContractCode]);
    return null;
};

export default ContractDetail;
