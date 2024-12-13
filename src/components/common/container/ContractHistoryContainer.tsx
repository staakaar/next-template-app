import { useContractHistory } from "@/api/contract-history/contract-history";
import { useParams } from "next/navigation";
import ContractHistoryPresentational from "../presentational/ContractHistoryPresentational";

interface ContractHistoryContainerProps {
    contractCode: string;
}

const ContractHistoryContainer = ({
    contractCode,
}: ContractHistoryContainerProps) => {
    // fetch
    const { contractHistory, isLoading, isError, mutate } =
        useContractHistory(contractCode);

    return (
        <ContractHistoryPresentational
            contractHistories={contractHistory}
            initialTotalCount={contractHistory.length}
        />
    );
};

export default ContractHistoryContainer;
