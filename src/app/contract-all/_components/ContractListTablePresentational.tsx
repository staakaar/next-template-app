"use client";
import { IconEdit, IconEye, IconSearch, IconTrash } from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Contract } from "@/types/api/contract";

export type ContractListTableProps<T extends Contract> = {
    contracts: T[];
    initialTotalCount?: number;
};

const PAGE_SIZES = [10, 15, 20, 50, 75, 100];

// Tooltip Wrapper Component
const TooltipCell = ({
    content,
    tooltip,
}: { content: string; tooltip: string }) => (
    <TooltipProvider>
        <Tooltip>
            <TooltipTrigger asChild>
                <div className="max-w-[100px] truncate cursor-default">
                    {content}
                </div>
            </TooltipTrigger>
            <TooltipContent>
                <p>{tooltip}</p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
);

const ContractListTablePresentation = <T extends Contract>({
    contracts,
}: ContractListTableProps<T>) => {
    const router = useRouter();
    const [pageSize, setPageSize] = useState(PAGE_SIZES[2]);
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");

    const handleDelete = useCallback((rowData: Contract) => {
        console.log("Delete", rowData);
    }, []);

    const handleEdit = useCallback((rowData: Contract) => {
        console.log("Edit", rowData);
    }, []);

    const handleRowClick = useCallback((row: Contract) => {
        router.push(`/contract/${row.contractCode}`);
    }, [router]);

    const columns: ColumnDef<Contract>[] = useMemo(
        () => [
            {
                accessorKey: "contractCode",
                header: "契約書コード",
                cell: ({ row }) => (
                    <TooltipCell
                        content={row.original.contractCode}
                        tooltip={`契約書コード: ${row.original.contractCode}`}
                    />
                ),
            },
            {
                accessorKey: "contractName",
                header: "タイトル",
                cell: ({ row }) => (
                    <TooltipCell
                        content={row.original.contractName}
                        tooltip={`契約書名: ${row.original.contractName}`}
                    />
                ),
            },
            {
                accessorKey: "contractStatus",
                header: "ステータス",
                cell: ({ row }) => (
                    <TooltipCell
                        content={row.original.contractStatus}
                        tooltip={`契約書ステータス: ${row.original.contractStatus}`}
                    />
                ),
            },
            {
                accessorKey: "tradePartner",
                header: "取引先",
                cell: ({ row }) => (
                    <TooltipCell
                        content={row.original.tradePartner}
                        tooltip={`取引先: ${row.original.tradePartner}`}
                    />
                ),
            },
            {
                accessorKey: "contractPersonInCharge",
                header: "担当者",
                cell: ({ row }) => (
                    <TooltipCell
                        content={row.original.contractPersonInCharge}
                        tooltip={`担当者: ${row.original.contractPersonInCharge}`}
                    />
                ),
            },
            {
                id: "actions",
                header: "",
                cell: ({ row }) => (
                    <div className="flex justify-end gap-1">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                        }}
                                    >
                                        <IconEye size={16} />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>詳細を表示</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleEdit(row.original);
                                        }}
                                    >
                                        <IconEdit size={16} />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>編集</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDelete(row.original);
                                        }}
                                    >
                                        <IconTrash size={16} />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>削除</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                ),
            },
        ],
        [handleDelete, handleEdit]
    );

    // Filter data based on search query
    const filteredData = useMemo(() => {
        if (!searchQuery) return contracts;

        return contracts.filter((item: Contract) =>
            Object.values(item).some(
                (value) =>
                    value?.toString()
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
            )
        );
    }, [contracts, searchQuery]);

    return (
        <Card className="border">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">契約書一覧</CardTitle>
                    <div className="relative w-[600px]">
                        <IconSearch
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                            size={16}
                        />
                        <Input
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <DataTable
                    columns={columns}
                    data={filteredData}
                    onRowClick={handleRowClick}
                    pageSize={pageSize}
                    onPageSizeChange={setPageSize}
                    page={page}
                    onPageChange={setPage}
                    totalRecords={filteredData.length}
                    pageOptions={PAGE_SIZES}
                    noRecordsText="該当のレコードが存在しません。"
                    highlightOnHover={true}
                    striped={true}
                />
            </CardContent>
        </Card>
    );
};

export default ContractListTablePresentation;
