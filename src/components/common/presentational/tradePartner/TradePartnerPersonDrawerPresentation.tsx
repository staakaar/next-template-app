"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ColumnDef, SortingState } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IconTrash, IconEdit, IconEye, IconSearch } from "@tabler/icons-react";
import { usePaginationStore } from "@/stores/pagination/PaginationStore";
import VTooltip from "@/components/common/atoms/Tooltip";
import { sort } from "fast-sort";
import { TradingPartnerPerson } from "@/types/api/tradePartner";

export type TradePartnerPersonTableProps<T extends TradingPartnerPerson> = {
    tradePartnerPerson: T[];
    initialTotalCount: number;
};

const PAGE_SIZES = [10, 15, 20, 50, 75, 100];

const TradePartnerPersonDrawerPresentation = <T extends TradingPartnerPerson>({
    tradePartnerPerson,
    initialTotalCount,
}: TradePartnerPersonTableProps<T>) => {
    const router = useRouter();
    const [pageSize, setPageSize] = useState(PAGE_SIZES[2]);

    const [sortStatus, setSortStatus] = useState<SortingState>([
        { id: "tradePersonId", desc: false }
    ]);

    const [page, setPage] = useState(1);
    const [records, setRecords] = useState<TradingPartnerPerson[]>(
        tradePartnerPerson.slice(0, pageSize)
    );

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        console.log(from);
        console.log(to);
        setRecords(tradePartnerPerson.slice(from, to));
    }, [tradePartnerPerson, page, pageSize]);

    useEffect(() => {
        const sortedContracts = sort(tradePartnerPerson).by([
            { asc: (t) => t.tradingPersonId },
        ]) as TradingPartnerPerson[];
        /**
        setRecords(
            sortStatus.direction === "desc"
                ? sortedContracts.reverse()
                : sortedContracts
        );
         */
    }, [tradePartnerPerson, sortStatus]);

    const [totalCount, setTotalCount] = useState(initialTotalCount);
    const { setTradePartnerPageOptions } = usePaginationStore();

    const navigateToContractDetail = (row: TradingPartnerPerson) => {
        router.push(`/contract/`);
    };

    const handleDelete = (rowData: TradingPartnerPerson) => {
        console.log("Delete", rowData);
    };

    const handleEdit = (rowData: TradingPartnerPerson) => {
        console.log("Edit", rowData);
    };

    const handlePageChange = async (newPage: number) => {
        try {
            // const result = await useFetchContracts(newPage, pageSize);
            // setRecords(result.contracts);
            // setTotalCount(result.totalCount);
            // setPage(newPage);
        } catch (error) {
            console.error("Failed to fetch contracts:", error);
            // エラーハンドリングをここに追加（例：ユーザーへの通知）
        }
    };

    const handleSearchChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newSearchQuery = event.currentTarget.value;
        // setSearchQuery(newSearchQuery);
        try {
            // const result = await useFetchContracts(
            //     page,
            //     pageSize,
            //     newSearchQuery
            // );
            // setRecords(result.contracts);
            // setTotalCount(result.totalCount);
            // setPage(1);
        } catch (error) {
            console.error("Failed to fetch contracts:", error);
            // エラーハンドリングをここに追加
        }
    };

    const handleSortStatusChange = async (
        newSortStatus: SortingState
    ) => {
        // setSortStatus(newSortStatus);
        try {
            // const result = await useFetchContracts(page, pageSize);
            // setRecords(result.contracts);
            // setTotalCount(result.totalCount);
        } catch (error) {
            console.error("Failed to fetch contracts:", error);
            // エラーハンドリングをここに追加
        }
    };

    const columns: ColumnDef<TradingPartnerPerson>[] = [
        {
            accessorKey: "tradePersonId",
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
            accessorKey: "tradePersonName",
            header: "取引先担当者名",
            enableSorting: true,
            cell: ({ row }) => (
                <VTooltip
                    content={row.original.tradingPersonName}
                    tooltip={`タイトル: ${row.original.tradingPersonName}`}
                    maxWidth={"100"}
                />
            ),
        },
        {
            accessorKey: "tradePersonEmailAddress",
            header: "取引先担当者メールアドレス",
            enableSorting: true,
            cell: ({ row }) => (
                <VTooltip
                    content={row.original.tradingPersonEmailAddress}
                    tooltip={`取引先担当者メールアドレス: ${row.original.tradingPersonEmailAddress}`}
                    maxWidth={"100"}
                />
            ),
        },
        {
            accessorKey: "tradePartnerDepartmentId",
            header: "取引先担当部署ID",
            enableSorting: true,
            cell: ({ row }) => (
                <VTooltip
                    content={row.original.tradingPartnerDepartmentId}
                    tooltip={`取引先担当部署ID: ${row.original.tradingPartnerDepartmentId}`}
                    maxWidth={"100"}
                />
            ),
        },
        {
            accessorKey: "tradePartnerDepartmentName",
            header: "取引先担当部署名",
            enableSorting: true,
            cell: ({ row }) => (
                <VTooltip
                    content={row.original.tradingPartnerDepartmentName}
                    tooltip={`取引先担当部署名: ${row.original.tradingPartnerDepartmentName}`}
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
                    <Button
                        size="sm"
                        variant="ghost"
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => handleEdit(row.original)}
                    >
                        <IconEdit size={16} />
                    </Button>
                    <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(row.original)}
                    >
                        <IconTrash size={16} />
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <h2 className="text-lg font-semibold">取引先一覧</h2>
                    <div className="relative w-[600px]">
                        <IconSearch className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                            className="pl-8"
                            placeholder="Search..."
                        />
                    </div>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        data={records}
                        onRowClick={navigateToContractDetail}
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
                </CardContent>
            </Card>
        </>
    );
};

export default TradePartnerPersonDrawerPresentation;
