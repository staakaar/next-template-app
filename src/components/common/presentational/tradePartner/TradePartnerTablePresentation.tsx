"use client";
import { usePaginationStore } from "@/stores/pagination/PaginationStore";
import { TradingPartnerPerson } from "@/types/api/tradePartner";
import { sort } from "fast-sort";
import {
    DataTable,
    DataTableColumn,
    DataTableRowClickHandler,
    DataTableSortStatus,
    useDataTableColumns,
} from "mantine-datatable";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import VTooltip from "../../atoms/Tooltip";
import { ActionIcon, Card, Group, Text } from "@mantine/core";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";

export type TradePartnerTableProps<T extends TradingPartnerPerson> = {
    tradingPartnerPersons: T[];
    initialTotalCount: number;
};

const PAGE_SIZES = [10, 15, 20, 50, 75, 100];

const TradePartnerTablePresentation = <T extends TradingPartnerPerson>({
    tradingPartnerPersons,
    initialTotalCount,
}: TradePartnerTableProps<T>) => {
    const [pageSize, setPageSize] = useState(PAGE_SIZES[2]);
    const [page, setPage] = useState(1);
    const [records, setRecords] = useState<TradingPartnerPerson[]>(
        tradingPartnerPersons.slice(0, pageSize)
    );
    const [totalCount, setTotalCount] = useState(initialTotalCount);
    const { setTradePartnerPageOptions } = usePaginationStore();

    const [sortStatus, setSortStatus] = useState<
        DataTableSortStatus<TradingPartnerPerson>
    >({
        columnAccessor: "tradingPersonId",
        direction: "asc",
    });

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        console.log(from);
        console.log(to);
        setRecords(tradingPartnerPersons.slice(from, to));
    }, [tradingPartnerPersons, page, pageSize]);

    useEffect(() => {
        const sortedContracts = sort(tradingPartnerPersons).by([
            { asc: (t: TradingPartnerPerson) => t.tradingPersonId },
        ]) as TradingPartnerPerson[];
        /**
        setRecords(
            sortStatus.direction === "desc"
                ? sortedContracts.reverse()
                : sortedContracts
        );
         */
    }, [tradingPartnerPersons, sortStatus]);

    const columns: DataTableColumn<TradingPartnerPerson>[] = [
        {
            accessor: "tradingPersonId",
            title: "取引先担当者ID",
            sortable: true,
            render: (tradingPartnerPerson: TradingPartnerPerson) => (
                <VTooltip
                    content={tradingPartnerPerson.tradingPersonId}
                    tooltip={`取引先担当者ID: ${tradingPartnerPerson.tradingPersonId}`}
                    maxWidth={"100"}
                />
            ),
        },
        {
            accessor: "tradingPersonName",
            title: "取引先担当名",
            sortable: true,
            render: (tradingPartnerPerson: TradingPartnerPerson) => (
                <VTooltip
                    content={tradingPartnerPerson.tradingPersonName}
                    tooltip={`取引先担当名: ${tradingPartnerPerson.tradingPersonName}`}
                    maxWidth={"100"}
                />
            ),
        },
        {
            accessor: "tradingPersonEmailAddress",
            title: "取引先担当者メールアドレス",
            sortable: true,
            render: (tradingPartnerPerson: TradingPartnerPerson) => (
                <VTooltip
                    content={tradingPartnerPerson.tradingPersonEmailAddress}
                    tooltip={`メールアドレス: ${tradingPartnerPerson.tradingPersonEmailAddress}`}
                    maxWidth={"100"}
                />
            ),
        },
        {
            accessor: "tradingPartnerDepartmentId",
            title: "取引先担当者部署ID",
            sortable: true,
            render: (tradingPartnerPerson: TradingPartnerPerson) => (
                <VTooltip
                    content={tradingPartnerPerson.tradingPartnerDepartmentId}
                    tooltip={`取引先担当者部署ID: ${tradingPartnerPerson.tradingPartnerDepartmentId}`}
                    maxWidth={"100"}
                />
            ),
        },
        {
            accessor: "tradingPartnerDepartmentName",
            title: "取引先担当者部署名",
            sortable: true,
            render: (tradingPartnerPerson: TradingPartnerPerson) => (
                <VTooltip
                    content={tradingPartnerPerson.tradingPartnerDepartmentName}
                    tooltip={`取引先担当者部署名: ${tradingPartnerPerson.tradingPartnerDepartmentName}`}
                    maxWidth={"100"}
                />
            ),
        },
    ];

    const { effectiveColumns } = useDataTableColumns<TradingPartnerPerson>({
        key: "tradingPersonId",
        columns,
    });

    return (
        // <Card withBorder mt={4}>
        //     <Group justify="flex-start" mb="md">
        //         <Text size="lg">取引先一覧</Text>
        //     </Group>

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
            idAccessor="tradingPersonId"
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
            // paginationText={({ from, to, totalRecords }) =>
            //     `${from}～${to} / ${totalRecords}件`
            // }
        />
        // </Card>
    );
};

export default TradePartnerTablePresentation;
