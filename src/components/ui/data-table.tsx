"use client";

import * as React from "react";
import type { ColumnDef, SortingState } from "@tanstack/react-table";
import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, ChevronUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

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
    onSortingChange?: React.Dispatch<React.SetStateAction<SortingState>>;
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

    // Generate page numbers to display
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxVisible = 5; // Maximum number of page buttons to show

        if (pageCount <= maxVisible + 2) {
            // Show all pages if total is small
            for (let i = 1; i <= pageCount; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);

            if (currentPage <= 3) {
                // Near the start
                for (let i = 2; i <= Math.min(maxVisible, pageCount - 1); i++) {
                    pages.push(i);
                }
                pages.push("...");
            } else if (currentPage >= pageCount - 2) {
                // Near the end
                pages.push("...");
                for (
                    let i = Math.max(2, pageCount - maxVisible + 1);
                    i < pageCount;
                    i++
                ) {
                    pages.push(i);
                }
            } else {
                // In the middle
                pages.push("...");
                for (
                    let i = currentPage - 1;
                    i <= Math.min(currentPage + 1, pageCount - 1);
                    i++
                ) {
                    pages.push(i);
                }
                pages.push("...");
            }

            // Always show last page
            pages.push(pageCount);
        }

        return pages;
    };

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
                                            {header.isPlaceholder ? null : canSort ? (
                                                <button
                                                    type="button"
                                                    className="flex items-center gap-2 cursor-pointer select-none"
                                                    onClick={header.column.getToggleSortingHandler()}
                                                >
                                                    {flexRender(
                                                        header.column.columnDef
                                                            .header,
                                                        header.getContext()
                                                    )}
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
                                                </button>
                                            ) : (
                                                <div>
                                                    {flexRender(
                                                        header.column.columnDef
                                                            .header,
                                                        header.getContext()
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
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        前へ
                    </Button>

                    {getPageNumbers().map((pageNum) =>
                        typeof pageNum === "string" ? (
                            <span
                                key={`ellipsis-${pageNum}`}
                                className="px-2 text-sm text-muted-foreground"
                            >
                                {pageNum}
                            </span>
                        ) : (
                            <Button
                                key={`page-${pageNum}`}
                                variant={
                                    currentPage === pageNum
                                        ? "default"
                                        : "outline"
                                }
                                size="sm"
                                onClick={() => handlePageChange(pageNum)}
                                className="min-w-[36px]"
                            >
                                {pageNum}
                            </Button>
                        )
                    )}

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage >= pageCount}
                    >
                        次へ
                    </Button>
                </div>
            </div>
        </div>
    );
}
