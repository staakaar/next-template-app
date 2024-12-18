import { useContractAuthority } from "@/api/contract-authority/contract-authority";
import ContractAuthorityListPresentation from "../presentational/ContractAuthorityListPresentation";
import { useContractAuthorityTable } from "@/hooks/contractAuthority";

interface ContractAuthorityListContainerProps {
    contractCode: string;
}

const ContractAuthorityListContainer = ({
    contractCode,
}: ContractAuthorityListContainerProps) => {
    const { contractAuthority, isLoading, isError, mutate } =
        useContractAuthority(contractCode);

    // own company and onb api check
    const authorities = useContractAuthorityTable();

    return (
        <ContractAuthorityListPresentation
            contractAuthorities={contractCode}
            initialTotalCount={contractAuthority.length}
        />
    );
};

export default ContractAuthorityListContainer;
