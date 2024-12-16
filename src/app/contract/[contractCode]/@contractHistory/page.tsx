"use client";
import ContractHistoryContainer from "@/components/common/container/ContractHistoryContainer";
import useContractStore from "@/stores/contracts/ContractStore";

const ContractHistoryTab = () => {
    const { selectedContractCode } = useContractStore();

    return <ContractHistoryContainer contractCode={selectedContractCode} />;
};

export default ContractHistoryTab;
