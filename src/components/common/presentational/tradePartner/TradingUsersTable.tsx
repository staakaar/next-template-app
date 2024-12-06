"use client";
import { sort } from "fast-sort";
import { Box } from "@mantine/core";
import { IconUser } from "@tabler/icons-react";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import dayjs from "dayjs";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { delay, useIsMounted } from "@/hooks/mantine";
import { userData } from "@/api/user/user";
import {
    type TradingCompany,
    type TradingCompanyUser,
} from "@/types/api/tradePartner";

type CompanyWithUserCount = TradingCompany & { users: number };

type TradingUsersTableProps = {
    departmentId: string;
    sortStatus?: DataTableSortStatus<CompanyWithUserCount>;
};

const TradingUsersTable = ({
    departmentId,
    sortStatus,
}: TradingUsersTableProps) => {
    const isMounted = useIsMounted();
    const [records, setRecords] = useState<typeof userData>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isMounted()) {
            (async () => {
                setLoading(true);
                await delay({ min: 500, max: 800 });
                if (isMounted()) {
                    let newRecords = userData.filter(
                        (user: any) =>
                            user.tradingDepartment.id === departmentId
                    );
                    if (sortStatus) {
                        newRecords = sort(newRecords).by(
                            (record: TradingCompanyUser) =>
                                sortStatus.columnAccessor === "name"
                                    ? `${record.firstName} ${record.lastName}`
                                    : record.birthDate
                        );
                        if (sortStatus.direction === "desc")
                            newRecords.reverse();
                    }
                    setRecords(newRecords);
                    setLoading(false);
                }
            })();
        }
    }, [departmentId, isMounted, sortStatus]);

    return (
        <DataTable
            noHeader
            minHeight={100}
            withColumnBorders
            columns={[
                {
                    accessor: "name",
                    noWrap: true,
                    render: ({
                        firstName,
                        lastName,
                    }: {
                        firstName: string;
                        lastName: string;
                    }) => (
                        <Box component="span" ml={40}>
                            <IconUser className="w-3 h-auto align-baseline mr-2" />
                            <span>
                                {firstName} {lastName}
                            </span>
                        </Box>
                    ),
                },
                {
                    accessor: "birthDate",
                    render: ({ birthDate }: { birthDate: string }) => {
                        return (
                            <Box>{dayjs(birthDate).format("DD MMM YYYY")}</Box>
                        );
                    },
                    textAlign: "right",
                    width: 200,
                },
            ]}
            records={records}
            fetching={loading}
        />
    );
};

export default TradingUsersTable;