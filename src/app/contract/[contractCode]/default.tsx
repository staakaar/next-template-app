"use client";
import { redirect, useParams } from "next/navigation";

const ContractDetailDefault = () => {
    const params = useParams();
    const contractCode = params.contractCode;
    redirect(`/contract/${contractCode}`);
};

export default ContractDetailDefault;
