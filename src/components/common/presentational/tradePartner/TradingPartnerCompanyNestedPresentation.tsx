"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import { ColumnDef, SortingState } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import CompanyDepartmentTable from "./CompanyDepartmentTable";
import { delay, useIsMounted } from "@/hooks/mantine";
// import { tradingCompanies } from "@/types/api/tradePartner";
import { type TradingCompany } from "@/types/api/tradePartner";
import { IconBuilding, IconChevronRight } from "@tabler/icons-react";
import { sort } from "fast-sort";

export type CompanyWithUserCount = TradingCompany & { users: number };

type TradingPartnerCompanyNestedProps<T extends CompanyWithUserCount> = {
    tradingCompanies: T[];
    initialCount: number;
};

const TradingPartnerCompanyNestedPresentation = <
    T extends CompanyWithUserCount,
>({
    tradingCompanies,
    initialCount,
}: TradingPartnerCompanyNestedProps<T>) => {
    const [expandedRecordIds, setExpandedRecordIds] = useState<string[]>([]);
    const [sortStatus, setSortStatus] = useState<SortingState>([
        { id: "name", desc: false }
    ]);

    const isMounted = useIsMounted();
    const [records, setRecords] =
        useState<typeof tradingCompanies>(tradingCompanies);
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

    const columns: ColumnDef<CompanyWithUserCount>[] = [
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

export default TradingPartnerCompanyNestedPresentation;
