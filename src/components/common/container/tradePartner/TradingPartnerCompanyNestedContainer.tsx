import TradingPartnerCompanyNestedPresentation from "../../presentational/tradePartner/TradingPartnerCompanyNestedPresentation";
import { filteredTradingCompanies } from "@/types/api/tradePartner";

// user department company情報を本来はフェッチする
const TradingPartnerCompanyNestedContainer = () => {
    // fetch company
    // tradingCompanies initialCount

    return (
        <TradingPartnerCompanyNestedPresentation
            tradingCompanies={filteredTradingCompanies}
            initialCount={100}
        />
    );
};

export default TradingPartnerCompanyNestedContainer;
