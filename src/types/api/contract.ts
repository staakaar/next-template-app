export type Contract = {
    contractCode: string;
    contractName: string;
    tradePartner: string;
    contractPersonInCharge: string;
};

export type ContractResponse = {
    contracts: Contract[];
    totalCount: number;
};
