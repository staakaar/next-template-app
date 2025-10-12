"use client";
import dayjs from "dayjs";
import { sort } from "fast-sort";
import { IconUser } from "@tabler/icons-react";
import { ColumnDef, SortingState } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { useEffect, useState } from "react";
import { delay, useIsMounted } from "@/hooks/mantine";
import {
    users,
    type TradingCompany,
    type TradingCompanyUser,
} from "@/types/api/tradePartner";

type CompanyWithUserCount = TradingCompany & { users: number };

type TradingUsersTableProps = {
    departmentId: string;
    sortStatus?: SortingState;
};

const TradingUsersTable = ({
    departmentId,
    sortStatus,
}: TradingUsersTableProps) => {
    const isMounted = useIsMounted();
    const [records, setRecords] = useState<typeof users>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isMounted()) {
            (async () => {
                setLoading(true);
                await delay({ min: 500, max: 800 });
                if (isMounted()) {
                    let newRecords = users.filter(
                        (user: any) =>
                            user.tradingDepartment.id === departmentId
                    );
                    if (sortStatus) {
                        const newRecords = sort(records).by([
                            { asc: (r) => r.id },
                            { desc: (r) => r.id },
                        ]);
                        if (sortStatus.length > 0 && sortStatus[0].desc)
                            newRecords.reverse();
                        // newRecords = sort(newRecords).by(
                        //     (record: TradingCompanyUser) =>
                        //         sortStatus.columnAccessor === "name"
                        //             ? `${record.firstName} ${record.lastName}`
                        //             : record.birthDate
                        // );
                        // if (sortStatus.direction === "desc")
                        //     newRecords.reverse();
                    }
                    setRecords(newRecords);
                    setLoading(false);
                }
            })();
        }
    }, [departmentId, isMounted, records, sortStatus]);

    const columns: ColumnDef<TradingCompanyUser>[] = [
        {
            id: "name",
            header: "",
            cell: ({ row }) => (
                <span className="ml-10">
                    <IconUser className="w-3 h-auto align-baseline mr-2" />
                    <span>
                        {row.original.firstName} {row.original.lastName}
                    </span>
                </span>
            ),
        },
        {
            accessorKey: "birthDate",
            header: "",
            cell: ({ row }) => (
                <div className="text-right">
                    {dayjs(row.original.birthDate).format("DD MMM YYYY")}
                </div>
            ),
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

export default TradingUsersTable;
