import { Box } from "@mantine/core";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useState } from "react";
import {
    IconBuilding,
    IconChevronRight,
    IconUser,
    IconUsers,
} from "@tabler/icons-react";
import clsx from "clsx";
import dayjs from "dayjs";
import classes from "./NestedTablesAsyncExample.module.css";

type CompanyDepartmentTableProps = {
    companyId: string;
};

const CompanyDepartmentTable = ({ companyId }: CompanyDepartmentTableProps) => {
    const { records, loading } = useDepartmentsAsync({ companyId });
    const [expandedRecordIds, setExpandedRecordIds] = useState<string[]>([]);

    return (
        <DataTable
            noHeader
            minHeight={100}
            withColumnBorders
            columns={[
                {
                    accessor: "name",
                    noWrap: true,
                    render: ({ id, name }) => (
                        <Box component="span" ml={20}>
                            <IconChevronRight
                                className={clsx(
                                    classes.icon,
                                    classes.expandIcon,
                                    {
                                        [classes.expandIconRotated]:
                                            expandedRecordIds.includes(id),
                                    }
                                )}
                            />
                            <IconUsers className={classes.icon} />
                            <span>{name}</span>
                        </Box>
                    ),
                },
                { accessor: "users", textAlign: "right", width: 200 },
            ]}
            records={records}
            fetching={loading}
            rowExpansion={{
                allowMultiple: true,
                expanded: {
                    recordIds: expandedRecordIds,
                    onRecordIdsChange: setExpandedRecordIds,
                },
                content: ({ record }) => (
                    <TradingUsersTable departmentId={record.id} />
                ),
            }}
        />
    );
};

export default CompanyDepartmentTable;
