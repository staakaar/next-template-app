"use client";
import { useState } from "react";
import { useFetchTradePartner } from "@/lib/tradePartner/api";
import TradePartnerTablePresentation from "../../presentational/tradePartner/TradePartnerTablePresentation";
// import TradePartnerTablePresentation from "../../presentational/tradePartner/TradePartnerTablePresentation";

const TradePartnerTableContainer = () => {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(50);
    const [search, setSearch] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const tradePartner = useFetchTradePartner(page, pageSize, search);

    return (
        <>
            <TradePartnerTablePresentation
                tradePartner={tradePartner.tradePartner}
                initialTotalCount={tradePartner.totalCount}
            />
        </>
    );
};

export default TradePartnerTableContainer;
