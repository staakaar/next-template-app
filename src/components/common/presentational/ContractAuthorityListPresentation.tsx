"use client";
import { IconTrash } from "@tabler/icons-react";
import { sort } from "fast-sort";
import { ColumnDef, SortingState } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { useEffect, useState } from "react";
import type { ContractAuthority } from "@/hooks/contractAuthority";
import { usePaginationStore } from "@/stores/pagination/PaginationStore";
import VTooltip from "../atoms/Tooltip";
import { Button } from "@/components/ui/button";

type ContractAuthorityListPresentationProps<T extends ContractAuthority> = {
    contractAuthorities: T[];
    initialTotalCount: number;
};

const PAGE_SIZES = [50, 75, 100];

const ContractAuthorityListPresentation = <T extends ContractAuthority>({
    contractAuthorities,
    initialTotalCount,
}: ContractAuthorityListPresentationProps<T>) => {
    const [pageSize, setPageSize] = useState(PAGE_SIZES[2]);
    const [page, setPage] = useState(1);
    const [records, setRecords] = useState<ContractAuthority[]>(
        contractAuthorities.slice(0, pageSize)
    );
    const [totalCount, setTotalCount] = useState(initialTotalCount);
    const setPageOptions = usePaginationStore();

    // useEffect(() => {
    //     setPage(1);
    // }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecords(contractAuthorities.slice(from, to));
    }, [contractAuthorities, page, pageSize]);

    useEffect(() => {
        const sortedContracts = sort(contractAuthorities).by([
            { asc: (t: ContractAuthority) => t.roleId },
        ]) as ContractAuthority[];
    }, [contractAuthorities]);

    const columns: ColumnDef<ContractAuthority>[] = [
        {
            accessorKey: "roleCategory",
            header: "契約種別",
            enableSorting: true,
            cell: ({ row }) => (
                <VTooltip
                    content={row.original.roleId}
                    tooltip={`契約種別: ${row.original.roleId}`}
                    maxWidth={"100"}
                />
            ),
        },
        {
            accessorKey: "roleName",
            header: "ユーザー/部署",
            enableSorting: true,
            cell: ({ row }) => (
                <VTooltip
                    content={row.original.roleName}
                    tooltip={`変更者: ${row.original.roleName}`}
                    maxWidth={"100"}
                />
            ),
        },
        {
            accessorKey: "roleType",
            header: "権限タイプ",
            enableSorting: true,
            cell: ({ row }) => (
                <VTooltip
                    content={row.original.roleType}
                    tooltip={`変更者: ${row.original.roleType}`}
                    maxWidth={"100"}
                />
            ),
        },
        {
            id: "actions",
            header: "",
            cell: ({ row }) => (
                <div className="flex gap-0.5 justify-end flex-nowrap">
                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {}}
                        className="text-red-500 hover:text-red-700"
                    >
                        <IconTrash size={16} />
                    </Button>
                </div>
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
            noRecordsText="該当のレコードが存在しません。"
            highlightOnHover={true}
            striped={true}
        />
    );
};

export default ContractAuthorityListPresentation;
