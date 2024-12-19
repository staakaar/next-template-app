import { ContractAuthority } from "@/hooks/contractAuthority";

type ContractAuthorityListPresentationProps<T extends ContractAuthority> = {
    contractAuthorities: T[];
    initialTotalCount: number;
};

const PAGE_SIZES = [50, 75, 100];

const ContractAuthorityListPresentation = <T extends ContractAuthority>({
    contractAuthorities,
    initialTotalCount,
}: ContractAuthorityListPresentationProps<T>) => {};

export default ContractAuthorityListPresentation;
