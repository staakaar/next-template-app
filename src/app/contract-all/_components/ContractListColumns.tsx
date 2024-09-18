"use client";

import { Contract } from "@/types/api/contract";
import { createColumnHelper } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

const columnHelper = createColumnHelper<Contract>();

export const columns = [
    columnHelper.accessor("contractCode", {
        cell: (info) => info.getValue(),
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.contractName, {
        id: "契約書名",
        cell: (info) => <i>{info.getValue()}</i>,
        header: () => <span>Last Name</span>,
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor("contractName", {
        header: () => "契約書名",
        cell: (info) => info.renderValue(),
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor("tradePartner", {
        header: () => <span>取引先</span>,
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor("contractPersonInCharge", {
        header: "担当者",
        footer: (info) => info.column.id,
    }),
];
