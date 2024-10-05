// You can use a Zod schema here if you want.
export type Contract = {
    contractCode: string;
    contractName: string;
    contractStatus: string;
    tradePartner: string;
    contractPersonInCharge: string;
};

export type ContractResponse = {
    contracts: Contract[];
    totalCount: number;
};
