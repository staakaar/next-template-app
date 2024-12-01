"use client";
import { sort } from "fast-sort";
import { Box } from "@mantine/core";
import { IconUser } from "@tabler/icons-react";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import dayjs from "dayjs";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { User } from "../../container/tradePartner/TradingPartnerCompanyNestedContainer";

type TradingUsersTableProps = {
    departmentId: number;
    sortStatus?: DataTableSortStatus<User>;
};

const TradingUsersTable = ({
    departmentId,
    sortStatus,
}: TradingUsersTableProps) => {
    const isMounted = useIsMounted();
    const [records, setRecords] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isMounted()) {
            (async () => {
                setLoading(true);
                await delay({ min: 500, max: 800 });
                if (isMounted()) {
                    let newRecords = users.filter(
                        (user: User) => user.department.id === departmentId
                    );
                    if (sortStatus) {
                        newRecords =
                            sort(newRecords)[
                                sortStatus.columnAccessor === "name"
                                    ? {
                                          by: (record: any) =>
                                              `${record.firstName} ${record.lastName}`,
                                      }
                                    : { by: "birthDate" }
                            ];
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
                    render: ({ birthDate }: { birthDate: string }) =>
                        dayjs(birthDate).format("DD MMM YYYY"),
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
