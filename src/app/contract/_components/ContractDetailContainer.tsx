"use client";
import { redirect, useParams } from "next/navigation";

export type ContractDetailProps = {
    contractCode: string;
};

const ContractDetailContainer = () => {
    const params = useParams();
    const contractCode = params.contractCode;

    redirect(`/contract/${contractCode}/contract-basic`);
    // return <ContractDetailPresentation />;
};

export default ContractDetailContainer;
