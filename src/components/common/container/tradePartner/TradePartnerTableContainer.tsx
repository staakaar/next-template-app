"use client";
import { useState } from "react";
import { useFetchTradePartner } from "@/lib/tradePartner/api";
import { columns } from "./TradePartnerTableColumn";
import TradePartnerTablePresentation from "../../presentational/tradePartner/TradePartnerTablePresentation";

const TradePartnerTableContainer = () => {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(50);
    const [search, setSearch] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const data = useFetchTradePartner(page, pageSize, search);

    return (
        <>
            <TradePartnerTablePresentation
                data={data.tradePartner}
                columns={columns}
                totalCount={data.totalCount}
            />
        </>
    );
};

export default TradePartnerTableContainer;
