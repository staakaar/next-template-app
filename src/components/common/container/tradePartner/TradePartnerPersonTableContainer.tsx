import { useState } from "react";
import { useFetchTradingPartnerPersons } from "@/lib/tradePartner/api";
import TradePartnerPersonDrawerPresentation from "../../presentational/tradePartner/TradePartnerPersonDrawerPresentation";
import React from "react";

const TradePartnerPersonTableContainer = () => {
    // 取引先担当者をフェッチ
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(50);
    const [search, setSearch] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const taradePartner = useFetchTradingPartnerPersons(page, pageSize, search);

    return (
        <>
            <TradePartnerPersonDrawerPresentation
                tradePartnerPerson={taradePartner.tradingPartnerPersons}
                initialTotalCount={taradePartner.totalCount}
            />
        </>
    );
};

export default TradePartnerPersonTableContainer;
