import { ApiContext } from "@/types/api";
import {
    TradingPartnerPersonResponse,
    TradingPartnerCompanyResponse,
} from "@/types/api/tradePartner";

/** axios */
const fetchTradePartner = (
    url: string
): Promise<TradingPartnerCompanyResponse[] | undefined> => {
    fetch(url).then((res) => res.json());
};

/** 取引先企業 */
export function useFetchTradingPartnerCompanies(
    pageNumber: number,
    pageSize?: number,
    searchKeyword?: string
): TradingPartnerCompanyResponse {
    const context: ApiContext = {
        apiRootUrl: process.env.API_BASE_URL || "http://localhost:8000",
    };

    const tradingPartnerCompanies = generateMockTradingPartnerCompanies(2);

    return tradingPartnerCompanies;
}

/** ダミーデータを用意 */
const generateMockTradingPartnerCompanies = (
    count: number
): TradingPartnerCompanyResponse => {
    const tradingPartnerCompanies = Array.from(
        { length: count },
        (_, index) => ({
            tradingCompanyId: `tradeCompany ${index + 1}`,
            tradingCompanyName: `tradeCompany ${index + 1}`,
            tradingCompanyAddress: `tradeCompany ${index + 1}`,
            tradingCompanyEmailAddress: `tradeCompany ${index + 1}`,
        })
    );

    return {
        tradingPartnerCompanies,
        totalCount: count,
    };
};

/** 取引先担当者 */
export function useFetchTradingPartnerPersons(
    pageNumber: number,
    pageSize?: number,
    searchKeyword?: string
) {
    const context: ApiContext = {
        apiRootUrl: process.env.API_BASE_URL || "http://localhost:8000",
    };

    const tradingPartnerPersons = generateMockTradingPartnerPersons(100);

    return tradingPartnerPersons;
}

/** ダミーデータを用意 */
const generateMockTradingPartnerPersons = (
    count: number
): TradingPartnerPersonResponse => {
    const tradingPartnerPersons = Array.from({ length: count }, (_, index) => ({
        tradingPersonId: `tradeCompany ${index + 1}`,
        tradingPersonName: `tradeCompany ${index + 1}`,
        tradingPersonEmailAddress: `tradePersonEmailAddress ${index + 1}`,
        tradingPartnerDepartmentId: `tradeCompany ${index + 1}`,
        tradingPartnerDepartmentName: `tradeCompany ${index + 1}`,
    }));

    return {
        tradingPartnerPersons,
        totalCount: count,
    };
};
