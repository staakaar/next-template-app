"use client";
import Loading from "@/components/common/atoms/Loading";
import ContractBasicContainer from "@/components/common/container/ContractBasicContainer";
import { selectedContractCodeState } from "@/stores/contracts/contract";
import { Suspense } from "react";
import { useRecoilValue } from "recoil";

const ContractBasicTab = () => {
    const selectedContractCode = useRecoilValue(selectedContractCodeState);
    return (
        <Suspense fallback={<Loading />}>
            <ContractBasicContainer
                isEdit={true}
                contractCode={selectedContractCode}
            />
        </Suspense>
    );
};

export default ContractBasicTab;
