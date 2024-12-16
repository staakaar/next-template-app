"use client";
import { redirect } from "next/navigation";

const ContractDetailDefault = ({
    params,
}: {
    params: { contractCode: string };
}) => {
    redirect(`/contract/${params.contractCode}/contractBasic`);
};

export default ContractDetailDefault;
