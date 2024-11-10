import { Suspense } from "react";
import ContractListTableContainer from "./_components/ContractListTableContainer";
import ContractAllLoading from "./loading";

const ContractAllListPage = () => {
    return (
        <Suspense fallback={<ContractAllLoading />}>
            <ContractListTableContainer />
        </Suspense>
    );
};
export default ContractAllListPage;
