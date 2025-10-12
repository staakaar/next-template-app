"use client";
import TradePartnerPersonDrawerContainer from "../../container/tradePartner/TradePartnerPersonDrawerContainer";
import React, { useEffect, useState } from "react";
import { TradingPartnerCompany } from "@/types/api/tradePartner";
import { ColumnDef, SortingState } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { useRouter } from "next/navigation";
import { defaultTradingPartnerCompanyForm } from "@/stores/tradePartner/TradePartnerCompanyStore";
import { usePaginationStore } from "@/stores/pagination/PaginationStore";
import VTooltip from "../../atoms/Tooltip";
import { Button } from "@/components/ui/button";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import { sort } from "fast-sort";

export type TradePartnerTableProps<T extends TradingPartnerCompany> = {
    tradingPartnerCompanies: T[];
    initialTotalCount: number;
};

const PAGE_SIZES = [10, 15, 20, 50, 75, 100];

const TradePartnerCompanyTablePresentation = <T extends TradingPartnerCompany>({
    tradingPartnerCompanies,
    initialTotalCount,
}: TradePartnerTableProps<T>) => {
    /** ドロワー */
    const [opened, setOpened] = useState(false);
    const open = () => setOpened(true);
    const close = () => setOpened(false);

    const [selectedRow, setSelectedRow] = useState(
        defaultTradingPartnerCompanyForm
    );

    const [pageSize, setPageSize] = useState(PAGE_SIZES[2]);

    const [sortStatus, setSortStatus] = useState<SortingState>([
        { id: "tradingCompanyId", desc: false }
    ]);

    const [page, setPage] = useState(1);
    const [records, setRecords] = useState<TradingPartnerCompany[]>(
        tradingPartnerCompanies.slice(0, pageSize)
    );

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        console.log(from);
        console.log(to);
        setRecords(tradingPartnerCompanies.slice(from, to));
    }, [tradingPartnerCompanies, page, pageSize]);

    useEffect(() => {
        const sortedContracts = sort(tradingPartnerCompanies).by([
            { asc: (t: TradingPartnerCompany) => t.tradingCompanyId },
        ]) as TradingPartnerCompany[];
        /**
        setRecords(
            sortStatus.direction === "desc"
                ? sortedContracts.reverse()
                : sortedContracts
        );
         */
    }, [tradingPartnerCompanies, sortStatus]);

    const [totalCount, setTotalCount] = useState(initialTotalCount);
    const { setTradePartnerPageOptions } = usePaginationStore();

    const navigateToTradePartnerPerson = (row: TradingPartnerCompany) => {
        console.log(row);
        setSelectedRow(row);
        open;
    };

    const columns: ColumnDef<TradingPartnerCompany>[] = [
        {
            accessorKey: "tradeCompanyName",
            header: "取引先会社名",
            enableSorting: true,
            cell: ({ row }) => (
                <VTooltip
                    content={row.original.tradingCompanyName}
                    tooltip={`取引先会社名: ${row.original.tradingCompanyName}`}
                    maxWidth={"100"}
                />
            ),
        },
        {
            accessorKey: "tradeCompanyAddress",
            header: "取引先企業住所",
            enableSorting: true,
            cell: ({ row }) => (
                <VTooltip
                    content={row.original.tradingCompanyAddress}
                    tooltip={`取引先企業住所: ${row.original.tradingCompanyAddress}`}
                    maxWidth={"100"}
                />
            ),
        },
        {
            accessorKey: "tradingCompanyEmailAddress",
            header: "取引先企業メールアドレス",
            enableSorting: true,
            cell: ({ row }) => (
                <VTooltip
                    content={row.original.tradingCompanyEmailAddress}
                    tooltip={`メールアドレス: ${row.original.tradingCompanyEmailAddress}`}
                    maxWidth={"100"}
                />
            ),
        },
        {
            id: "actions",
            header: "",
            cell: ({ row }) => (
                <div className="flex gap-1 justify-end flex-nowrap">
                    <Button size="sm" variant="ghost" className="text-green-500 hover:text-green-700">
                        <IconEye size={16} />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-blue-500 hover:text-blue-700">
                        <IconEdit size={16} />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-700">
                        <IconTrash size={16} />
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <>
            <DataTable
                className="mt-8"
                columns={columns}
                data={records}
                onRowClick={navigateToTradePartnerPerson}
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

            <TradePartnerPersonDrawerContainer
                opened={opened}
                onClose={close}
                selectedRow={selectedRow}
            />
        </>
    );
};

export default TradePartnerCompanyTablePresentation;
