"use client";
import { useState } from "react";
import { useFetchTradingPartnerPersons } from "@/lib/tradePartner/api";
import TradePartnerTablePresentation from "../../presentational/tradePartner/TradePartnerTablePresentation";

const TradePartnerTableContainer = () => {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(50);
    const [search, setSearch] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const tradePartnerPersons = useFetchTradingPartnerPersons(
        page,
        pageSize,
        search
    );

    return (
        <>
            <TradePartnerTablePresentation
                tradingPartnerPersons={
                    tradePartnerPersons.tradingPartnerPersons
                }
                initialTotalCount={tradePartnerPersons.totalCount}
            />
        </>
    );
};

export default TradePartnerTableContainer;
