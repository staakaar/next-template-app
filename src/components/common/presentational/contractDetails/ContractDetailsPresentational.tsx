"use client";
import { useEffect, useState } from "react";
import { usePaginationStore } from "@/stores/pagination/PaginationStore";
import { Item } from "@/types/api/contractDetails";
import { ActionIcon, Group } from "@mantine/core";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import {
    DataTable,
    DataTableColumn,
    DataTableSortStatus,
    useDataTableColumns,
} from "mantine-datatable";
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
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus<Item>>({
        columnAccessor: "itemId",
        direction: "asc",
    });

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

    const columns: DataTableColumn<Item>[] = [
        {
            accessor: "itemId",
            title: "品目ID",
            sortable: true,
            render: (item: Item) => (
                <VTooltip
                    content={item.itemId}
                    tooltip={`品目ID: ${item.itemId}`}
                    maxWidth={"100"}
                />
            ),
        },
        {
            accessor: "itemName",
            title: "品目名",
            sortable: true,
            render: (item: Item) => (
                <VTooltip
                    content={item.itemName}
                    tooltip={`品目名: ${item.itemName}`}
                    maxWidth={"100"}
                />
            ),
        },
        {
            accessor: "expenseCode",
            title: "費目コード",
            sortable: true,
            render: (item: Item) => (
                <VTooltip
                    content={item.expenseCode}
                    tooltip={`費目コード: ${item.expenseCode}`}
                    maxWidth={"100"}
                />
            ),
        },
        {
            accessor: "expenseName",
            title: "費目名",
            sortable: true,
            render: (item: Item) => (
                <VTooltip
                    content={item.expenseName}
                    tooltip={`費目名: ${item.expenseName}`}
                    maxWidth={"100"}
                />
            ),
        },
        {
            accessor: "quantity",
            title: "数量",
            sortable: true,
            render: (item: Item) => (
                <VTooltip
                    content={item.quantity}
                    tooltip={`数量: ${item.quantity}`}
                    maxWidth={"100"}
                />
            ),
        },
        {
            accessor: "unit",
            title: "単位",
            sortable: true,
            render: (item: Item) => (
                <VTooltip
                    content={item.unit}
                    tooltip={`単位: ${item.unit}`}
                    maxWidth={"100"}
                />
            ),
        },
        {
            accessor: "unitPrice",
            title: "単価",
            sortable: true,
            render: (item: Item) => (
                <VTooltip
                    content={item.unitPrice}
                    tooltip={`単価: ${item.unitPrice}`}
                    maxWidth={"100"}
                />
            ),
        },
        {
            accessor: "actions",
            title: "",
            textAlign: "right",
            render: (item: Item) => (
                <Group gap={4} justify="right" wrap="nowrap">
                    <ActionIcon size="sm" variant="subtle" color="green">
                        <IconEye size={16} />
                    </ActionIcon>
                    <ActionIcon size="sm" variant="subtle" color="blue">
                        <IconEdit size={16} />
                    </ActionIcon>
                    <ActionIcon size="sm" variant="subtle" color="red">
                        <IconTrash size={16} />
                    </ActionIcon>
                </Group>
            ),
        },
    ];

    const { effectiveColumns } = useDataTableColumns<Item>({
        key: "itemId",
        columns,
    });

    return (
        <DataTable
            className="mt-8"
            withTableBorder
            borderRadius="sm"
            striped
            highlightOnHover={true}
            columns={effectiveColumns}
            records={records}
            noRecordsText={
                records.length === 0 ? "該当のレコードが存在しません。" : ""
            }
            // noRecordsIcon={true}
            emptyState={records.length === 0}
            loadingText="読み込み中です..."
            totalRecords={totalCount}
            recordsPerPage={pageSize}
            recordsPerPageLabel=""
            paginationActiveBackgroundColor="blue"
            page={page}
            recordsPerPageOptions={PAGE_SIZES}
            sortStatus={sortStatus}
            onSortStatusChange={setSortStatus}
            onPageChange={(p) => setPage(p)}
            onRecordsPerPageChange={setPageSize}
            idAccessor="itemId"
            styles={{
                pagination: {
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    padding: "1rem",
                    gap: "1rem",

                    ".mantineGroupRoot": {
                        dispaly: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        flex: 1,
                    },

                    "[dataRecordsPerPage]": {
                        order: 1,
                    },

                    ".mantinePaginationRoot": {
                        order: 2,
                    },

                    "[dataPaginationText]": {
                        marginLeft: "auto",
                        whiteSpace: "nowrap",
                        order: 3,
                    },

                    tr: {
                        cursor: "pointer",
                        position: "relative",
                        transition: "all 0.2s ease",
                        "&:hover": {
                            backgroundColor: "blue",
                            boxShadow: `0 4px 8px `,
                            transform: "translateY(-1px)",
                            zIndex: 1, // 他の行より上に表示
                        },
                    },
                },
            }}
        />
    );
};

export default ContractDetailsPresentational;
