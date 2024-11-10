"use client";
import { redirect, useParams } from "next/navigation";

const TabsPage = () => {
    const params = useParams();
    const contractCode = params.contractCode;
    redirect(`/contract/${contractCode}/contract-basic`);
};

export default TabsPage;
