"use client";
import { selectedContractCodeState } from "@/stores/contracts/contract";
import { redirect, useParams } from "next/navigation";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

const ContractDetail = () => {
    const params = useParams();
    const contractCode = params.contractCode;
    console.log(contractCode);

    if (!contractCode || Array.isArray(contractCode)) {
        redirect("/contract-all");
    }

    const setSelectedContractCode = useSetRecoilState(
        selectedContractCodeState
    );

    console.log("contractDetailContainer", contractCode);

    // 権限チェック

    useEffect(() => {
        setSelectedContractCode(contractCode);
    }, [contractCode, setSelectedContractCode]);
    return null;
};

export default ContractDetail;
