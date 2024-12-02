"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import CompanyDepartmentTable from "./CompanyDepartmentTable";
import { delay, useIsMounted } from "@/hooks/mantine";
import { tradingCompanies } from "@/types/api/tradePartner";
import { type TradingCompany } from "@/types/api/tradePartner";
import { IconBuilding, IconChevronRight } from "@tabler/icons-react";
import classes from "./NestedTablesAsyncSortingExample.module.css";
import { sort } from "fast-sort";

export type CompanyWithUserCount = TradingCompany & { users: number };

type TradingPartnerCompanyNestedProps<T extends TradingCompany> = {
    tradingCompanies: T[];
    initialCount: number;
};

const PAGE_SIZES = [10, 15, 20, 50, 75, 100];

const TradingPartnerCompanyNestedPresentation = <T extends TradingCompany>({
    tradingCompanies,
    initialCount,
}: TradingPartnerCompanyNestedProps<T>) => {
    const [expandedRecordIds, setExpandedRecordIds] = useState<string[]>([]);
    const [sortStatus, setSortStatus] = useState<
        DataTableSortStatus<CompanyWithUserCount>
    >({
        columnAccessor: "name",
        direction: "asc",
    });

    const isMounted = useIsMounted();
    const [records, setRecords] =
        useState<typeof tradingCompanies>(tradingCompanies);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isMounted()) {
            (async () => {
                setLoading(true);
                await delay({ min: 500, max: 800 });
                if (isMounted()) {
                    const newRecords = sort(records).by([
                        { asc: (r) => r.id },
                        { desc: (r) => r.id },
                    ]);
                    if (sortStatus.direction === "desc") newRecords.reverse();
                    setRecords(newRecords);
                    setLoading(false);
                }
            })();
        }
    }, [isMounted, records, sortStatus]);

    return (
        <DataTable
            minHeight={160}
            withTableBorder
            withColumnBorders
            highlightOnHover
            sortStatus={sortStatus}
            onSortStatusChange={setSortStatus}
            columns={[
                {
                    accessor: "name",
                    title: "Company / Department / User",
                    noWrap: true,
                    render: ({ id, name }) => (
                        <>
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
                            <IconBuilding className={classes.icon} />
                            <span>{name}</span>
                        </>
                    ),
                },
                {
                    accessor: "details",
                    sortable: true,
                    title: "Users / Birth date",
                    render: ({ users }) => users,
                    textAlign: "right",
                    width: 200,
                },
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
                    <CompanyDepartmentTable
                        companyId={record.id}
                        sortStatus={sortStatus as DataTableSortStatus}
                    />
                ),
            }}
        />
    );
};

export default TradingPartnerCompanyNestedPresentation;
