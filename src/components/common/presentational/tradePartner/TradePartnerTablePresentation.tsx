"use client";
import { usePaginationStore } from "@/stores/pagination/PaginationStore";
import { TradingPartnerPerson } from "@/types/api/tradePartner";
import { sort } from "fast-sort";
import { ColumnDef, SortingState } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import VTooltip from "../../atoms/Tooltip";
import { Button } from "@/components/ui/button";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";

export type TradePartnerTableProps<T extends TradingPartnerPerson> = {
    tradingPartnerPersons: T[];
    initialTotalCount: number;
};

const PAGE_SIZES = [10, 15, 20, 50, 75, 100];

const TradePartnerTablePresentation = <T extends TradingPartnerPerson>({
    tradingPartnerPersons,
    initialTotalCount,
}: TradePartnerTableProps<T>) => {
    const [pageSize, setPageSize] = useState(PAGE_SIZES[2]);
    const [page, setPage] = useState(1);
    const [records, setRecords] = useState<TradingPartnerPerson[]>(
        tradingPartnerPersons.slice(0, pageSize)
    );
    const [totalCount, setTotalCount] = useState(initialTotalCount);
    const { setTradePartnerPageOptions } = usePaginationStore();

    const [sortStatus, setSortStatus] = useState<SortingState>([
        { id: "tradingPersonId", desc: false }
    ]);

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        console.log(from);
        console.log(to);
        setRecords(tradingPartnerPersons.slice(from, to));
    }, [tradingPartnerPersons, page, pageSize]);

    useEffect(() => {
        const sortedContracts = sort(tradingPartnerPersons).by([
            { asc: (t: TradingPartnerPerson) => t.tradingPersonId },
        ]) as TradingPartnerPerson[];
        /**
        setRecords(
            sortStatus.direction === "desc"
                ? sortedContracts.reverse()
                : sortedContracts
        );
         */
    }, [tradingPartnerPersons, sortStatus]);

    const columns: ColumnDef<TradingPartnerPerson>[] = [
        {
            accessorKey: "tradingPersonId",
            header: "取引先担当者ID",
            enableSorting: true,
            cell: ({ row }) => (
                <VTooltip
                    content={row.original.tradingPersonId}
                    tooltip={`取引先担当者ID: ${row.original.tradingPersonId}`}
                    maxWidth={"100"}
                />
            ),
        },
        {
            accessorKey: "tradingPersonName",
            header: "取引先担当名",
            enableSorting: true,
            cell: ({ row }) => (
                <VTooltip
                    content={row.original.tradingPersonName}
                    tooltip={`取引先担当名: ${row.original.tradingPersonName}`}
                    maxWidth={"100"}
                />
            ),
        },
        {
            accessorKey: "tradingPersonEmailAddress",
            header: "取引先担当者メールアドレス",
            enableSorting: true,
            cell: ({ row }) => (
                <VTooltip
                    content={row.original.tradingPersonEmailAddress}
                    tooltip={`メールアドレス: ${row.original.tradingPersonEmailAddress}`}
                    maxWidth={"100"}
                />
            ),
        },
        {
            accessorKey: "tradingPartnerDepartmentId",
            header: "取引先担当者部署ID",
            enableSorting: true,
            cell: ({ row }) => (
                <VTooltip
                    content={row.original.tradingPartnerDepartmentId}
                    tooltip={`取引先担当者部署ID: ${row.original.tradingPartnerDepartmentId}`}
                    maxWidth={"100"}
                />
            ),
        },
        {
            accessorKey: "tradingPartnerDepartmentName",
            header: "取引先担当者部署名",
            enableSorting: true,
            cell: ({ row }) => (
                <VTooltip
                    content={row.original.tradingPartnerDepartmentName}
                    tooltip={`取引先担当者部署名: ${row.original.tradingPartnerDepartmentName}`}
                    maxWidth={"100"}
                />
            ),
        },
    ];

    return (
        <DataTable
            className="mt-8"
            columns={columns}
            data={records}
            pageSize={pageSize}
            onPageSizeChange={setPageSize}
            page={page}
            onPageChange={(p) => setPage(p)}
            totalRecords={totalCount}
            pageOptions={PAGE_SIZES}
            sorting={sortStatus}
            onSortingChange={setSortStatus}
            noRecordsText="該当のレコードが存在しません。"
            highlightOnHover={true}
            striped={true}
        />
    );
};

export default TradePartnerTablePresentation;
