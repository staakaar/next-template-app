import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TradePartnerTableContainer from "../container/tradePartner/TradePartnerTableContainer";
import TradePartnerCompanyTableContainer from "../container/tradePartner/TradePartnerCompanyTableContainer";
import TradingPartnerPrivatePersonContainer from "./tradePartner/TradingPartnerPrivatePersonContainer";
import TradingPartnerCompanyNestedContainer from "../container/tradePartner/TradingPartnerCompanyNestedContainer";

const TradePartnerPresentational = () => {
    return (
        <>
            <Tabs defaultValue="list" className="mt-4">
                <TabsList>
                    <TabsTrigger value="list">一覧</TabsTrigger>
                    <TabsTrigger value="add">取引先追加</TabsTrigger>
                    <TabsTrigger value="newUser">担当者追加</TabsTrigger>
                </TabsList>
                <TabsContent value="list">
                    <TradePartnerTableContainer />
                </TabsContent>
                <TabsContent value="add">
                    <TradePartnerCompanyTableContainer />
                </TabsContent>
                <TabsContent value="newUser">
                    {/* 取引先会社選択して担当者をユーザー単位で登録 */}
                    <TradingPartnerCompanyNestedContainer />
                    <TradingPartnerPrivatePersonContainer />
                </TabsContent>
            </Tabs>
        </>
    );
};

export default TradePartnerPresentational;
