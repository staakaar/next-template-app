"use client";
import Image from "next/image";
import { Button } from "@chakra-ui/react";
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    PaginationState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table";
import {
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
    PaginationSkipNext,
    PaginationSkipPrevious,
} from "@/components/ui/pagination";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
/** typesから参照 */
import { useState } from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import { Box } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { contractQueryParamsState } from "@/stores/contracts/atom";
import { Contract } from "@/types/api/contract";

/** 保存時はserver componentで処理 */

export type ContractListTableProps<TData, TValue> = {
    data: TData[];
    columns: ColumnDef<TData, TValue>[];
    // onPageChange?: (newPage: number) => void;
    // onPageSizeChange?: (newPageSize: number) => void;
    // onSearch?: (keyword: string) => void;
    totalCount: number;
};

/** 契約書一覧ソート */
type ColumnSort = {
    id: string;
    desc: boolean;
};
type SortingState = ColumnSort[];

const ContractListTablePresentation = <TData, TValue>({
    data,
    columns,
    totalCount,
}: ContractListTableProps<TData, TValue>) => {
    const router = useRouter();
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
        {}
    );
    // const [currentPage, setCurrentPage] = useState(0);
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 50,
    });
    const setQueryParams = useSetRecoilState(contractQueryParamsState);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onPaginationChange: setPagination,
        getPaginationRowModel: getPaginationRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        initialState: {
            pagination: {
                pageSize: 50,
            },
        },
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            pagination,
        },
        manualPagination: false, //サーバーサイドのページネーション実装が完了したらtrueへ
        pageCount: Math.ceil(totalCount / pagination.pageSize),
    });

    console.log(table.getRowModel().rows.length);
    console.log(columns.length);
    console.log(table.getPageCount(), totalCount / pagination.pageSize);

    const navigateToContractDetail = (rowData: Contract) => {
        console.log(rowData);
        router.push(`/contract/${rowData.contractCode}`);
    };

    return (
        <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
                <CardTitle>契約書一覧</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                    onClick={() =>
                                        navigateToContractDetail(row.original)
                                    }
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
                                    該当するデータが存在しません。
                                </TableCell>
                            </TableRow>
                        )}
                        {/* <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            aria-haspopup="true"
                                            size="icon"
                                            variant="ghost"
                                        >
                                            <MoreHorizontal className="h-4 w-4" />
                                            <span className="sr-only">
                                                Toggle menu
                                            </span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>
                                            Actions
                                        </DropdownMenuLabel>
                                        <DropdownMenuItem>
                                            Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow> */}
                    </TableBody>
                </Table>
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
                                        {[10, 20, 30, 40, 50, 75, 100].map(
                                            (pageSize) => (
                                                <SelectItem
                                                    key={pageSize}
                                                    value={`${pageSize}`}
                                                >
                                                    {pageSize}
                                                </SelectItem>
                                            )
                                        )}
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
                                    onClick={() => table.firstPage()}
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
                                    onClick={
                                        () => table.lastPage()
                                        // table.setPageIndex(
                                        //     table.getPageCount() - 1
                                        // )
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
                    {/* <Box className="flex items-center space-x-6 lg:space-x-8">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationSkipPrevious href="#" />
                                </PaginationItem>
                                <PaginationItem
                                    onClick={() => table.previousPage()}
                                    aria-disabled={!table.getCanPreviousPage()}
                                >
                                    <PaginationPrevious href="#" />
                                </PaginationItem>
                                <PaginationItem
                                    onClick={() => table.nextPage()}
                                    aria-disabled={!table.getCanNextPage()}
                                >
                                    <PaginationNext href="#" />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationSkipNext href="#" />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </Box> */}
                </Box>
            </CardFooter>
        </Card>
    );
};

export default ContractListTablePresentation;
