import ContractHistoryContainer from "@/components/common/container/ContractHistoryContainer";
import { useParams } from "next/navigation";

const ContractHistoryTab = () => {
    const params = useParams();
    const contractCode = params.contractCode;

    return (
        <>
            <ContractHistoryContainer contractCode={contractCode} />
        </>
    );
};

export default ContractHistoryTab;
