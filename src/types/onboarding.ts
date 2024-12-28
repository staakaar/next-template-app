import { departmentData } from "@/api/department/department";
import { userData } from "@/api/user/user";

// onb側のデータ型
export type OwnCompanyAuthority = {
    id: string;
    name: string;
    streetAddress: string;
    city: string;
    state: string;
    missionStatement: string;
};

export type OwnCompanyDepartmentAuthority = {
    id: string;
    name: string;
    ownCompany: OwnCompanyAuthority;
};

export type OwnCompanyUser = {
    id: string;
    sex: "male" | "female";
    firstName: string;
    lastName: string;
    email: string;
    birthDate: string;
    ownCompanyDepartment: OwnCompanyDepartmentAuthority;
};

// TODO: hooks/contractAuthority
// 本来は上記のフックでAPI叩いて以下の処理もcontractAuthority内で加工して返却する

export const ownCompanyAuthority: OwnCompanyAuthority = {
    id: "0cf96f1c-62c9-4e3f-97b0-4a2e8fa2bf6b",
    name: "Cummerata - Kuhlman",
    streetAddress: "6389 Dicki Stream",
    city: "South Gate",
    state: "NH",
    missionStatement: "Harness real-time channels.",
} as OwnCompanyAuthority;

export const ownCompanyAuthorities: OwnCompanyAuthority[] = [
    ownCompanyAuthority,
];

export const departments: OwnCompanyDepartmentAuthority[] = departmentData.map(
    ({ companyId, ...rest }) => ({
        ...rest,
        ownCompany: ownCompanyAuthorities.find(({ id }) => id === companyId)!,
    })
);

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

export const filteredOwnCompanyAuthorities = ownCompanyAuthorities.map(
    (tradingCompany) => ({
        ...tradingCompany,
        users: filteredDepartments
            .filter(
                (department) => department.ownCompany?.id === tradingCompany.id
            )
            .reduce((sum, department) => sum + department.users, 0),
    })
);
