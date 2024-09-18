"use client";

import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
/** typesから参照 */
import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import { Box, TableContainer } from "@chakra-ui/react";

/** 保存時はserver componentで処理 */

export type ContractListTableProps<TData, TValue> = {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    onPageChange: (newPage: number) => void;
    onPageSizeChange: (newPageSize: number) => void;
    onSearch: (keyword: string) => void;
    totalCount: number;
};

/** 契約書一覧ソート */
type ColumnSort = {
    id: string;
    desc: boolean;
};
type SortingState = ColumnSort[];

const ContractListTablePresentational = <TData, TValue>({
    columns,
    data,
    onPageChange,
    onPageSizeChange,
    onSearch,
    totalCount,
}: ContractListTableProps<TData, TValue>) => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 50,
    });
    const [isOpen, setIsOpen] = useState(false);

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
        state: {
            sorting,
            columnFilters,
            pagination,
        },
        manualPagination: true,
        pageCount: Math.ceil(totalCount / pagination.pageSize),
    });

    const toggleExpansion = () => setIsOpen(!isOpen);

    return (
        <Box minW={{ base: "100%" }}>
            {/* <Flex justifyContent="space-between" alignItems="center" mb={2}>
                <Box
                    flex="1"
                    textAlign="center"
                    className="flex justify-center"
                >
                    <Input
                        placeholder="キーワード検索"
                        value={
                            (table
                                .getColumn("name")
                                ?.getFilterValue() as string) ?? ""
                        }
                        onChange={(event) => {
                            table
                                .getColumn("name")
                                ?.setFilterValue(event.target.value);
                            onSearch(event.target.value);
                        }}
                        className="max-w-sm"
                    />
                    <IconButton
                        bg="whiteAlpha.100"
                        aria-label="Search"
                        icon={<SearchIcon />}
                        onClick={toggleExpansion}
                    />
                </Box>
                <Box className="flex justify-end">
                    <Button className="">新規作成</Button>
                </Box>
            </Flex> */}
            {/* ステータスタブを表示 // */}

            {/* <ContractStatusTab /> */}
            {/* contractSearchコンポーネントを配置 */}

            <TableContainer
                h={{ base: "300px", md: "500px", lg: "700px" }}
                overflowY="auto"
                border="1px solid"
                borderColor="gray.100"
                borderRadius="md"
            >
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
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <div>
                                                            {flexRender(
                                                                cell.column
                                                                    .columnDef
                                                                    .cell,
                                                                cell.getContext()
                                                            )}
                                                        </div>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>
                                                            {
                                                                cell.getValue() as string
                                                            }
                                                        </p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
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
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <div className="flex items-center justify-end space-x-2 py-4">
                {/* <Select
                        value={`${table.getState().pagination.pageSize}`}
                        onValueChange={(value) => {
                            table.setPageSize(Number(value));
                            onPageSizeChange(Number(value));
                        }}
                    >
                        <SelectTrigger className="ml-4 w-[100px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {[50, 75, 100].map((pageSize) => (
                                <SelectItem
                                    key={pageSize}
                                    value={`${pageSize}`}
                                >
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select> */}
                {/* <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                            table.previousPage();
                            onPageChange(
                                table.getState().pagination.pageIndex - 1
                            );
                        }}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                            table.nextPage();
                            onPageChange(
                                table.getState().pagination.pageIndex + 1
                            );
                        }}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button> */}
                {/* <Pagination className="flex justify-end">
                    <Select
                        value={`${table.getState().pagination.pageSize}`}
                        onValueChange={(value) => {
                            table.setPageSize(Number(value));
                            onPageSizeChange(Number(value));
                        }}
                    >
                        <SelectTrigger className="ml-4 w-[100px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
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
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                        {Array.from(
                            { length: table.getPageCount() },
                            (_, i) => (
                                <PaginationItem key={i}>
                                    <PaginationLink
                                        onClick={() =>
                                            onPageChange(
                                                table.getState().pagination
                                                    .pageIndex + 1
                                            )
                                        }
                                        isActive={
                                            table.getState().pagination
                                                .pageIndex === i
                                        }
                                        href={""}
                                    >
                                        {i + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            )
                        )}
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="#" />
                        </PaginationItem>
                    </PaginationContent>
                    <Text ml={4} mt={2} mr={8}>
                        全 {totalCount} 件
                    </Text>
                </Pagination> */}
            </div>
        </Box>
    );
};

export default ContractListTablePresentational;
