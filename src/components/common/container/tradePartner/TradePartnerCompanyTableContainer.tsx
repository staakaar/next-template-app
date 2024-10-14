"use client";
import { Card } from "@/components/ui/card";
import { useFetchTradePartner } from "@/lib/tradePartner/api";
import { useState } from "react";
import { columns } from "./TradePartnerTableColumn";
import TradePartnerCompanyTablePresentation from "../../presentational/tradePartner/TradePartnerCompanyTablePresentation";
import React from "react";

const TradePartnerCompanyTableContainer = () => {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(50);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const data = useFetchTradePartner(page, pageSize, searchKeyword);

    return (
        <>
            <TradePartnerCompanyTablePresentation
                data={data.tradePartner}
                columns={columns}
                totalCount={data.totalCount}
            />
        </>
    );
};

export default TradePartnerCompanyTableContainer;

// TradePartnerTableContainerコンポーネントの内容を表示
// 行クリックで担当者ドロワーを表示
// 選択後に保存する 保存前に戻るや他のセクションクリックした場合は警告モーダルを表示する
