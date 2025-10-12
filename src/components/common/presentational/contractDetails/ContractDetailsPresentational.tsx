"use client";
import { useEffect, useState } from "react";
import { usePaginationStore } from "@/stores/pagination/PaginationStore";
import { Item } from "@/types/api/contractDetails";
import { Button } from "@/components/ui/button";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import { ColumnDef, SortingState } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import VTooltip from "../../atoms/Tooltip";
import { sort } from "fast-sort";
import { useRouter } from "next/navigation";

export type ContractDetailsTableProps<T extends Item> = {
    items: T[];
    initialTotalCount: number;
};

const PAGE_SIZES = [10, 15, 20, 50, 75, 100];

const ContractDetailsPresentational = <T extends Item>({
    items,
    initialTotalCount,
}: ContractDetailsTableProps<T>) => {
    const [pageSize, setPageSize] = useState(PAGE_SIZES[2]);
    const [sortStatus, setSortStatus] = useState<SortingState>([
        { id: "itemId", desc: false }
    ]);

    const [page, setPage] = useState(1);
    const [records, setRecords] = useState<Item[]>(items.slice(0, pageSize));
    const [totalCount, setTotalCount] = useState(initialTotalCount);
    const setPageOptions = usePaginationStore();

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecords(items.slice(from, to));
    }, [items, page, pageSize]);

    useEffect(() => {
        const sortedContracts = sort(items).by([
            { asc: (t: Item) => t.itemId },
        ]) as Item[];
        /**
        setRecords(
            sortStatus.direction === "desc"
                ? sortedContracts.reverse()
                : sortedContracts
        );
         */
    }, [items, sortStatus]);

    const columns: ColumnDef<Item>[] = [
        {
            accessorKey: "itemId",
            header: "品目ID",
            enableSorting: true,
            cell: ({ row }) => (
                <VTooltip
                    content={row.original.itemId}
                    tooltip={`品目ID: ${row.original.itemId}`}
                    maxWidth={"100"}
                />
            ),
        },
        {
            accessorKey: "itemName",
            header: "品目名",
            enableSorting: true,
            cell: ({ row }) => (
                <VTooltip
                    content={row.original.itemName}
                    tooltip={`品目名: ${row.original.itemName}`}
                    maxWidth={"100"}
                />
            ),
        },
        {
            accessorKey: "expenseCode",
            header: "費目コード",
            enableSorting: true,
            cell: ({ row }) => (
                <VTooltip
                    content={row.original.expenseCode}
                    tooltip={`費目コード: ${row.original.expenseCode}`}
                    maxWidth={"100"}
                />
            ),
        },
        {
            accessorKey: "expenseName",
            header: "費目名",
            enableSorting: true,
            cell: ({ row }) => (
                <VTooltip
                    content={row.original.expenseName}
                    tooltip={`費目名: ${row.original.expenseName}`}
                    maxWidth={"100"}
                />
            ),
        },
        {
            accessorKey: "quantity",
            header: "数量",
            enableSorting: true,
            cell: ({ row }) => (
                <VTooltip
                    content={row.original.quantity}
                    tooltip={`数量: ${row.original.quantity}`}
                    maxWidth={"100"}
                />
            ),
        },
        {
            accessorKey: "unit",
            header: "単位",
            enableSorting: true,
            cell: ({ row }) => (
                <VTooltip
                    content={row.original.unit}
                    tooltip={`単位: ${row.original.unit}`}
                    maxWidth={"100"}
                />
            ),
        },
        {
            accessorKey: "unitPrice",
            header: "単価",
            enableSorting: true,
            cell: ({ row }) => (
                <VTooltip
                    content={row.original.unitPrice}
                    tooltip={`単価: ${row.original.unitPrice}`}
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

export default ContractDetailsPresentational;
