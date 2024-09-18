/** 契約書一覧データ取得処理 あくまでサーバーコンポーネントでデータ取得のみ */
/** Presentationalでclient特有の処理 */
"use client";
import { onContractBasicSubmit as useFetchContracts } from "@/lib/contract/api";
import { useState } from "react";
import ContractListTablePresentational from "./ContractListTablePresentational";
import { columns } from "./ContractListColumns";
import { Box, Collapse, IconButton } from "@chakra-ui/react";
import { Input } from "@/components/ui/input";
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

import { QuestionOutlineIcon } from "@chakra-ui/icons";
/** 常に最新情報を取得 */
export const dynamic = "force-dynamic";

const ContractListTableContainer = () => {
    /** useSWR fetch */
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(50);
    const [search, setSearch] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const { data, isLoading, isError } = useFetchContracts(
        page,
        pageSize,
        search
    );

    const toggleExpansion = () => setIsOpen(!isOpen);

    // if (isLoading) return <div> loading...</div>;
    // if (isError) return <div>failed to load contracts</div>;

    return (
        <Box maxW={{ base: "100vw" }} className="space-y-4 mt-8">
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
                    <Select>
                        <SelectTrigger className="w-[100px] border-none focus:ring-0 focus:border-none">
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
                    {/* <Box className="flex items-center space-x-2">
                        <p></p>
                    </Box>
                    <Box className="flex w-[100px] items-center justify-center text-sm font-medium"></Box>
                    <Box className="flex items-center space-x-2"></Box> */}
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
        </Box>
    );
};

export default ContractListTableContainer;
