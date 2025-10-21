"use client";
import { useFetchTradingPartnerPersons } from "@/lib/tradePartner/api";
import TradePartnerTablePresentation from "../../presentational/tradePartner/TradePartnerTablePresentation";

const TradePartnerTableContainer = () => {
    const tradePartnerPersons = useFetchTradingPartnerPersons(0, 50, "");

    return (
        <TradePartnerTablePresentation
            tradingPartnerPersons={tradePartnerPersons.tradingPartnerPersons}
            initialTotalCount={tradePartnerPersons.totalCount}
        />
    );
};

export default TradePartnerTableContainer;
