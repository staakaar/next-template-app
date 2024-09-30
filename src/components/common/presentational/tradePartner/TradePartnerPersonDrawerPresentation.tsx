"use client";

import {
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
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
import { Box, Button } from "@chakra-ui/react";
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";

export type TradePartnerPersonTableProps<TData, TValue> = {
    data: TData[];
    columns: ColumnDef<TData, TValue>[];
    // onPageChange?: (newPage: number) => void;
    // onPageSizeChange?: (newPageSize: number) => void;
    // onSearch?: (keyword: string) => void;
    totalCount: number;
};

/** 取引先一覧ソート */
type ColumnSort = {
    id: string;
    desc: boolean;
};
type SortingState = ColumnSort[];

const TradePartnerPersonDrawerPresentation = <TData, TValue>({
    data,
    columns,
    totalCount,
}: TradePartnerPersonTableProps<TData, TValue>) => {
    const router = useRouter();
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
        {}
    );
    const [pagination, setPagination] = useState({
        pageIndex: 1,
        pageSize: 50,
    });

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onPaginationChange: setPagination,
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            pagination,
        },
        initialState: {
            pagination: {
                pageIndex: 1,
                pageSize: 50,
            },
        },
        autoResetPageIndex: true,
        manualPagination: true,
        pageCount: Math.ceil(totalCount / pagination.pageSize),
    });

    return (
        <>
            <CardHeader>
                <CardTitle>取引先一覧</CardTitle>
                {/* <Box className="relative ml-auto flex-1 md:grow-0">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search..."
                        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                    />
                </Box> */}
            </CardHeader>
            <CardContent>
                <div className="rounded-md border">
                    <div className="h-[600px]">
                        <Table>
                            <TableHeader className="sticky top-0 z-10">
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => {
                                            return (
                                                <TableHead key={header.id}>
                                                    {header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                              header.column
                                                                  .columnDef
                                                                  .header,
                                                              header.getContext()
                                                          )}
                                                </TableHead>
                                            );
                                        })}
                                    </TableRow>
                                ))}
                            </TableHeader>
                        </Table>
                        <div
                            className="overflow-auto"
                            style={{ height: "calc(100% - 40px)" }}
                        >
                            <Table>
                                <TableBody>
                                    {table.getRowModel().rows?.length ? (
                                        table
                                            .getRowModel()
                                            .rows.slice(0, pagination.pageSize)
                                            .map((row) => (
                                                <TableRow
                                                    key={row.id}
                                                    data-state={
                                                        row.getIsSelected() &&
                                                        "selected"
                                                    }
                                                >
                                                    {row
                                                        .getVisibleCells()
                                                        .map((cell) => (
                                                            <TableCell
                                                                key={cell.id}
                                                            >
                                                                {flexRender(
                                                                    cell.column
                                                                        .columnDef
                                                                        .cell,
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
                                                該当するデータが存在しません。
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex items-center justify-end">
                <Box className="flex items-center justify-end px-2">
                    {/* ページネーションコンポーネント */}
                    <Box className="flex items-center justify-between px-2">
                        <Box className="flex items-center space-x-6 lg:space-x-8">
                            <Box className="flex items-center space-x-2">
                                <Select
                                    value={`${table.getState().pagination.pageSize}`}
                                    onValueChange={(value) => {
                                        table.setPageSize(Number(value));
                                    }}
                                >
                                    <SelectTrigger className="h-8 w-[70px]">
                                        <SelectValue
                                            placeholder={
                                                table.getState().pagination
                                                    .pageSize
                                            }
                                        />
                                    </SelectTrigger>
                                    <SelectContent side="top">
                                        {[50, 75, 100].map((pageSize) => (
                                            <SelectItem
                                                key={pageSize}
                                                value={`${pageSize}`}
                                            >
                                                {pageSize}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <p className="text-sm font-medium">件</p>
                            </Box>
                            <Box className="flex w-[100px] items-center justify-center text-sm font-medium">
                                {table.getState().pagination.pageIndex + 1}
                                {" / "}
                                {table.getPageCount()}
                            </Box>
                            <Box className="flex items-center space-x-2">
                                <Button
                                    size={"2"}
                                    variant="outline"
                                    className="hidden h-8 w-8 p-0 lg:flex"
                                    onClick={() => table.setPageIndex(0)}
                                    disabled={!table.getCanPreviousPage()}
                                >
                                    <span className="sr-only">
                                        Go to first page
                                    </span>
                                    <DoubleArrowLeftIcon className="h-4 w-4" />
                                </Button>
                                <Button
                                    size={"2"}
                                    variant="outline"
                                    className="h-8 w-8 p-0"
                                    onClick={() => table.previousPage()}
                                    disabled={!table.getCanPreviousPage()}
                                >
                                    <span className="sr-only">
                                        Go to previous page
                                    </span>
                                    <ChevronLeftIcon className="h-4 w-4" />
                                </Button>
                                <Button
                                    size={"2"}
                                    variant="outline"
                                    className="h-8 w-8 p-0"
                                    onClick={() => table.nextPage()}
                                    disabled={!table.getCanNextPage()}
                                >
                                    <span className="sr-only">
                                        Go to next page
                                    </span>
                                    <ChevronRightIcon className="h-4 w-4" />
                                </Button>
                                <Button
                                    size={"2"}
                                    variant="outline"
                                    className="hidden h-8 w-8 p-0 lg:flex"
                                    onClick={() =>
                                        table.setPageIndex(
                                            table.getPageCount() - 1
                                        )
                                    }
                                    disabled={!table.getCanNextPage()}
                                >
                                    <span className="sr-only">
                                        Go to last page
                                    </span>
                                    <DoubleArrowRightIcon className="h-4 w-4" />
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </CardFooter>
        </>
    );
};

export default TradePartnerPersonDrawerPresentation;
