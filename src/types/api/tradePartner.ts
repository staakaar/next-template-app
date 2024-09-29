// You can use a Zod schema here if you want.
export type TradePartner = {
    tradeCompanyId: string;
    tradeCompanyName: string;
    tradeCompanyAddress: string;
    tradePersonId: string;
    tradePersonName: string;
    tradePartnerDepartmentId: string;
    tradePartnerDepartmentName: string;
};

export type TradePartnerResponse = {
    tradePartner: TradePartner[];
    totalCount: number;
};

export type TradePartnerPerson = {
    tradePersonId: string;
    tradePersonName: string;
    tradePersonEmailAddress: string;
    tradePartnerDepartmentId: string;
    tradePartnerDepartmentName: string;
};

export type TradePartnerPersonResponse = {
    tradePartnerPersons: TradePartnerPerson[];
    totalCount: number;
};
