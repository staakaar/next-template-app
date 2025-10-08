"use client";
import { redirect, useParams } from "next/navigation";
import { useEffect } from "react";
import useContractStore from "@/stores/contracts/ContractStore";

const ContractDetailsPage = () => {
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

    return <></>;
};

export default ContractDetailsPage;
