"use client";

import * as React from "react";
import {
    ColumnDef,
    SortingState,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, ChevronUp } from "lucide-react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    onRowClick?: (row: TData) => void;
    pageSize?: number;
    onPageSizeChange?: (size: number) => void;
    page?: number;
    onPageChange?: (page: number) => void;
    totalRecords?: number;
    pageOptions?: number[];
    sorting?: SortingState;
    onSortingChange?: (sorting: SortingState) => void;
    noRecordsText?: string;
    highlightOnHover?: boolean;
    striped?: boolean;
    className?: string;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    onRowClick,
    pageSize = 20,
    onPageSizeChange,
    page = 1,
    onPageChange,
    totalRecords,
    pageOptions = [10, 20, 30, 40, 50],
    sorting: externalSorting,
    onSortingChange: externalOnSortingChange,
    noRecordsText = "データがありません",
    highlightOnHover = true,
    striped = true,
    className = "",
}: DataTableProps<TData, TValue>) {
    const [internalSorting, setInternalSorting] = React.useState<SortingState>(
        []
    );

    const sorting = externalSorting ?? internalSorting;
    const onSortingChange = externalOnSortingChange ?? setInternalSorting;

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange,
        state: {
            sorting,
            pagination: {
                pageIndex: page - 1,
                pageSize,
            },
        },
        manualPagination: !!totalRecords,
        pageCount: totalRecords
            ? Math.ceil(totalRecords / pageSize)
            : undefined,
    });

    const handlePageSizeChange = (value: string) => {
        const newSize = Number(value);
        onPageSizeChange?.(newSize);
        table.setPageSize(newSize);
    };

    const handlePageChange = (newPage: number) => {
        onPageChange?.(newPage);
        table.setPageIndex(newPage - 1);
    };

    const currentPage = page;
    const pageCount = totalRecords
        ? Math.ceil(totalRecords / pageSize)
        : table.getPageCount();

    return (
        <div className={`space-y-4 ${className}`}>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    const canSort = header.column.getCanSort();
                                    const isSorted = header.column.getIsSorted();

                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder ? null : (
                                                <div
                                                    className={
                                                        canSort
                                                            ? "flex items-center gap-2 cursor-pointer select-none"
                                                            : ""
                                                    }
                                                    onClick={
                                                        canSort
                                                            ? header.column.getToggleSortingHandler()
                                                            : undefined
                                                    }
                                                >
                                                    {flexRender(
                                                        header.column.columnDef
                                                            .header,
                                                        header.getContext()
                                                    )}
                                                    {canSort && (
                                                        <span className="ml-auto">
                                                            {isSorted ===
                                                            "asc" ? (
                                                                <ChevronUp className="h-4 w-4" />
                                                            ) : isSorted ===
                                                              "desc" ? (
                                                                <ChevronDown className="h-4 w-4" />
                                                            ) : (
                                                                <ChevronDown className="h-4 w-4 opacity-30" />
                                                            )}
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row, index) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                    onClick={() =>
                                        onRowClick?.(row.original as TData)
                                    }
                                    className={`
                                        ${onRowClick ? "cursor-pointer" : ""}
                                        ${
                                            highlightOnHover
                                                ? "hover:bg-muted/50"
                                                : ""
                                        }
                                        ${
                                            striped && index % 2 === 0
                                                ? "bg-muted/20"
                                                : ""
                                        }
                                    `}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    {noRecordsText}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                        表示件数:
                    </span>
                    <Select
                        value={pageSize.toString()}
                        onValueChange={handlePageSizeChange}
                    >
                        <SelectTrigger className="w-[70px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {pageOptions.map((size) => (
                                <SelectItem key={size} value={size.toString()}>
                                    {size}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                        {totalRecords
                            ? `${(currentPage - 1) * pageSize + 1}-${Math.min(
                                  currentPage * pageSize,
                                  totalRecords
                              )} / ${totalRecords}件`
                            : `ページ ${currentPage} / ${pageCount}`}
                    </span>
                </div>

                <div className="flex items-center gap-1">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(1)}
                        disabled={currentPage === 1}
                    >
                        最初
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        前へ
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage >= pageCount}
                    >
                        次へ
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(pageCount)}
                        disabled={currentPage >= pageCount}
                    >
                        最後
                    </Button>
                </div>
            </div>
        </div>
    );
}
