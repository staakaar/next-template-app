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

    // own company and onb api check このパターンはZustandで状態管理
    const authorities = useContractAuthorityTable();

    return (
        <ContractAuthorityListPresentation
            contractAuthorities={authorities}
            initialTotalCount={authorities.length}
        />
    );
};

export default ContractAuthorityListContainer;
