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
