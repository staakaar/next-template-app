/** 契約書一覧データ取得処理 あくまでサーバーコンポーネントでデータ取得のみ */
"use client";
import { useFetchContracts } from "@/lib/contract/api";
import { useState } from "react";
import { Button } from "@chakra-ui/react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { File, ListFilter, PlusCircle, Search } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { columns } from "./ContractListColumns";
import ContractListTablePresentation from "./ContractListTablePresentational";

/** 常に最新情報を取得 */
export const dynamic = "force-dynamic";

const ContractListTableContainer = () => {
    /** useSWR fetch */
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(50);
    const [search, setSearch] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const data = useFetchContracts(page, pageSize, search);
    console.log("fadsa", data);

    const toggleExpansion = () => setIsOpen(!isOpen);

    // if (isLoading) return <div> loading...</div>;
    // if (isError) return <div>failed to load contracts</div>;

    return (
        <>
            {/* <Box maxW={{ base: "100vw" }} className="space-y-4 mt-8">
                <Box className="flex items-center justify-between">
                    <Box>
                        <Input
                            className="flex rounded-md border-input px-3 py-1 text-sm shadow-sm transition-colors file:border file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 h-8 w-[200px] lg:w-[500px]"
                            placeholder="キーワード検索"
                        />
                    </Box>
                    <IconButton
                        aria-label={"button"}
                        icon={<QuestionOutlineIcon />}
                        bg={"white"}
                    />
                </Box>
                <Box className="rounded-md border">
                    <Box className="relative w-full overflow-auto">
                        <Collapse in={isOpen} animateOpacity>
                            <Box
                                bg="whiteAlpha.100"
                                rounded="md"
                                shadow="md"
                                width="100%"
                                height={{
                                    base: "800px",
                                    sm: "300px",
                                    md: "500px",
                                    lg: "800px",
                                    "2xl": "1000px",
                                }}
                            >
                                <div>検索エリア</div>
                            </Box>
                        </Collapse>
                        <ContractListTablePresentational
                            columns={columns}
                            data={
                                data || [
                                    {
                                        contractCode: "1",
                                        contractName: "2",
                                        tradePartner: "ss",
                                        contractPersonInCharge: "fg",
                                    },
                                ]
                            }
                            onPageChange={(newPage) => setPage(newPage)}
                            onPageSizeChange={(newPageSize) =>
                                setPageSize(newPageSize)
                            }
                            onSearch={(newSearch) => setSearch(newSearch)}
                            totalCount={0}
                        />
                    </Box>
                </Box>
                <Box className="flex items-center justify-end px-2">
                    <Box className="flex items-center justify-between px-2">
                        <Select defaultValue="50">
                            <SelectTrigger    rigger className="w-[100px] border-none focus:ring-0 focus:border-none">
                                <SelectValue placeholder="件数" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="50">50</SelectItem>
                                <SelectItem value="75">75</SelectItem>
                                <SelectItem value="100">100</SelectItem>
                            </SelectContent>
                        </Select>
                        <span className="text-sm font-medium">件数</span>
                    </Box>
                    <Box className="flex w-[100px] items-center justify-center text-sm font-medium">
                        <p>1/10</p>
                    </Box>
                    <Box className="flex items-center space-x-6 lg:space-x-8">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationSkipPrevious href="#" />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationPrevious href="#" />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationNext href="#" />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationSkipNext href="#" />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </Box>
                    <Box></Box>
                </Box>
            </Box> */}
            <div className="flex min-h-screen w-full flex-col bg-muted/40">
                <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 sm:mt-10">
                    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                        <Tabs defaultValue="created">
                            <div className="flex items-center">
                                <TabsList className="inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground">
                                    <TabsTrigger value="under_construction">
                                        作成中
                                    </TabsTrigger>
                                    <TabsTrigger value="created">
                                        作成済み
                                    </TabsTrigger>
                                    <TabsTrigger value="internal_approved">
                                        承認中
                                    </TabsTrigger>
                                    <TabsTrigger value="revised">
                                        差し戻し
                                    </TabsTrigger>
                                    <TabsTrigger value="reject">
                                        却下
                                    </TabsTrigger>
                                    <TabsTrigger value="approved">
                                        承認済み
                                    </TabsTrigger>
                                    <TabsTrigger value="issued">
                                        発行
                                    </TabsTrigger>
                                    <TabsTrigger value="ok">合意</TabsTrigger>
                                    <TabsTrigger value="reject">
                                        却下
                                    </TabsTrigger>
                                </TabsList>
                                <div className="relative ml-auto flex-1 md:grow-0">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        type="search"
                                        placeholder="Search..."
                                        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                                    />
                                </div>
                                <div className="ml-auto flex items-center gap-2">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="h-8 gap-1"
                                            >
                                                <ListFilter className="h-3.5 w-3.5" />
                                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                                    検索
                                                </span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>
                                                Filter by
                                            </DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuCheckboxItem checked>
                                                Active
                                            </DropdownMenuCheckboxItem>
                                            <DropdownMenuCheckboxItem>
                                                Draft
                                            </DropdownMenuCheckboxItem>
                                            <DropdownMenuCheckboxItem>
                                                Archived
                                            </DropdownMenuCheckboxItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="h-8 gap-1"
                                    >
                                        <File className="h-3.5 w-3.5" />
                                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                            Export
                                        </span>
                                    </Button>
                                    <Button size="sm" className="h-8 gap-1">
                                        <Link
                                            href={"/contract-new"}
                                            className="flex justify-center"
                                        >
                                            <PlusCircle className="h-3.5 w-3.5" />
                                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                                新規作成
                                            </span>
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                            <TabsContent value="created">
                                <ContractListTablePresentation
                                    data={data.contracts}
                                    columns={columns}
                                    totalCount={data.totalCount}
                                />
                            </TabsContent>
                        </Tabs>
                    </main>
                </div>
            </div>
        </>
    );
};

export default ContractListTableContainer;
