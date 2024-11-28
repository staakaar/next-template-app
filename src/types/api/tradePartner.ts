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
