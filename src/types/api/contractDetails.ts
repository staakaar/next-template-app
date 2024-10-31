// You can use a Zod schema here if you want.
export type Item = {
    itemId: string;
    itemName: string;
    expenseCode: string;
    expenseName: string;
    quantity: string;
    unit: string;
    unitPrice: string;
};

export type ContractDetailResponse = {
    items: Item[];
    totalCount: number;
};
