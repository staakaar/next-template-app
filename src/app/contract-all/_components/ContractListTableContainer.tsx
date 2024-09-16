/** 契約書一覧データ取得処理 あくまでサーバーコンポーネントでデータ取得のみ */
/** Presentationalでclient特有の処理 */
"use client";
import useFetchContracts from "@/lib/contract/api";
import { createColumnHelper } from "@tanstack/react-table";
import { useState } from "react";
import ContractListTablePresentational from "./ContractListTablePresentational";
import { Contract } from "@/types/api/contract";
/** 常に最新情報を取得 */
export const dynamic = "force-dynamic";

const columnHelper = createColumnHelper<Contract>();

const columns = [
    columnHelper.accessor("contractCode", {
        cell: (info) => info.getValue(),
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.contractName, {
        id: "契約書名",
        cell: (info) => <i>{info.getValue()}</i>,
        header: () => <span>Last Name</span>,
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor("contractName", {
        header: () => "契約書名",
        cell: (info) => info.renderValue(),
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor("tradePartner", {
        header: () => <span>取引先</span>,
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor("contractPersonInCharge", {
        header: "担当者",
        footer: (info) => info.column.id,
    }),
];

const ContractListTableContainer = () => {
    /** useSWR fetch */
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(50);
    const [search, setSearch] = useState("");

    const { data, isLoading, isError } = useFetchContracts(
        page,
        pageSize,
        search
    );

    // if (isLoading) return <div> loading...</div>;
    // if (isError) return <div>failed to load contracts</div>;

    return (
        <>
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
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                onSearch={(newSearch) => setSearch(newSearch)}
                totalCount={0}
            />
        </>
    );
};

export default ContractListTableContainer;
