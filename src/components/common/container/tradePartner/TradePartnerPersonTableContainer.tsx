// "use client"
import { useState } from "react";
import { useFetchTraderPartnerPerson } from "@/lib/tradePartner/api";

const TradePartnerPersonTableContainer = () => {
    // 取引先担当者をフェッチ
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(50);
    const [search, setSearch] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const data = useFetchTraderPartnerPerson(page, pageSize, search);

    return <></>;
};

export default TradePartnerPersonTableContainer;
