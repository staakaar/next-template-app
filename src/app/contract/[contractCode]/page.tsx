import React, { Suspense } from "react";
import ContractDetail from "../_components/ContractDetail";
import VSpinner from "@/components/atoms/Spinner/Spinner";

export type ContractDetailsProps = {
    contractCode: string;
};

const ContractDetailsPage = ({ contractCode }: ContractDetailsProps) => {
    return (
        <>
            <Suspense fallback={<VSpinner size="xl" />}>
                <ContractDetail contractCode={contractCode} />
            </Suspense>
            {/* 詳細タブ表示(各ドメイン) */}
            {/* タブに応じて新規作成ページを切り替える 契約書情報を一番最初に入力する必要あり */}
        </>
    );
};

export default ContractDetailsPage;
