import { TradePartner } from "@/types/api/tradePartner";
import { Button } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

const columnHelper = createColumnHelper<TradePartner>();

export const columns = [
    columnHelper.accessor("tradeCompanyId", {
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
    columnHelper.accessor((row) => row.tradeCompanyName, {
        id: "取引先会社名",
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
    columnHelper.accessor("tradeCompanyAddress", {
        header: () => "取引先会社住所",
        cell: (info) => info.renderValue(),
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor("tradePersonId", {
        header: () => <span>取引担当者ID</span>,
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor("tradePersonName", {
        header: "取引先担当者名",
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor("tradePartnerDepartmentId", {
        header: "取引先担当者部署ID",
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor("tradePartnerDepartmentName", {
        header: "取引先担当者部署名",
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
