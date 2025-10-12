import dayjs from "dayjs";
import { delay, useIsMounted } from "@/hooks/mantine";
import { OwnCompanyAuthority, OwnCompanyUser, users } from "@/types/onboarding";
import { IconUser } from "@tabler/icons-react";
import { sort } from "fast-sort";
import { ColumnDef, SortingState } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { useEffect, useState } from "react";

type OwnCompanyAuthorityWithUserCount = OwnCompanyAuthority & {
    users: number;
};

type OwnCompanyUserAuthorityTableProps = {
    departmentId: string;
    sortStatus?: SortingState;
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
                        if (sortStatus.length > 0 && sortStatus[0].desc)
                            newRecords.reverse();
                    }
                    setRecords(newRecords);
                    setLoading(false);
                }
            })();
        }
    }, [departmentId, isMounted, records, sortStatus]);

    const columns: ColumnDef<OwnCompanyUser>[] = [
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

export default OwnCompanyUserAuthorityTable;
