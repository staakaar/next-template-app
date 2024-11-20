// "use client";
import Loading from "@/components/common/atoms/Loading";
import ContractBasicContainer from "@/components/common/container/ContractBasicContainer";
import useContractStore from "@/stores/contracts/ContractStore";
import { Suspense } from "react";

const ContractBasicTab = () => {
    const { selectedContractCode } = useContractStore();
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
