"use client";
import { usePaginationStore } from "@/stores/pagination/PaginationStore";
import { TradePartner } from "@/types/api/tradePartner";
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

export type TradePartnerTableProps<T extends TradePartner> = {
    tradePartner: T[];
    initialTotalCount: number;
};

const PAGE_SIZES = [10, 15, 20, 50, 75, 100];

const TradePartnerTablePresentation = <T extends TradePartner>({
    tradePartner,
    initialTotalCount,
}: TradePartnerTableProps<T>) => {
    const router = useRouter();

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
        tradePartner.slice(0, pageSize)
    );

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        console.log(from);
        console.log(to);
        setRecords(tradePartner.slice(from, to));
    }, [tradePartner, page, pageSize]);

    useEffect(() => {
        const sortedContracts = sort(tradePartner).by([
            { asc: (t: TradePartner) => t.tradeCompanyId },
        ]) as TradePartner[];
        /**
        setRecords(
            sortStatus.direction === "desc"
                ? sortedContracts.reverse()
                : sortedContracts
        );
         */
    }, [tradePartner, sortStatus]);

    const [totalCount, setTotalCount] = useState(initialTotalCount);
    const setPageOptions = usePaginationStore();

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
    ];

    const { effectiveColumns } = useDataTableColumns<TradePartner>({
        key: "tradePersonId",
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
            // paginationText={({ from, to, totalRecords }) =>
            //     `${from}～${to} / ${totalRecords}件`
            // }
        />
        // </Card>
    );
};

export default TradePartnerTablePresentation;
