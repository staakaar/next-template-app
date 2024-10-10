/** 契約書一覧データ取得処理 あくまでサーバーコンポーネントでデータ取得のみ */
"use client";
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
import React from "react";
import { useRecoilValue } from "recoil";
import { contractListState } from "@/stores/contracts/atom";

/** 常に最新情報を取得 */
// export const dynamic = "force-dynamic";

const ContractListTableContainer = () => {
    // const [page, setPage] = useState(0);
    // const [pageSize, setPageSize] = useState(50);
    // const [search, setSearch] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const contracts = useRecoilValue(contractListState);

    // const data = useFetchContracts(page, pageSize, search);

    // useEffect(() => {
    //     if (data) {
    //         setContracts(data.contracts);
    //     }
    // }, [data, setContracts]);

    const toggleExpansion = () => setIsOpen(!isOpen);

    return (
        <>
            {/* <Box maxW={{ base: "100vw" }} className="space-y-4 mt-8">
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
                    </Box>
                </Box>
            </Box> */}
            <div className="flex min-h-screen w-full flex-col bg-black-alpha-200">
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
                                    data={contracts.contracts}
                                    columns={columns}
                                    totalCount={contracts.totalCount}
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
