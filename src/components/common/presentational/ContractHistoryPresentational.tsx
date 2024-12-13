import { ContractHistoryForm } from "@/lib/contractHistory/schema";

type ContractHistoryPresentationalProps<T extends ContractHistoryForm> = {
    contractHistories: T[];
    initialTotalCount: number;
};

const ContractHistoryPresentational = <T extends ContractHistoryForm>({
    contractHistories,
    initialTotalCount,
}: ContractHistoryPresentationalProps<T>) => {
    return (
        <>
            <div>履歴</div>
        </>
    );
};

export default ContractHistoryPresentational;
