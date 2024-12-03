"use client";
import { sort } from "fast-sort";
import { Box } from "@mantine/core";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useEffect, useState } from "react";
import { IconChevronRight, IconUsers } from "@tabler/icons-react";
import clsx from "clsx";
import classes from "./NestedTablesAsyncExample.module.css";
import TradingUsersTable from "./TradingUsersTable";
import { delay, useIsMounted } from "@/hooks/mantine";
import { departments } from "@/types/api/tradePartner";
import { type TradingCompany } from "@/types/api/tradePartner";

type CompanyWithUserCount = TradingCompany & { users: number };

type CompanyDepartmentTableProps = {
    companyId: string;
    sortStatus?: DataTableSortStatus<CompanyWithUserCount>;
};

const CompanyDepartmentTable = ({
    companyId,
    sortStatus,
}: CompanyDepartmentTableProps) => {
    const [expandedRecordIds, setExpandedRecordIds] = useState<string[]>([]);
    const isMounted = useIsMounted();
    const [records, setRecords] = useState<typeof departments>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isMounted()) {
            (async () => {
                setLoading(true);
                await delay({ min: 500, max: 800 });
                if (isMounted()) {
                    let newRecords = departments.filter(
                        (department) =>
                            department.tradingCompany.id === companyId
                    );
                    if (sortStatus) {
                        const newRecords = sort(records).by([
                            { asc: (r) => r.id },
                            { desc: (r) => r.id },
                        ]);
                        if (sortStatus.direction === "desc")
                            newRecords.reverse();
                        //     newRecords = sort(records).by(() =>
                        //         sortStatus.columnAccessor === "details"
                        //             ? "users"
                        //             : sortStatus.columnAccessor
                        //     );
                        //     if (sortStatus.direction === "desc")
                        //         newRecords.reverse();
                    }
                    // if (sortStatus) {
                    //     newRecords = sortBy(
                    //         newRecords,
                    //         sortStatus.columnAccessor === "details"
                    //             ? "employees"
                    //             : sortStatus.columnAccessor
                    //     );
                    //     if (sortStatus.direction === "desc")
                    //         newRecords.reverse();
                    // }
                    setRecords(newRecords);
                    setLoading(false);
                }
            })();
        }
    }, [companyId, isMounted, records, sortStatus]);

    return (
        <DataTable
            noHeader
            minHeight={100}
            withColumnBorders
            columns={[
                {
                    accessor: "name",
                    noWrap: true,
                    render: ({ id, name }) => (
                        <Box component="span" ml={20}>
                            <IconChevronRight
                                className={clsx(
                                    classes.icon,
                                    classes.expandIcon,
                                    {
                                        [classes.expandIconRotated]:
                                            expandedRecordIds.includes(id),
                                    }
                                )}
                            />
                            <IconUsers className={classes.icon} />
                            <span>{name}</span>
                        </Box>
                    ),
                },
                { accessor: "users", textAlign: "right", width: 200 },
            ]}
            records={records}
            fetching={loading}
            rowExpansion={{
                allowMultiple: true,
                expanded: {
                    recordIds: expandedRecordIds,
                    onRecordIdsChange: setExpandedRecordIds,
                },
                content: ({ record }) => (
                    <TradingUsersTable
                        departmentId={record.id}
                        sortStatus={sortStatus}
                    />
                ),
            }}
        />
    );
};

export default CompanyDepartmentTable;
