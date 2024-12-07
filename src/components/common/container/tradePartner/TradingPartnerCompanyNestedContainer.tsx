import { companyData } from "@/api/company/company";
import TradingPartnerCompanyNestedPresentation from "../../presentational/tradePartner/TradingPartnerCompanyNestedPresentation";
import { filteredTradingCompanies } from "@/types/api/tradePartner";

// 型定義別ファイルへ
// export type Company = {};

// export type Department = {};

// export type User = {};

// export type DepartmentUsers = Department & { users: number };

// export type CompanyUsers = Company & { users: number };

// ダミーデータ
// const departmentData = [{}];

// const companyData = [{}];

// const users = [{}];

// export const departments = departmentData.map((department: Department) => ({
//     ...department,
//     users:
//         users.filter((user: User) => user.department.id === department.id)
//             ?.length || 0,
// }));

// export const companies = companyData.map((company: Company) => ({
//     ...company,
//     users: departments
//         .filter(
//             (department: Department) => department.company.id === company.id
//         )
//         .reduce((sum, department) => sum + department.users, 0),
// }));

// user department company情報を本来はフェッチする
const TradingPartnerCompanyNestedContainer = () => {
    // fetch company
    // tradingCompanies initialCount

    return (
        <TradingPartnerCompanyNestedPresentation
            tradingCompanies={filteredTradingCompanies}
            initialCount={100}
        />
    );
};

export default TradingPartnerCompanyNestedContainer;
