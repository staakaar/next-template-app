"use client";
import {
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectRoot,
    SelectTrigger,
    SelectValueText,
} from "@/components/ui/select";
import {
    PaginationNextTrigger,
    PaginationPageText,
    PaginationPrevTrigger,
    PaginationRoot,
} from "@/components/ui/pagination";
import { onContractBasicSubmit as useFetchContracts } from "@/lib/contract/api";
import { useState } from "react";
import React from "react";
import { HStack } from "@chakra-ui/react";
import VSpinner from "../Spinner/spinner";
import { toaster } from "@/components/ui/toaster";

const PageSize = [
    { label: "50", value: "50" },
    { label: "75", value: "75" },
    { label: "100", value: "100" },
];

/** 親コンポーネントから渡す情報 */
export type PaginationProps = {
    totalCount: number;
};

const Pagination = () => {
    const [pageSize, setPageSize] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    // TODO: この処理は親コンポーネントで行う SWR でサーバーからデータを取得（ページサイズとページ番号をリクエストに含める）
    const { data, isLoading, isError } = useFetchContracts();

    // データ件数を選択するためのハンドラー
    const handlePageSizeChange = (event: any) => {
        setPageSize(event.target.value);
        setCurrentPage(1); // 件数が変わったらページをリセット
    };

    if (isLoading) {
        /** Skelton loader */
        return <VSpinner />;
    }

    if (isError) {
        /** トースター表示 */
        return toaster.create({
            max: 5,
            title: "データの取得に失敗しました。",
            type: "error",
        });
    }
    return (
        <>
            <SelectRoot
                items={PageSize}
                width="320px"
                value={pageSize}
                onValueChange={(e: { value: any }) =>
                    handlePageSizeChange(e.value)
                }
            >
                <SelectLabel>Select framework</SelectLabel>
                <SelectTrigger>
                    <SelectValueText />
                </SelectTrigger>
                <SelectContent>
                    {PageSize.map((pageSize) => (
                        <SelectItem item={pageSize} key={pageSize.value}>
                            {pageSize.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </SelectRoot>
            <PaginationRoot
                count={data.length}
                pageSize={data.totalCount / 50}
                defaultPage={currentPage}
                maxW="240px"
            >
                <HStack gap="4">
                    <PaginationPageText format="long" flex="1" />
                    <PaginationPrevTrigger />
                    <PaginationNextTrigger />
                </HStack>
            </PaginationRoot>
        </>
    );
};

export default Pagination;
