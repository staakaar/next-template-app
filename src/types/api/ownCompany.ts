export type OwnCompany = {
    ownCompanyPersonInCharge: string;
    ownCompanyDepartmentName: string;
    externalLink: string;
    isCancellation: boolean;
    cancellationText: string;
    // 権限
    // notifications settings
};

export type OwnCompanyResponse = {
    contracts: OwnCompany[];
    totalCount: number;
};
