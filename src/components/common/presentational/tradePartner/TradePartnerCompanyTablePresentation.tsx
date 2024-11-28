"use client";
import TradePartnerPersonDrawerContainer from "../../container/tradePartner/TradePartnerPersonDrawerContainer";
import React, { useEffect, useState } from "react";
import { TradingPartnerCompany } from "@/types/api/tradePartner";
import { useDisclosure } from "@mantine/hooks";
import {
    DataTable,
    DataTableColumn,
    DataTableRowClickHandler,
    DataTableSortStatus,
    useDataTableColumns,
} from "mantine-datatable";
import { useRouter } from "next/navigation";
import { defaultTradingPartnerCompanyForm } from "@/stores/tradePartner/TradePartnerCompanyStore";
import { usePaginationStore } from "@/stores/pagination/PaginationStore";
import VTooltip from "../../atoms/Tooltip";
import { ActionIcon, Group } from "@mantine/core";
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
    const [opened, { open, close }] = useDisclosure(false);

    const [selectedRow, setSelectedRow] = useState(
        defaultTradingPartnerCompanyForm
    );

    const [pageSize, setPageSize] = useState(PAGE_SIZES[2]);

    const [sortStatus, setSortStatus] = useState<
        DataTableSortStatus<TradingPartnerCompany>
    >({
        columnAccessor: "tradingCompanyId",
        direction: "asc",
    });

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

    const navigateToTradePartnerPerson: DataTableRowClickHandler<
        TradingPartnerCompany
    > = ({ record }) => {
        console.log(record);
        setSelectedRow(record);
        open;
    };

    const columns: DataTableColumn<TradingPartnerCompany>[] = [
        {
            accessor: "tradeCompanyName",
            title: "取引先会社名",
            sortable: true,
            render: (tradingPartnerCompany: TradingPartnerCompany) => (
                <VTooltip
                    content={tradingPartnerCompany.tradingCompanyName}
                    tooltip={`取引先会社名: ${tradingPartnerCompany.tradingCompanyName}`}
                    maxWidth={"100"}
                />
            ),
        },
        {
            accessor: "tradeCompanyAddress",
            title: "取引先企業住所",
            sortable: true,
            render: (tradingPartnerCompany: TradingPartnerCompany) => (
                <VTooltip
                    content={tradingPartnerCompany.tradingCompanyAddress}
                    tooltip={`取引先企業住所: ${tradingPartnerCompany.tradingCompanyAddress}`}
                    maxWidth={"100"}
                />
            ),
        },
        {
            accessor: "tradingCompanyEmailAddress",
            title: "取引先企業メールアドレス",
            sortable: true,
            render: (tradingPartnerCompany: TradingPartnerCompany) => (
                <VTooltip
                    content={tradingPartnerCompany.tradingCompanyEmailAddress}
                    tooltip={`メールアドレス: ${tradingPartnerCompany.tradingCompanyEmailAddress}`}
                    maxWidth={"100"}
                />
            ),
        },
        {
            accessor: "actions",
            title: "",
            textAlign: "right",
            render: (tradingPartnerCompany: TradingPartnerCompany) => (
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

    const { effectiveColumns } = useDataTableColumns<TradingPartnerCompany>({
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
                idAccessor="tradingCompanyId"
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

            <TradePartnerPersonDrawerContainer
                opened={opened}
                onClose={close}
                selectedRow={selectedRow}
            />
        </>
    );
};

export default TradePartnerCompanyTablePresentation;
