import { filteredOwnCompanyAuthorities } from "@/types/onboarding";
import ContractAuthorityHierarchyPresentation from "../../presentational/contractAuthority/ContractAuthorityHierarchyPresentation";

const ContractAuthorityHierarchyContainer = () => {
    // fetch onb apiを取得
    console.log(filteredOwnCompanyAuthorities);

    return (
        <ContractAuthorityHierarchyPresentation
            contractAuthorities={filteredOwnCompanyAuthorities}
            initialTotalCount={1}
        />
    );
};

export default ContractAuthorityHierarchyContainer;
