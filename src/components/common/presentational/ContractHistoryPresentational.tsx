import { ContractHistoryForm } from "@/lib/contractHistory/schema";
import { usePaginationStore } from "@/stores/pagination/PaginationStore";
import { sort } from "fast-sort";
import {
    DataTable,
    DataTableColumn,
    DataTableSortStatus,
    useDataTableColumns,
} from "mantine-datatable";
import { useEffect, useState } from "react";
import VTooltip from "../atoms/Tooltip";
import { Box, Group, Stack } from "@mantine/core";

type ContractHistoryPresentationalProps<T extends ContractHistoryForm> = {
    contractHistories: T[];
    initialTotalCount: number;
};

const PAGE_SIZES = [10, 20, 50, 75, 100];

const ContractHistoryPresentational = <T extends ContractHistoryForm>({
    contractHistories,
    initialTotalCount,
}: ContractHistoryPresentationalProps<T>) => {
    const [pageSize, setPageSize] = useState(PAGE_SIZES[2]);
    const [sortStatus, setSortStatus] = useState<
        DataTableSortStatus<ContractHistoryForm>
    >({
        columnAccessor: "contractHistoryId",
        direction: "asc",
    });

    const [page, setPage] = useState(1);
    const [records, setRecords] = useState<ContractHistoryForm[]>(
        contractHistories.slice(0, pageSize)
    );
    const [totalCount, setTotalCount] = useState(initialTotalCount);
    const setPageOptions = usePaginationStore();

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecords(contractHistories.slice(from, to));
    }, [contractHistories, page, pageSize]);

    useEffect(() => {
        const sortedContracts = sort(contractHistories).by([
            { asc: (t: ContractHistoryForm) => t.contractHistoryId },
        ]) as ContractHistoryForm[];
        /**
      setRecords(
          sortStatus.direction === "desc"
              ? sortedContracts.reverse()
              : sortedContracts
      );
       */
    }, [contractHistories, sortStatus]);

    const columns: DataTableColumn<ContractHistoryForm>[] = [
        {
            accessor: "contractHistoryId",
            title: "履歴ID",
            sortable: true,
            render: (item: ContractHistoryForm) => (
                <VTooltip
                    content={item.contractHistoryId}
                    tooltip={`契約履歴ID: ${item.contractHistoryId}`}
                    maxWidth={"100"}
                />
            ),
        },
        {
            accessor: "beforeValue",
            title: "変更前",
            sortable: true,
            render: (item: ContractHistoryForm) => (
                <VTooltip
                    content={item.beforeValue}
                    tooltip={`変更前: ${item.beforeValue}`}
                    maxWidth={"100"}
                />
            ),
        },
        {
            accessor: "afterValue",
            title: "変更後",
            sortable: true,
            render: (item: ContractHistoryForm) => (
                <VTooltip
                    content={item.afterValue}
                    tooltip={`変更後: ${item.afterValue}`}
                    maxWidth={"100"}
                />
            ),
        },
        {
            accessor: "personInCharge",
            title: "変更者",
            sortable: true,
            render: (item: ContractHistoryForm) => (
                <VTooltip
                    content={item.personInCharge}
                    tooltip={`変更者: ${item.personInCharge}`}
                    maxWidth={"100"}
                />
            ),
        },
        {
            accessor: "updateAt",
            title: "更新日時",
            sortable: true,
            render: (item: ContractHistoryForm) => (
                <VTooltip
                    content={item.updateAt}
                    tooltip={`単位: ${item.updateAt}`}
                    maxWidth={"100"}
                />
            ),
        },
    ];

    const { effectiveColumns } = useDataTableColumns<ContractHistoryForm>({
        key: "contractHistoryId",
        columns,
    });

    return (
        <DataTable
            className="mt-8"
            withTableBorder
            borderRadius="md"
            striped
            highlightOnHover={true}
            columns={effectiveColumns}
            records={records}
            noRecordsText={
                records.length === 0 ? "該当のレコードが存在しません。" : ""
            }
            rowExpansion={{
                content: ({ record }) => (
                    <Stack className="text-sm bg-gray-50 p-4" gap={6}>
                        <Group gap={6}>
                            <Box className="w-[130px]">after Value</Box>
                            <Box className="">{record.afterValue}</Box>
                        </Group>
                        <Group gap={6}>
                            <Box className="w-[130px]">before Value</Box>
                            <Box className="">{record.beforeValue}</Box>
                        </Group>
                    </Stack>
                ),
            }}
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
            idAccessor="contractHistoryId"
            styles={{
                pagination: {
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    padding: "1rem",
                    gap: "1rem",

                    ".mantineGroupRoot": {
                        display: "flex",
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

export default ContractHistoryPresentational;
