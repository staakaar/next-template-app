"use client";

import { Contract } from "@/types/api/contract";
import { Button } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

const columnHelper = createColumnHelper<Contract>();

export const columns = [
    columnHelper.accessor("contractCode", {
        cell: (info) => info.getValue(),
        footer: (info) => info.column.id,
        // cell: ({ row }) => {
        //     const amount = parseInt(row.getValue("amount"))
        //     const formatted = new Intl.NumberFormat("en-US", {
        //         style: "currency",
        //         currency: "USD",
        //     }).format(amount)
        //     return <div className="text-right font-medium">{formatted}</div>
        // }
    }),
    columnHelper.accessor((row) => row.contractName, {
        id: "契約書名",
        cell: (info) => <i>{info.getValue()}</i>,
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    案件名
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor("contractName", {
        header: () => "契約書名",
        cell: (info) => info.renderValue(),
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor("contractStatus", {
        header: () => "ステータス",
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
    // columnHelper.accessor((row) => row, {
    //     id: "actions",
    //     cell: ({ row }) => {
    //         const contract = row.original;

    //         return (
    //             <DropdownMenu>
    //                 <DropdownMenuTrigger asChild>
    //                     <Button
    //                         aria-haspopup="true"
    //                         size="icon"
    //                         variant="ghost"
    //                     >
    //                         <MoreHorizontal className="h-4 w-4" />
    //                         <span className="sr-only">Toggle menu</span>
    //                     </Button>
    //                 </DropdownMenuTrigger>
    //                 <DropdownMenuContent align="end">
    //                     <DropdownMenuLabel>Actions</DropdownMenuLabel>
    //                     <DropdownMenuItem
    //                         onClick={() =>
    //                             navigator.clipboard.writeText(
    //                                 contract.contractCode
    //                             )
    //                         }
    //                     ></DropdownMenuItem>
    //                     <DropdownMenuItem>Edit</DropdownMenuItem>
    //                     <DropdownMenuItem>Delete</DropdownMenuItem>
    //                 </DropdownMenuContent>
    //             </DropdownMenu>
    //         );
    //     },
    // }),
];
