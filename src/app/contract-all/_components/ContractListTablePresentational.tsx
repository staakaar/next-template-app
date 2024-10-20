"use client";
import React, { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";
import {
    DataTable,
    useDataTableColumns,
    DataTableSortStatus,
    DataTableRowClickHandler,
} from "mantine-datatable";
import {
    Card,
    Text,
    Group,
    Button,
    ActionIcon,
    Tooltip,
    TextInput,
    Select,
    Box,
    Collapse,
    Menu,
    MenuItem,
} from "@mantine/core";
import { IconSearch, IconTrash, IconEdit, IconDots } from "@tabler/icons-react";
import { contractQueryParamsState } from "@/stores/contracts/atom";
import { Contract } from "@/types/api/contract";
import { useFetchContracts } from "@/lib/contract/api";

/** 保存時はserver componentで処理 */

export type ContractListTableProps<T> = {
    contracts: Contract[];
    // columns: ColumnDef<TData, TValue>[];
    // onPageChange?: (newPage: number) => void;
    // onPageSizeChange?: (newPageSize: number) => void;
    // onSearch?: (keyword: string) => void;
    initialTotalCount: number;
};

const ContractListTablePresentation = <T extends Contract>({
    contracts,
    // columns,
    initialTotalCount,
}: ContractListTableProps<T>) => {
    const router = useRouter();
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus<Contract>>(
        {
            columnAccessor: "contractCode",
            direction: "asc",
        }
    );
    const [records, setRecords] = useState<Contract[]>(contracts);
    const [totalCount, setTotalCount] = useState(initialTotalCount);
    const setQueryParams = useSetRecoilState(contractQueryParamsState);

    const navigateToContractDetail: DataTableRowClickHandler<Contract> = ({
        record,
    }) => {
        router.push(`/contract/${record.contractCode}`);
    };

    const handleDelete = (rowData: T) => {
        console.log("Delete", rowData);
    };

    const handleEdit = (rowData: T) => {
        console.log("Edit", rowData);
    };

    const handlePageChange = async (newPage: number) => {
        try {
            const result = await useFetchContracts(
                newPage,
                pageSize,
                searchQuery
            );
            setRecords(result.contracts);
            setTotalCount(result.totalCount);
            setPage(newPage);
        } catch (error) {
            console.error("Failed to fetch contracts:", error);
            // エラーハンドリングをここに追加（例：ユーザーへの通知）
        }
    };

    const handleSearchChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newSearchQuery = event.currentTarget.value;
        setSearchQuery(newSearchQuery);
        try {
            const result = await useFetchContracts(
                page,
                pageSize,
                newSearchQuery
            );
            setRecords(result.contracts);
            setTotalCount(result.totalCount);
            setPage(1);
        } catch (error) {
            console.error("Failed to fetch contracts:", error);
            // エラーハンドリングをここに追加
        }
    };

    const handleSortStatusChange = async (
        newSortStatus: DataTableSortStatus<T>
    ) => {
        setSortStatus(newSortStatus);
        try {
            const result = await useFetchContracts(page, pageSize, searchQuery);
            setRecords(result.contracts);
            setTotalCount(result.totalCount);
        } catch (error) {
            console.error("Failed to fetch contracts:", error);
            // エラーハンドリングをここに追加
        }
    };

    const { effectiveColumns } = useDataTableColumns<Contract>({
        key: "contractCode",
        columns: [
            {
                accessor: "contractCode",
                title: "契約書コード",
                sortable: true,
            },
            {
                accessor: "contractName",
                title: "タイトル",
                sortable: true,
            },
            { accessor: "contractStatus", title: "ステータス", sortable: true },
            { accessor: "tradePartner", title: "取引先", sortable: true },
            {
                accessor: "contractPersonInCharge",
                title: "担当者",
                sortable: true,
            },
            // {
            //     accessor: "createdAt",
            //     title: "作成日",
            //     sortable: true,
            //     render: ({ createdAt }) =>
            //         new Date(createdAt).toLocaleDateString(),
            // },
            {
                accessor: "actions",
                title: "アクション",
                textAlignment: "right",
                render: (record) => (
                    <Menu shadow="md" width={200}>
                        <Menu.Target>
                            <ActionIcon>
                                <IconDots size="1rem" />
                            </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <MenuItem
                                icon={<IconEdit size="1rem" />}
                                onClick={() => handleEdit(record)}
                            >
                                編集
                            </MenuItem>
                            <MenuItem
                                icon={<IconTrash size="1rem" />}
                                onClick={() => handleDelete(record)}
                                color="red"
                            >
                                削除
                            </MenuItem>
                        </Menu.Dropdown>
                    </Menu>
                ),
            },
        ],
        // columnFilters: {
        //     contractCode: {
        //         type: "text",
        //         label: "契約書コード",
        //         placeholder: "契約書コードを入力...",
        //     },
        //     status: {
        //         type: "select",
        //         label: "ステータス",
        //         options: [
        //             { value: "作成中", label: "作成中" },
        //             { value: "承認待ち", label: "承認待ち" },
        //             { value: "承認済み", label: "承認済み" },
        //         ],
        //     },
        // },
    });

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecords(contracts.slice(from, to));
    }, [page]);

    const customSort = (
        data: Contract[],
        columnAccessor: keyof Contract,
        direction: "asc" | "desc"
    ) => {
        return [...data].sort((a, b) => {
            if (a[columnAccessor] < b[columnAccessor])
                return direction === "asc" ? -1 : 1;
            if (a[columnAccessor] > b[columnAccessor])
                return direction === "asc" ? 1 : -1;
            return 0;
        });
    };

    useEffect(() => {
        const sortedData = customSort(
            contracts,
            sortStatus.columnAccessor as keyof Contract,
            sortStatus.direction
        );
        setRecords(sortedData);
    }, [sortStatus]);

    // const filteredData = useMemo(() => {
    //     return contracts.filter((item: Contract) =>
    //         Object.values(item).some(
    //             (value) =>
    //                 value &&
    //                 value
    //                     .toString()
    //                     .toLowerCase()
    //                     .includes(searchQuery.toLowerCase())
    //         )
    //     );
    // }, [contracts, searchQuery]);

    return (
        <Card>
            <Group justify="flex-start" mb="md">
                <Text size="lg">契約書一覧</Text>
            </Group>

            <DataTable
                withTableBorder
                borderRadius="sm"
                withColumnBorders
                striped
                highlightOnHover
                columns={effectiveColumns}
                records={records}
                totalRecords={totalCount}
                recordsPerPage={pageSize}
                page={page}
                onPageChange={setPage}
                sortStatus={sortStatus}
                onSortStatusChange={setSortStatus}
                onRowClick={navigateToContractDetail}
                paginationText={({ from, to, totalRecords }) =>
                    `${from}～${to} / ${totalRecords}件`
                }
                // rowKey="contractCode"
            />

            <Group flex="1" justify="flex-end" mt="md">
                <Select
                    value={pageSize.toString()}
                    onChange={(value) => setPageSize(Number(value))}
                    data={["10", "20", "30", "50", "100"].map((size) => ({
                        value: size,
                        label: `${size}件`,
                    }))}
                />
                <Text size="sm">全{totalCount}件</Text>
            </Group>
        </Card>
        // <Card x-chunk="dashboard-06-chunk-0">
        //     <CardHeader>
        //         <CardTitle>契約書一覧</CardTitle>
        //     </CardHeader>
        //     <CardContent>
        //         <Table>
        //             <TableHeader>
        //                 {table.getHeaderGroups().map((headerGroup) => (
        //                     <TableRow key={headerGroup.id}>
        //                         {headerGroup.headers.map((header) => {
        //                             return (
        //                                 <TableHead key={header.id}>
        //                                     {header.isPlaceholder
        //                                         ? null
        //                                         : flexRender(
        //                                               header.column.columnDef
        //                                                   .header,
        //                                               header.getContext()
        //                                           )}
        //                                 </TableHead>
        //                             );
        //                         })}
        //                     </TableRow>
        //                 ))}
        //             </TableHeader>
        //             <TableBody>
        //                 {table.getRowModel().rows?.length ? (
        //                     table
        //                         .getRowModel()
        //                         .rows.slice(0, pagination.pageSize)
        //                         .map((row) => (
        //                             <TableRow
        //                                 key={row.id}
        //                                 data-state={
        //                                     row.getIsSelected() && "selected"
        //                                 }
        //                                 onClick={() =>
        //                                     navigateToContractDetail(
        //                                         row.original
        //                                     )
        //                                 }
        //                             >
        //                                 {row.getVisibleCells().map((cell) => (
        //                                     <TableCell key={cell.id}>
        //                                         {flexRender(
        //                                             cell.column.columnDef.cell,
        //                                             cell.getContext()
        //                                         )}
        //                                     </TableCell>
        //                                 ))}
        //                             </TableRow>
        //                         ))
        //                 ) : (
        //                     <TableRow>
        //                         <TableCell
        //                             colSpan={columns.length}
        //                             className="h-24 text-center"
        //                         >
        //                             該当するデータが存在しません。
        //                         </TableCell>
        //                     </TableRow>
        //                 )}
        //             </TableBody>
        //         </Table>
        //     </CardContent>
        //     <CardFooter className="flex items-center justify-end">
        //         <Box className="flex items-center justify-end px-2">
        //             {/* ページネーションコンポーネント */}
        //             <Box className="flex items-center justify-between px-2">
        //                 <Box className="flex items-center space-x-6 lg:space-x-8">
        //                     <Box className="flex items-center space-x-2">
        //                         <Select
        //                             value={`${table.getState().pagination.pageSize}`}
        //                             onValueChange={(value) => {
        //                                 table.setPageSize(Number(value));
        //                             }}
        //                         >
        //                             <SelectTrigger className="h-8 w-[70px]">
        //                                 <SelectValue
        //                                     placeholder={
        //                                         table.getState().pagination
        //                                             .pageSize
        //                                     }
        //                                 />
        //                             </SelectTrigger>
        //                             <SelectContent side="top">
        //                                 {[10, 20, 30, 40, 50, 75, 100].map(
        //                                     (pageSize) => (
        //                                         <SelectItem
        //                                             key={pageSize}
        //                                             value={`${pageSize}`}
        //                                         >
        //                                             {pageSize}
        //                                         </SelectItem>
        //                                     )
        //                                 )}
        //                             </SelectContent>
        //                         </Select>
        //                         <p className="text-sm font-medium">件</p>
        //                     </Box>
        //                     <Box className="flex w-[100px] items-center justify-center text-sm font-medium">
        //                         {table.getState().pagination.pageIndex + 1}
        //                         {" / "}
        //                         {table.getPageCount()}
        //                     </Box>
        //                     <Box className="flex items-center space-x-2">
        //                         <Button
        //                             size={"2"}
        //                             variant="outline"
        //                             className="hidden h-8 w-8 p-0 lg:flex"
        //                             onClick={() => table.firstPage()}
        //                             disabled={!table.getCanPreviousPage()}
        //                         >
        //                             <span className="sr-only">
        //                                 Go to first page
        //                             </span>
        //                             <DoubleArrowLeftIcon className="h-4 w-4" />
        //                         </Button>
        //                         <Button
        //                             size={"2"}
        //                             variant="outline"
        //                             className="h-8 w-8 p-0"
        //                             onClick={() => table.previousPage()}
        //                             disabled={!table.getCanPreviousPage()}
        //                         >
        //                             <span className="sr-only">
        //                                 Go to previous page
        //                             </span>
        //                             <ChevronLeftIcon className="h-4 w-4" />
        //                         </Button>
        //                         <Button
        //                             size={"2"}
        //                             variant="outline"
        //                             className="h-8 w-8 p-0"
        //                             onClick={() => table.nextPage()}
        //                             disabled={!table.getCanNextPage()}
        //                         >
        //                             <span className="sr-only">
        //                                 Go to next page
        //                             </span>
        //                             <ChevronRightIcon className="h-4 w-4" />
        //                         </Button>
        //                         <Button
        //                             size={"2"}
        //                             variant="outline"
        //                             className="hidden h-8 w-8 p-0 lg:flex"
        //                             onClick={
        //                                 () => table.lastPage()
        //                                 // table.setPageIndex(
        //                                 //     table.getPageCount() - 1
        //                                 // )
        //                             }
        //                             disabled={!table.getCanNextPage()}
        //                         >
        //                             <span className="sr-only">
        //                                 Go to last page
        //                             </span>
        //                             <DoubleArrowRightIcon className="h-4 w-4" />
        //                         </Button>
        //                     </Box>
        //                 </Box>
        //             </Box>
        //         </Box>
        //     </CardFooter>
        // </Card>
    );
};

export default ContractListTablePresentation;
