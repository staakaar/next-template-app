"use client";
import { sort } from "fast-sort";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";
import {
    DataTable,
    useDataTableColumns,
    DataTableSortStatus,
    DataTableRowClickHandler,
    DataTableColumn,
} from "mantine-datatable";
import {
    Card,
    Text,
    Group,
    Button,
    ActionIcon,
    Tooltip,
    TextInput,
    Select,
    Box,
    Collapse,
    Menu,
    MenuItem,
    MenuTarget,
    MenuDropdown,
} from "@mantine/core";
import {
    IconSearch,
    IconTrash,
    IconEdit,
    IconDots,
    IconEye,
} from "@tabler/icons-react";
import { contractPageOptionsState } from "@/stores/contracts/atom";
import { Contract } from "@/types/api/contract";
import { useFetchContracts } from "@/lib/contract/api";
import VTooltip from "@/components/common/atoms/Tooltip";

export type ContractListTableProps<T extends Contract> = {
    contracts: T[];
    initialTotalCount: number;
};

const PAGE_SIZES = [10, 15, 20, 50, 75, 100];

const ContractListTablePresentation = <T extends Contract>({
    contracts,
    initialTotalCount,
}: ContractListTableProps<T>) => {
    const router = useRouter();
    const [pageSize, setPageSize] = useState(PAGE_SIZES[2]);

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    const [sortStatus, setSortStatus] = useState<DataTableSortStatus<Contract>>(
        {
            columnAccessor: "contractCode",
            direction: "asc",
        }
    );

    const [page, setPage] = useState(1);
    const [records, setRecords] = useState<Contract[]>(
        contracts.slice(0, pageSize)
    );

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        console.log(from);
        console.log(to);
        setRecords(contracts.slice(from, to));
    }, [contracts, page, pageSize]);

    useEffect(() => {
        const sortedContracts = sort(contracts).by([
            { asc: (c) => c.contractCode },
        ]) as Contract[];
        /**
        setRecords(
            sortStatus.direction === "desc"
                ? sortedContracts.reverse()
                : sortedContracts
        );
         */
    }, [contracts, sortStatus]);

    const [totalCount, setTotalCount] = useState(initialTotalCount);
    const setPageOptions = useSetRecoilState(contractPageOptionsState);

    const navigateToContractDetail: DataTableRowClickHandler<Contract> = ({
        record,
    }) => {
        router.push(`/contract/${record.contractCode}`);
    };

    const handleDelete = (rowData: Contract) => {
        console.log("Delete", rowData);
    };

    const handleEdit = (rowData: Contract) => {
        console.log("Edit", rowData);
    };

    const handlePageChange = async (newPage: number) => {
        try {
            const result = await useFetchContracts(newPage, pageSize);
            setRecords(result.contracts);
            setTotalCount(result.totalCount);
            setPage(newPage);
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
            const result = await useFetchContracts(
                page,
                pageSize,
                newSearchQuery
            );
            setRecords(result.contracts);
            setTotalCount(result.totalCount);
            setPage(1);
        } catch (error) {
            console.error("Failed to fetch contracts:", error);
            // エラーハンドリングをここに追加
        }
    };

    const handleSortStatusChange = async (
        newSortStatus: DataTableSortStatus<T>
    ) => {
        setSortStatus(newSortStatus);
        try {
            const result = await useFetchContracts(page, pageSize);
            setRecords(result.contracts);
            setTotalCount(result.totalCount);
        } catch (error) {
            console.error("Failed to fetch contracts:", error);
            // エラーハンドリングをここに追加
        }
    };

    const columns: DataTableColumn<Contract>[] = [
        {
            accessor: "contractCode",
            title: "契約書コード",
            sortable: true,
            render: (contract: Contract) => (
                <VTooltip
                    content={contract.contractCode}
                    tooltip={`契約書コード: ${contract.contractCode}`}
                    maxWidth={"100"}
                />
            ),
        },
        {
            accessor: "contractName",
            title: "タイトル",
            sortable: true,
            render: (contract: Contract) => (
                <VTooltip
                    content={contract.contractName}
                    tooltip={`契約書名: ${contract.contractName}`}
                    maxWidth={"100"}
                />
            ),
        },
        {
            accessor: "contractStatus",
            title: "ステータス",
            sortable: true,
            render: (contract: Contract) => (
                <VTooltip
                    content={contract.contractStatus}
                    tooltip={`契約書ステータス: ${contract.contractStatus}`}
                    maxWidth={"100"}
                />
            ),
        },
        {
            accessor: "tradePartner",
            title: "取引先",
            sortable: true,
            render: (contract: Contract) => (
                <VTooltip
                    content={contract.tradePartner}
                    tooltip={`取引先: ${contract.tradePartner}`}
                    maxWidth={"100"}
                />
            ),
        },
        {
            accessor: "contractPersonInCharge",
            title: "担当者",
            sortable: true,
            render: (contract: Contract) => (
                <VTooltip
                    content={contract.contractPersonInCharge}
                    tooltip={`担当者: ${contract.contractPersonInCharge}`}
                    maxWidth={"100"}
                />
            ),
        },
        // {
        //     accessor: "createdAt",
        //     title: "作成日",
        //     sortable: true,
        //     render: ({ createdAt }) =>
        //         new Date(createdAt).toLocaleDateString(),
        // },
        {
            accessor: "actions",
            title: "",
            textAlign: "right",
            render: (contract: Contract) => (
                <Group gap={4} justify="right" wrap="nowrap">
                    <ActionIcon size="sm" variant="subtle" color="green">
                        <IconEye size={16} />
                    </ActionIcon>
                    <ActionIcon
                        size="sm"
                        variant="subtle"
                        color="blue"
                        onClick={() => handleEdit(contract)}
                    >
                        <IconEdit size={16} />
                    </ActionIcon>
                    <ActionIcon
                        size="sm"
                        variant="subtle"
                        color="red"
                        onClick={() => handleDelete(contract)}
                    >
                        <IconTrash size={16} />
                    </ActionIcon>
                </Group>
            ),
        },
    ];

    const { effectiveColumns } = useDataTableColumns<Contract>({
        key: "contractCode",
        columns,
    });

    // const filteredData = useMemo(() => {
    //     return contracts.filter((item: Contract) =>
    //         Object.values(item).some(
    //             (value) =>
    //                 value &&
    //                 value
    //                     .toString()
    //                     .toLowerCase()
    //                     .includes(searchQuery.toLowerCase())
    //         )
    //     );
    // }, [contracts, searchQuery]);

    return (
        <Card withBorder mt={4}>
            <Group justify="flex-start" mb="md">
                <Text size="lg">契約書一覧</Text>
            </Group>

            <DataTable
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
                onRowClick={navigateToContractDetail}
                onPageChange={(p) => setPage(p)}
                onRecordsPerPageChange={setPageSize}
                styles={{
                    pagination: {
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        padding: "1rem",
                        gap: "1rem",

                        ".mantine-Group-root": {
                            dispaly: "flex",
                            alignItems: "center",
                            gap: "1rem",
                            flex: 1,
                        },

                        "[data-records-per-page]": {
                            order: 1,
                        },

                        ".mantine-Pagination-root": {
                            order: 2,
                        },

                        "[data-pagination-text]": {
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
                // paginationText={({ from, to, totalRecords }) =>
                //     `${from}～${to} / ${totalRecords}件`
                // }
            />
        </Card>
    );
};

export default ContractListTablePresentation;
