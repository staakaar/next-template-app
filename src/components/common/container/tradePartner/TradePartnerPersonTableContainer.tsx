// "use client"
import { useState } from "react";
import { useFetchTraderPartnerPerson } from "@/lib/tradePartner/api";
import TradePartnerPersonDrawerPresentation from "../../presentational/tradePartner/TradePartnerPersonDrawerPresentation";
import { columns } from "./TradePartnerPersonTableColumn";
import React from "react";

const TradePartnerPersonTableContainer = () => {
    // 取引先担当者をフェッチ
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(50);
    const [search, setSearch] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const data = useFetchTraderPartnerPerson(page, pageSize, search);

    return (
        <>
            <TradePartnerPersonDrawerPresentation
                data={data.tradePartnerPersons}
                columns={columns}
                totalCount={data.totalCount}
            />
        </>
    );
};

export default TradePartnerPersonTableContainer;
