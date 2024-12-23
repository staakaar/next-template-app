import ContractAuthorityHierarchyPresentation from "../../presentational/contractAuthority/ContractAuthorityHierarchyPresentation";

const ContractAuthorityHierarchyContainer = () => {
    // fetch onb apiを取得

    return (
        <ContractAuthorityHierarchyPresentation
            contractAuthorities={{}}
            initialCount={100}
        />
    );
};

export default ContractAuthorityHierarchyContainer;
