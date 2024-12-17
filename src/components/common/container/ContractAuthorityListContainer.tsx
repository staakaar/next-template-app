import ContractAuthorityListPresentation from "../presentational/ContractAuthorityListPresentation";

interface ContractAuthorityListContainerProps {
    contractCode: string;
}

const ContractAuthorityListContainer = ({
    contractCode,
}: ContractAuthorityListContainerProps) => {
    // fetch own company api

    const { contractAuthority, isLoading, isError, mutate } =
        useContractAuthority(contractCode);

    return (
        <ContractAuthorityListPresentation
            contractAuthorities={contractCode}
            initialTotalCount={contractAuthority.length}
        />
    );
};

export default ContractAuthorityListContainer;
