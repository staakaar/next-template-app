"use client";
import { ActionIcon, Box, Group } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { sort } from "fast-sort";
import {
    DataTable,
    type DataTableColumn,
    DataTableSortStatus,
    useDataTableColumns,
} from "mantine-datatable";
import { useEffect, useState } from "react";
import type { ContractAuthority } from "@/hooks/contractAuthority";
import { usePaginationStore } from "@/stores/pagination/PaginationStore";
import VTooltip from "../atoms/Tooltip";

type ContractAuthorityListPresentationProps<T extends ContractAuthority> = {
    contractAuthorities: T[];
    initialTotalCount: number;
};

const PAGE_SIZES = [50, 75, 100];

const ContractAuthorityListPresentation = <T extends ContractAuthority>({
    contractAuthorities,
    initialTotalCount,
}: ContractAuthorityListPresentationProps<T>) => {
    const [pageSize, setPageSize] = useState(PAGE_SIZES[2]);
    const [page, setPage] = useState(1);
    const [records, setRecords] = useState<ContractAuthority[]>(
        contractAuthorities.slice(0, pageSize)
    );
    const [totalCount, setTotalCount] = useState(initialTotalCount);
    const setPageOptions = usePaginationStore();

    // useEffect(() => {
    //     setPage(1);
    // }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecords(contractAuthorities.slice(from, to));
    }, [contractAuthorities, page, pageSize]);

    useEffect(() => {
        const sortedContracts = sort(contractAuthorities).by([
            { asc: (t: ContractAuthority) => t.roleId },
        ]) as ContractAuthority[];
    }, [contractAuthorities]);

    const columns: DataTableColumn<ContractAuthority>[] = [
        {
            accessor: "roleCategory",
            title: "契約種別",
            sortable: true,
            render: (item: ContractAuthority) => (
                <VTooltip
                    content={item.roleId}
                    tooltip={`契約種別: ${item.roleId}`}
                    maxWidth={"100"}
                />
            ),
        },
        {
            accessor: "roleName",
            title: "ユーザー/部署",
            sortable: true,
            render: (item: ContractAuthority) => (
                <VTooltip
                    content={item.roleName}
                    tooltip={`変更者: ${item.roleName}`}
                    maxWidth={"100"}
                />
            ),
        },
        {
            accessor: "roleType",
            title: "権限タイプ",
            sortable: true,
            render: (item: ContractAuthority) => (
                <VTooltip
                    content={item.roleType}
                    tooltip={`変更者: ${item.roleType}`}
                    maxWidth={"100"}
                />
            ),
        },
        {
            accessor: "actions",
            title: "",
            textAlign: "right",
            render: (company) => (
                <Group gap={2} justify="right" wrap="nowrap">
                    <ActionIcon
                        size="sm"
                        variant="subtle"
                        color="red"
                        onClick={() => {}}
                    >
                        <IconTrash size={16} />
                    </ActionIcon>
                </Group>
            ),
        },
    ];

    const { effectiveColumns } = useDataTableColumns<ContractAuthority>({
        key: "roleId",
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
            emptyState={records.length === 0}
            loadingText="読み込み中です..."
            totalRecords={totalCount}
            recordsPerPage={pageSize}
            recordsPerPageLabel=""
            paginationActiveBackgroundColor="blue"
            page={page}
            recordsPerPageOptions={PAGE_SIZES}
            // sortStatus={sortStatus}
            // onSortStatusChange={setSortStatus}
            onPageChange={(p) => setPage(p)}
            onRecordsPerPageChange={setPageSize}
            idAccessor="roleId"
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

export default ContractAuthorityListPresentation;
