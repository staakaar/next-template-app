"use client";
import ContractBasicContainer from "@/components/common/container/ContractBasicContainer";
import { selectedContractCodeState } from "@/stores/contracts/atom";
import { useRecoilValue } from "recoil";

const ContractBasicTab = () => {
    const selectedContractCode = useRecoilValue(selectedContractCodeState);
    return (
        <ContractBasicContainer
            isEdit={true}
            contractCode={selectedContractCode}
        />
    );
};

export default ContractBasicTab;
