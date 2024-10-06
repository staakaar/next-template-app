"use client";
import { selectedContractCodeState } from "@/stores/contracts/atom";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import ContractDetailPresentation from "./ContractDetailPresentation";
// import { useRouter } from "next/router";
import { redirect, useParams } from "next/navigation";

export type ContractDetailProps = {
    contractCode: string;
};

const ContractDetailContainer = () => {
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

    useEffect(() => {
        setSelectedContractCode(contractCode);
    }, [contractCode, setSelectedContractCode]);

    return <ContractDetailPresentation />;
};

export default ContractDetailContainer;
