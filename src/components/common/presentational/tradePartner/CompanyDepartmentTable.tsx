"use client";
import { sort } from "fast-sort";
import { ColumnDef, SortingState } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { useEffect, useState } from "react";
import { IconChevronRight, IconUsers } from "@tabler/icons-react";
import clsx from "clsx";
import TradingUsersTable from "./TradingUsersTable";
import { delay, useIsMounted } from "@/hooks/mantine";
import { departments } from "@/types/api/tradePartner";
import { type TradingCompany } from "@/types/api/tradePartner";

type CompanyWithUserCount = TradingCompany & { users: number };

type CompanyDepartmentTableProps = {
    companyId: string;
    sortStatus?: SortingState;
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
                        if (sortStatus.length > 0 && sortStatus[0].desc)
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

export default CompanyDepartmentTable;
