import { delay, useIsMounted } from "@/hooks/mantine";
import { OwnCompanyAuthority } from "@/types/onboarding";
import { IconBuilding, IconChevronRight } from "@tabler/icons-react";
import clsx from "clsx";
import { sort } from "fast-sort";
import { ColumnDef, SortingState } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
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
    const [sortStatus, setSortStatus] = useState<SortingState>([
        { id: "name", desc: false }
    ]);

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
                    if (sortStatus.length > 0 && sortStatus[0].desc) newRecords.reverse();
                    setRecords(newRecords);
                    setLoading(false);
                }
            })();
        }
    }, [isMounted, records, sortStatus]);

    const columns: ColumnDef<OwnCompanyAuthorityWithUser>[] = [
        {
            accessorKey: "name",
            header: "Company / Department / User",
            enableSorting: true,
            cell: ({ row }) => (
                <>
                    <IconChevronRight
                        className={clsx(
                            "w-[13px] h-auto -translate-y-[1px] mr-[8px]",
                            "transition-transform duration-200",
                            {
                                "rotate-90": expandedRecordIds.includes(row.original.id),
                            }
                        )}
                    />
                    <IconBuilding
                        className={clsx(
                            "w-[13px] h-auto -translate-y-[1px] mr-[8px]"
                        )}
                    />
                    <span>{row.original.name}</span>
                </>
            ),
        },
        {
            id: "details",
            header: "Users / Birth date",
            enableSorting: true,
            cell: ({ row }) => <div className="text-right">{row.original.users}</div>,
        },
    ];

    return (
        <DataTable
            columns={columns}
            data={records}
            sorting={sortStatus}
            onSortingChange={setSortStatus}
            noRecordsText="データがありません"
            highlightOnHover={true}
            striped={false}
        />
    );
};

export default ContractAuthorityHierarchyPresentation;
