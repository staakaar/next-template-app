import { ownCompany } from "@/types/onboarding";
import ContractAuthorityHierarchyPresentation from "../../presentational/contractAuthority/ContractAuthorityHierarchyPresentation";

const ContractAuthorityHierarchyContainer = () => {
    // fetch onb apiを取得

    return (
        <ContractAuthorityHierarchyPresentation
            contractAuthorities={ownCompany}
            initialCount={1}
        />
    );
};

export default ContractAuthorityHierarchyContainer;
