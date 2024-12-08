import { companyData } from "@/api/company/company";
import { departmentData } from "@/api/department/department";
import { userData } from "@/api/user/user";

// You can use a Zod schema here if you want.
export type TradingPartnerCompany = {
    tradingCompanyId: string;
    tradingCompanyName: string;
    tradingCompanyAddress: string;
    tradingCompanyEmailAddress: string;
};

export type TradingPartnerCompanyResponse = {
    tradingPartnerCompanies: TradingPartnerCompany[];
    totalCount: number;
};

export type TradingPartnerPerson = {
    tradingPersonId: string;
    tradingPersonName: string;
    tradingPersonEmailAddress: string;
    tradingPartnerDepartmentId: string;
    tradingPartnerDepartmentName: string;
};

export type TradingPartnerPersonResponse = {
    tradingPartnerPersons: TradingPartnerPerson[];
    totalCount: number;
};

export type TradingCompany = {
    id: string;
    name: string;
    streetAddress: string;
    city: string;
    state: string;
    missionStatement: string;
};

export type TradingCompanyDepartment = {
    id: string;
    name: string;
    tradingCompany: TradingCompany;
};

export type TradingCompanyUser = {
    id: string;
    sex: "male" | "female";
    firstName: string;
    lastName: string;
    email: string;
    birthDate: string;
    tradingDepartment: TradingCompanyDepartment;
};

export const tradingCompanies: TradingCompany[] = companyData;

export const departments: TradingCompanyDepartment[] = departmentData.map(
    ({ companyId, ...rest }) => ({
        ...rest,
        tradingCompany: tradingCompanies.find(({ id }) => id === companyId)!,
    })
);

export const users = userData.map(({ departmentId, ...rest }) => ({
    ...rest,
    tradingDepartment: departments.find(({ id }) => id === departmentId)!,
})) as TradingCompanyUser[];

export const filteredDepartments = departments.map((department) => ({
    ...department,
    users:
        users.filter((user) => user.tradingDepartment?.id === department.id)
            ?.length || 0,
}));

export const filteredTradingCompanies = tradingCompanies.map(
    (tradingCompany) => ({
        ...tradingCompany,
        users: filteredDepartments
            .filter(
                (department) =>
                    department.tradingCompany.id === tradingCompany.id
            )
            .reduce((sum, department) => sum + department.users, 0),
    })
);
