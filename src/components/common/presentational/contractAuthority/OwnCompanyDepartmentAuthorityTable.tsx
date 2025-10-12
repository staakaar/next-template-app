"use client";
import { delay, useIsMounted } from "@/hooks/mantine";
import { departments, OwnCompanyAuthority } from "@/types/onboarding";
import { IconChevronRight, IconUsers } from "@tabler/icons-react";
import clsx from "clsx";
import { sort } from "fast-sort";
import { ColumnDef, SortingState } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { useEffect, useState } from "react";
import OwnCompanyUserAuthorityTable from "./OwnCompanyUserAuthorityTable";

type OwnCompanyDepartmentWithUserCount = OwnCompanyAuthority & {
    users: number;
};

type OwnCompanyDepartmentAuthorityTableProps = {
    companyId: string;
    sortStatus?: SortingState;
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
                        // const newRecords = sort(records).by([
                        //     { asc: (r) => r.id },
                        //     { desc: (r) => r.id },
                        // ]);
                        // if (sortStatus.direction === "desc")
                        //     newRecords.reverse();
                    }
                    setRecords(newRecords);
                    setLoading(false);
                }
            })();
        }
    }, [companyId, isMounted, sortStatus]);

    const columns: ColumnDef<typeof departments[0]>[] = [
        {
            accessorKey: "name",
            header: "",
            cell: ({ row }) => (
                <span className="ml-5">
                    <IconChevronRight
                        className={clsx(
                            "w-[13px] h-auto -translate-y-[1px] mr-[8px]",
                            "transition-transform duration-200",
                            {
                                "rotate-90": expandedRecordIds.includes(row.original.id),
                            }
                        )}
                    />
                    <IconUsers
                        className={clsx(
                            "w-[13px] h-auto -translate-y-[1px] mr-[8px]"
                        )}
                    />
                    <span>{row.original.name}</span>
                </span>
            ),
        },
        {
            accessorKey: "users",
            header: "",
            cell: ({ row }) => <div className="text-right">{row.original.users}</div>,
        },
    ];

    return (
        <DataTable
            columns={columns}
            data={records}
            noRecordsText="データがありません"
            highlightOnHover={false}
            striped={false}
        />
    );
};

export default OwnCompanyDepartmentAuthorityTable;
