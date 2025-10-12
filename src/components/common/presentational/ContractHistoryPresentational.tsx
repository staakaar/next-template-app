import { ContractHistoryForm } from "@/lib/contractHistory/schema";
import { usePaginationStore } from "@/stores/pagination/PaginationStore";
import { sort } from "fast-sort";
import { ColumnDef, SortingState } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { useEffect, useState } from "react";
import VTooltip from "../atoms/Tooltip";

type ContractHistoryPresentationalProps<T extends ContractHistoryForm> = {
    contractHistories: T[];
    initialTotalCount: number;
};

const PAGE_SIZES = [10, 20, 50, 75, 100];

const ContractHistoryPresentational = <T extends ContractHistoryForm>({
    contractHistories,
    initialTotalCount,
}: ContractHistoryPresentationalProps<T>) => {
    const [pageSize, setPageSize] = useState(PAGE_SIZES[2]);
    const [sortStatus, setSortStatus] = useState<SortingState>([
        { id: "contractHistoryId", desc: false }
    ]);

    const [page, setPage] = useState(1);
    const [records, setRecords] = useState<ContractHistoryForm[]>(
        contractHistories.slice(0, pageSize)
    );
    const [totalCount, setTotalCount] = useState(initialTotalCount);
    const setPageOptions = usePaginationStore();

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecords(contractHistories.slice(from, to));
    }, [contractHistories, page, pageSize]);

    useEffect(() => {
        const sortedContracts = sort(contractHistories).by([
            { asc: (t: ContractHistoryForm) => t.contractHistoryId },
        ]) as ContractHistoryForm[];
        /**
      setRecords(
          sortStatus.direction === "desc"
              ? sortedContracts.reverse()
              : sortedContracts
      );
       */
    }, [contractHistories, sortStatus]);

    const columns: ColumnDef<ContractHistoryForm>[] = [
        {
            accessorKey: "contractHistoryId",
            header: "履歴ID",
            enableSorting: true,
            cell: ({ row }) => (
                <VTooltip
                    content={row.original.contractHistoryId}
                    tooltip={`契約履歴ID: ${row.original.contractHistoryId}`}
                    maxWidth={"100"}
                />
            ),
        },
        {
            accessorKey: "beforeValue",
            header: "変更前",
            enableSorting: true,
            cell: ({ row }) => (
                <VTooltip
                    content={row.original.beforeValue}
                    tooltip={`変更前: ${row.original.beforeValue}`}
                    maxWidth={"100"}
                />
            ),
        },
        {
            accessorKey: "afterValue",
            header: "変更後",
            enableSorting: true,
            cell: ({ row }) => (
                <VTooltip
                    content={row.original.afterValue}
                    tooltip={`変更後: ${row.original.afterValue}`}
                    maxWidth={"100"}
                />
            ),
        },
        {
            accessorKey: "personInCharge",
            header: "変更者",
            enableSorting: true,
            cell: ({ row }) => (
                <VTooltip
                    content={row.original.personInCharge}
                    tooltip={`変更者: ${row.original.personInCharge}`}
                    maxWidth={"100"}
                />
            ),
        },
        {
            accessorKey: "updateAt",
            header: "更新日時",
            enableSorting: true,
            cell: ({ row }) => (
                <VTooltip
                    content={row.original.updateAt}
                    tooltip={`単位: ${row.original.updateAt}`}
                    maxWidth={"100"}
                />
            ),
        },
    ];

    return (
        <DataTable
            className="mt-8"
            columns={columns}
            data={records}
            pageSize={pageSize}
            onPageSizeChange={setPageSize}
            page={page}
            onPageChange={(p) => setPage(p)}
            totalRecords={totalCount}
            pageOptions={PAGE_SIZES}
            sorting={sortStatus}
            onSortingChange={setSortStatus}
            noRecordsText="該当のレコードが存在しません。"
            highlightOnHover={true}
            striped={true}
        />
    );
};

export default ContractHistoryPresentational;
