"use client";
import { Card } from "@/components/ui/card";
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
            {/* <Card className="flex w-full flex-col bg-muted/40 h-[800px]"> */}
            {/* <Box className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 sm:mt-10"> */}
            {/* <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8"> */}
            <TradePartnerTablePresentation
                data={data.tradePartner}
                columns={columns}
                totalCount={data.totalCount}
            />
            {/* </main> */}
            {/* </Box> */}
            {/* </Card> */}
        </>
    );
};

export default TradePartnerTableContainer;
