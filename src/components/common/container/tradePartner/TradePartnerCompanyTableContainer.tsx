"use client";
import { useFetchTradePartner } from "@/lib/tradePartner/api";
import { Suspense, useState } from "react";
import TradePartnerCompanyTablePresentation from "../../presentational/tradePartner/TradePartnerCompanyTablePresentation";
import React from "react";
import Loading from "../../atoms/Loading";

const TradePartnerCompanyTableContainer = () => {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(50);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const data = useFetchTradePartner(page, pageSize, searchKeyword);

    return (
        <>
            <Suspense fallback={<Loading />}>
                <TradePartnerCompanyTablePresentation
                    tradePartnerCompany={data.tradePartner}
                    initialTotalCount={data.totalCount}
                />
            </Suspense>
        </>
    );
};

export default TradePartnerCompanyTableContainer;

// TradePartnerTableContainerコンポーネントの内容を表示
// 行クリックで担当者ドロワーを表示
// 選択後に保存する 保存前に戻るや他のセクションクリックした場合は警告モーダルを表示する
