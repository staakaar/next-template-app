"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    DataTable,
    useDataTableColumns,
    DataTableSortStatus,
    DataTableRowClickHandler,
    DataTableColumn,
} from "mantine-datatable";
import { Card, Text, Group, ActionIcon, TextInput } from "@mantine/core";
import { IconTrash, IconEdit, IconEye, IconSearch } from "@tabler/icons-react";
import { usePaginationStore } from "@/stores/pagination/PaginationStore";
import VTooltip from "@/components/common/atoms/Tooltip";
import { sort } from "fast-sort";
import { TradePartnerPerson } from "@/types/api/tradePartner";

export type TradePartnerPersonTableProps<T extends TradePartnerPerson> = {
    tradePartnerPerson: T[];
    initialTotalCount: number;
};

const PAGE_SIZES = [10, 15, 20, 50, 75, 100];

const TradePartnerPersonDrawerPresentation = <T extends TradePartnerPerson>({
    tradePartnerPerson,
    initialTotalCount,
}: TradePartnerPersonTableProps<T>) => {
    const router = useRouter();
    const [pageSize, setPageSize] = useState(PAGE_SIZES[2]);

    const [sortStatus, setSortStatus] = useState<
        DataTableSortStatus<TradePartnerPerson>
    >({
        columnAccessor: "tradePersonId",
        direction: "asc",
    });

    const [page, setPage] = useState(1);
    const [records, setRecords] = useState<TradePartnerPerson[]>(
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
            { asc: (t) => t.tradePersonId },
        ]) as TradePartnerPerson[];
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

    const navigateToContractDetail: DataTableRowClickHandler<
        TradePartnerPerson
    > = ({ record }) => {
        router.push(`/contract/`);
    };

    const handleDelete = (rowData: TradePartnerPerson) => {
        console.log("Delete", rowData);
    };

    const handleEdit = (rowData: TradePartnerPerson) => {
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
        newSortStatus: DataTableSortStatus<T>
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

    const columns: DataTableColumn<TradePartnerPerson>[] = [
        {
            accessor: "tradePersonId",
            title: "取引先担当者ID",
            sortable: true,
            render: (tradePartnerPerson: TradePartnerPerson) => (
                <VTooltip
                    content={tradePartnerPerson.tradePersonId}
                    tooltip={`取引先担当者ID: ${tradePartnerPerson.tradePersonId}`}
                    maxWidth={"100"}
                />
            ),
        },
        {
            accessor: "tradePersonName",
            title: "取引先担当者名",
            sortable: true,
            render: (tradePartnerPerson: TradePartnerPerson) => (
                <VTooltip
                    content={tradePartnerPerson.tradePersonName}
                    tooltip={`タイトル: ${tradePartnerPerson.tradePersonName}`}
                    maxWidth={"100"}
                />
            ),
        },
        {
            accessor: "tradePersonEmailAddress",
            title: "取引先担当者メールアドレス",
            sortable: true,
            render: (tradePartnerPerson: TradePartnerPerson) => (
                <VTooltip
                    content={tradePartnerPerson.tradePersonEmailAddress}
                    tooltip={`取引先担当者メールアドレス: ${tradePartnerPerson.tradePersonEmailAddress}`}
                    maxWidth={"100"}
                />
            ),
        },
        {
            accessor: "tradePartnerDepartmentId",
            title: "取引先担当部署ID",
            sortable: true,
            render: (tradePartnerPerson: TradePartnerPerson) => (
                <VTooltip
                    content={tradePartnerPerson.tradePartnerDepartmentId}
                    tooltip={`取引先担当部署ID: ${tradePartnerPerson.tradePartnerDepartmentId}`}
                    maxWidth={"100"}
                />
            ),
        },
        {
            accessor: "tradePartnerDepartmentName",
            title: "取引先担当部署名",
            sortable: true,
            render: (tradePartnerPerson: TradePartnerPerson) => (
                <VTooltip
                    content={tradePartnerPerson.tradePartnerDepartmentName}
                    tooltip={`取引先担当部署名: ${tradePartnerPerson.tradePartnerDepartmentName}`}
                    maxWidth={"100"}
                />
            ),
        },
        {
            accessor: "actions",
            title: "",
            textAlign: "right",
            render: (tradePartnerPerson: TradePartnerPerson) => (
                <Group gap={4} justify="right" wrap="nowrap">
                    <ActionIcon size="sm" variant="subtle" color="green">
                        <IconEye size={16} />
                    </ActionIcon>
                    <ActionIcon
                        size="sm"
                        variant="subtle"
                        color="blue"
                        onClick={() => handleEdit(tradePartnerPerson)}
                    >
                        <IconEdit size={16} />
                    </ActionIcon>
                    <ActionIcon
                        size="sm"
                        variant="subtle"
                        color="red"
                        onClick={() => handleDelete(tradePartnerPerson)}
                    >
                        <IconTrash size={16} />
                    </ActionIcon>
                </Group>
            ),
        },
    ];

    const { effectiveColumns } = useDataTableColumns<TradePartnerPerson>({
        key: "tradePersonId",
        columns,
    });

    return (
        <>
            <Card withBorder>
                <Group mb="md">
                    <Text size="lg">取引先一覧</Text>
                    <TextInput
                        className="ml-64"
                        placeholder="Search..."
                        leftSection={<IconSearch size="1rem" />}
                        style={{ width: "600px" }}
                    />
                </Group>

                <DataTable
                    striped
                    highlightOnHover
                    // highlightOnHoverColor="gray.100"
                    columns={effectiveColumns}
                    records={records}
                    noRecordsText={
                        records.length === 0
                            ? "該当のレコードが存在しません。"
                            : ""
                    }
                    emptyState={records.length !== 0}
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
                    idAccessor="tradePersonId"
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
            </Card>
        </>
    );
};

export default TradePartnerPersonDrawerPresentation;
