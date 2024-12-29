import { delay, useIsMounted } from "@/hooks/mantine";
import { OwnCompanyAuthority } from "@/types/onboarding";
import { IconBuilding, IconChevronRight } from "@tabler/icons-react";
import clsx from "clsx";
import { sort } from "fast-sort";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useEffect, useState } from "react";
import OwnCompanyDepartmentAuthorityTable from "./OwnCompanyDepartmentAuthorityTable";

export type OwnCompanyAuthorityWithUser = OwnCompanyAuthority & {
    users: number;
};

type ContractAuthorityHierarchyPresentationProps<
    T extends OwnCompanyAuthorityWithUser,
> = {
    contractAuthorities: T[];
    initialTotalCount: number;
};

const ContractAuthorityHierarchyPresentation = <
    T extends OwnCompanyAuthorityWithUser,
>({
    contractAuthorities,
    initialTotalCount,
}: ContractAuthorityHierarchyPresentationProps<T>) => {
    // const companyIds = contractAuthorities.map((c) => c.id);
    const [expandedRecordIds, setExpandedRecordIds] = useState<string[]>([]);
    const [sortStatus, setSortStatus] = useState<
        DataTableSortStatus<OwnCompanyAuthorityWithUser>
    >({
        columnAccessor: "name",
        direction: "asc",
    });

    const isMounted = useIsMounted();
    const [records, setRecords] =
        useState<typeof contractAuthorities>(contractAuthorities);
    const [loading, setLoading] = useState(false);

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
                                    "w-[13px] h-auto -translate-y-[1px] mr-[8px]",
                                    "transition-transform duration-200",
                                    {
                                        "rotate-90":
                                            expandedRecordIds.includes(id),
                                    }
                                )}
                            />
                            <IconBuilding
                                className={clsx(
                                    "w-[13px] h-auto -translate-y-[1px] mr-[8px]"
                                )}
                            />
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
            fetching={loading && !records.length}
            rowExpansion={{
                allowMultiple: true,
                expanded: {
                    recordIds: expandedRecordIds,
                    onRecordIdsChange: setExpandedRecordIds,
                },
                content: ({ record }) => (
                    <OwnCompanyDepartmentAuthorityTable
                        companyId={record.id}
                        sortStatus={sortStatus as DataTableSortStatus}
                    />
                ),
            }}
            selectedRecords={[]}
            onSelectedRecordsChange={() => {}}
        />
    );
};

export default ContractAuthorityHierarchyPresentation;
