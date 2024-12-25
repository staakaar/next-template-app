import dayjs from "dayjs";
import { delay, useIsMounted } from "@/hooks/mantine";
import { OwnCompanyAuthority, OwnCompanyUser, users } from "@/types/onboarding";
import { Box } from "@mantine/core";
import { IconUser } from "@tabler/icons-react";
import { sort } from "fast-sort";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useEffect, useState } from "react";

type OwnCompanyAuthorityWithUserCount = OwnCompanyAuthority & {
    users: number;
};

type OwnCompanyUserAuthorityTableProps = {
    departmentId: string;
    sortStatus?: DataTableSortStatus<OwnCompanyAuthorityWithUserCount>;
};

const OwnCompanyUserAuthorityTable = ({
    departmentId,
    sortStatus,
}: OwnCompanyUserAuthorityTableProps) => {
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
                        (user: OwnCompanyUser) =>
                            user.ownCompanyDepartment.id === departmentId
                    );
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
    }, [departmentId, isMounted, records, sortStatus]);

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
                    render: ({ birthDate }: any) =>
                        dayjs(birthDate).format("DD MMM YYYY"),
                    textAlign: "right",
                    width: 200,
                },
            ]}
            records={records}
            fetching={loading && !records.length}
            selectedRecords={[]}
            onSelectedRecordsChange={() => {}}
        />
    );
};

export default OwnCompanyUserAuthorityTable;
