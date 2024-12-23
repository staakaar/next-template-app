export type ContractOwnCompany = {
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

export type OwnCompany = {
    id: string;
    name: string;
    streetAddress: string;
    city: string;
    state: string;
    missionStatement: string;
};

export type OwnCompanyDepartment = {
    id: string;
    name: string;
    ownCompany: OwnCompany;
};

export type OwnCompanyUser = {
    id: string;
    sex: "male" | "female";
    firstName: string;
    lastName: string;
    email: string;
    birthDate: string;
    ownCompanyDepartment: OwnCompanyDepartment;
};

export const ownCompany: OwnCompany = {} as OwnCompany;

export const departments: OwnCompanyDepartment[] = departmentData.map(
    ({ companyId, ...rest }) => ({
        ...rest,
    })
);

// TODO: hooks/contractAuthority

export const users = userData.map(({ departmentId, ...rest }) => ({
    ...rest,
    ownCompanyDepartment: departments.find(({ id }) => id === departmentId)!,
})) as OwnCompanyUser[];

export const filteredDepartments = departments.map((department) => ({
    ...department,
    users:
        users.filter((user) => user.ownCompanyDepartment?.id === department.id)
            ?.length || 0,
}));
