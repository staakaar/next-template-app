import { ApiContext } from "@/types/api";
import { TradePartnerResponse } from "@/types/api/tradePartner";

/** axios */
const fetchTradePartner = (
    url: string
): Promise<TradePartnerResponse[] | undefined> => {
    fetch(url).then((res) => res.json());
};

export function useFetchTradePartner(
    pageNumber: number,
    pageSize?: number,
    searchKeyword?: string
): TradePartnerResponse {
    const context: ApiContext = {
        apiRootUrl: process.env.API_BASE_URL || "http://localhost:8000",
    };

    const tradePartner = generateMockTradePartner(100);

    return tradePartner;
}

/** ダミーデータを用意 */
const generateMockTradePartner = (count: number): TradePartnerResponse => {
    const tradePartner = Array.from({ length: count }, (_, index) => ({
        tradeCompanyId: `tradeCompany ${index + 1}`,
        tradeCompanyName: `tradeCompany ${index + 1}`,
        tradeCompanyAddress: `tradeCompany ${index + 1}`,
        tradePersonId: `tradeCompany ${index + 1}`,
        tradePersonName: `tradeCompany ${index + 1}`,
        tradePartnerDepartmentId: `tradeCompany ${index + 1}`,
        tradePartnerDepartmentName: `tradeCompany ${index + 1}`,
    }));

    return {
        tradePartner,
        totalCount: count,
    };
};
