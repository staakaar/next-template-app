import { TradePartnerPerson } from "@/types/api/tradePartner";
import { Button } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

const columnHelper = createColumnHelper<TradePartnerPerson>();

export const columns = [
    columnHelper.accessor("tradePersonId", {
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
    columnHelper.accessor((row) => row.tradePersonName, {
        id: "取引先担当者名",
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
    columnHelper.accessor("tradePersonEmailAddress", {
        header: () => "取引先メールアドレス",
        cell: (info) => info.renderValue(),
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor("tradePartnerDepartmentId", {
        header: () => <span>取引担当者部署ID</span>,
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor("tradePartnerDepartmentName", {
        header: "取引担当者部署名",
        footer: (info) => info.column.id,
    }),
];
