import React, { Suspense } from "react";
import ContractDetailContainer from "../_components/ContractDetailContainer";
import VSpinner from "@/components/atoms/Spinner/Spinner";

export type ContractDetailsProps = {
    contractCode: string;
};

const ContractDetailsPage = () => {
    return (
        <>
            <Suspense fallback={<VSpinner size="xl" />}>
                <ContractDetailContainer />
            </Suspense>
            {/* 詳細タブ表示(各ドメイン) */}
            {/* タブに応じて新規作成ページを切り替える 契約書情報を一番最初に入力する必要あり */}
        </>
    );
};

export default ContractDetailsPage;
