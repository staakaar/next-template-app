"use client";
import { delay, useIsMounted } from "@/hooks/mantine";
import { departments, OwnCompanyAuthority } from "@/types/onboarding";
import { Box } from "@mantine/core";
import { IconChevronRight, IconUsers } from "@tabler/icons-react";
import clsx from "clsx";
import { sort } from "fast-sort";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useEffect, useState } from "react";
import OwnCompanyUserAuthorityTable from "./OwnCompanyUserAuthorityTable";

type OwnCompanyDepartmentWithUserCount = OwnCompanyAuthority & {
    users: number;
};

type OwnCompanyDepartmentAuthorityTableProps = {
    companyId: string;
    sortStatus?: DataTableSortStatus<OwnCompanyDepartmentWithUserCount>;
};

const OwnCompanyDepartmentAuthorityTable = ({
    companyId,
    sortStatus,
}: OwnCompanyDepartmentAuthorityTableProps) => {
    const [expandedRecordIds, setExpandedRecordIds] = useState<string[]>([]);
    const isMounted = useIsMounted();
    const [records, setRecords] = useState<typeof departments>([]);
    const [loading, setLoading] = useState(true);
    console.log(departments);

    useEffect(() => {
        if (isMounted()) {
            (async () => {
                setLoading(true);
                await delay({ min: 500, max: 800 });
                if (isMounted()) {
                    let newRecords = departments.filter((department) => {
                        return department.ownCompany.id === companyId;
                    });
                    if (sortStatus) {
                        const newRecords = sort(records).by([
                            { asc: (r) => r.id },
                            { desc: (r) => r.id },
                        ]);
                        if (sortStatus.direction === "desc")
                            newRecords.reverse();
                    }
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
                                    "w-[13px] h-auto -translate-y-[1px] mr-[8px]",
                                    "transition-transform duration-200",
                                    {
                                        "rotate-90":
                                            expandedRecordIds.includes(id),
                                    }
                                )}
                            />
                            <IconUsers
                                className={clsx(
                                    "w-[13px] h-auto -translate-y-[1px] mr-[8px]"
                                )}
                            />
                            <span>{name}</span>
                        </Box>
                    ),
                },
                { accessor: "users", textAlign: "right", width: 200 },
            ]}
            records={records}
            fetching={loading && !records.length}
            rowExpansion={{
                allowMultiple: true,
                expanded: {
                    recordIds: expandedRecordIds,
                    onRecordIdsChange: setExpandedRecordIds,
                },
                content: ({ record }) => (
                    <OwnCompanyUserAuthorityTable
                        departmentId={record.id}
                        sortStatus={sortStatus}
                    />
                ),
            }}
            selectedRecords={[]}
            onSelectedRecordsChange={() => {}}
        />
    );
};

export default OwnCompanyDepartmentAuthorityTable;
