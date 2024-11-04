"use client";
import { redirect, useParams } from "next/navigation";

const ContractDetailTabDefault = () => {
    const params = useParams();
    const contractCode = params.contractCode;
    redirect(`/contract/${contractCode}`);
};

export default ContractDetailTabDefault;
