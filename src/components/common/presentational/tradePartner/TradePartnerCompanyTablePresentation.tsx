"use client";
import TradePartnerPersonDrawerContainer from "../../container/tradePartner/TradePartnerPersonDrawerContainer";
import React, { useEffect, useState } from "react";
import { TradePartner } from "@/types/api/tradePartner";
import { useDisclosure } from "@mantine/hooks";
import {
    DataTable,
    DataTableColumn,
    DataTableRowClickHandler,
    DataTableSortStatus,
    useDataTableColumns,
} from "mantine-datatable";
import { useRouter } from "next/navigation";
import { defaultTradePartnerForm } from "@/stores/tradePartner/TradePartnerStore";
import { usePaginationStore } from "@/stores/pagination/PaginationStore";
import VTooltip from "../../atoms/Tooltip";
import { ActionIcon, Group } from "@mantine/core";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import { sort } from "fast-sort";

export type TradePartnerTableProps<T extends TradePartner> = {
    tradePartnerCompany: T[];
    initialTotalCount: number;
};

const PAGE_SIZES = [10, 15, 20, 50, 75, 100];

const TradePartnerCompanyTablePresentation = <T extends TradePartner>({
    tradePartnerCompany,
    initialTotalCount,
}: TradePartnerTableProps<T>) => {
    /** ドロワー */
    const [opened, { open, close }] = useDisclosure(false);

    const router = useRouter();
    const [selectedRow, setSelectedRow] = useState(defaultTradePartnerForm);

    const [pageSize, setPageSize] = useState(PAGE_SIZES[2]);

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    const [sortStatus, setSortStatus] = useState<
        DataTableSortStatus<TradePartner>
    >({
        columnAccessor: "tradePersonId",
        direction: "asc",
    });

    const [page, setPage] = useState(1);
    const [records, setRecords] = useState<TradePartner[]>(
        tradePartnerCompany.slice(0, pageSize)
    );

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        console.log(from);
        console.log(to);
        setRecords(tradePartnerCompany.slice(from, to));
    }, [tradePartnerCompany, page, pageSize]);

    useEffect(() => {
        const sortedContracts = sort(tradePartnerCompany).by([
            { asc: (t: TradePartner) => t.tradeCompanyId },
        ]) as TradePartner[];
        /**
        setRecords(
            sortStatus.direction === "desc"
                ? sortedContracts.reverse()
                : sortedContracts
        );
         */
    }, [tradePartnerCompany, sortStatus]);

    const [totalCount, setTotalCount] = useState(initialTotalCount);
    const setPageOptions = usePaginationStore();

    const navigateToTradePartnerPerson: DataTableRowClickHandler<
        TradePartner
    > = ({ record }) => {
        console.log(record);
        setSelectedRow(record);
        open;
    };

    const columns: DataTableColumn<TradePartner>[] = [
        {
            accessor: "tradeCompanyName",
            title: "取引先会社名",
            sortable: true,
            render: (tradePartner: TradePartner) => (
                <VTooltip
                    content={tradePartner.tradeCompanyName}
                    tooltip={`取引先会社名: ${tradePartner.tradeCompanyName}`}
                    maxWidth={"100"}
                />
            ),
        },
        {
            accessor: "tradePartnerDepartmentName",
            title: "取引先担当部署",
            sortable: true,
            render: (tradePartner: TradePartner) => (
                <VTooltip
                    content={tradePartner.tradePartnerDepartmentName}
                    tooltip={`取引先担当部署: ${tradePartner.tradePartnerDepartmentName}`}
                    maxWidth={"100"}
                />
            ),
        },
        {
            accessor: "tradePersonName",
            title: "取引先担当者",
            sortable: true,
            render: (tradePartner: TradePartner) => (
                <VTooltip
                    content={tradePartner.tradePersonName}
                    tooltip={`取引先担当者: ${tradePartner.tradePersonName}`}
                    maxWidth={"100"}
                />
            ),
        },
        {
            accessor: "tradeCompanyAddress",
            title: "取引先メールアドレス",
            sortable: true,
            render: (tradePartner: TradePartner) => (
                <VTooltip
                    content={tradePartner.tradeCompanyAddress}
                    tooltip={`取引先メールアドレス: ${tradePartner.tradeCompanyAddress}`}
                    maxWidth={"100"}
                />
            ),
        },
        {
            accessor: "actions",
            title: "",
            textAlign: "right",
            render: (tradePartner: TradePartner) => (
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

    const { effectiveColumns } = useDataTableColumns<TradePartner>({
        key: "tradePersonId",
        columns,
    });

    return (
        <>
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
                onRowClick={navigateToTradePartnerPerson}
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
