import { Tabs, TabsList, TabsTab, TabsPanel } from "@mantine/core";
import TradePartnerTableContainer from "../container/tradePartner/TradePartnerTableContainer";
import TradePartnerCompanyTableContainer from "../container/tradePartner/TradePartnerCompanyTableContainer";
import TradingPartnerPrivatePersonContainer from "./tradePartner/TradingPartnerPrivatePersonContainer";
import TradingPartnerCompanyNestedContainer from "../container/tradePartner/TradingPartnerCompanyNestedContainer";

const TradePartnerPresentational = () => {
    return (
        <>
            <Tabs
                autoContrast
                variant="pills"
                orientation="horizontal"
                defaultValue="list"
                className="mt-4"
            >
                <TabsList>
                    <TabsTab value="list">一覧</TabsTab>
                    <TabsTab value="add">取引先追加</TabsTab>
                    <TabsTab value="newUser">担当者追加</TabsTab>
                </TabsList>
                <TabsPanel value="list">
                    <TradePartnerTableContainer />
                </TabsPanel>
                <TabsPanel value="add">
                    <TradePartnerCompanyTableContainer />
                </TabsPanel>
                <TabsPanel value="newUser">
                    {/* 取引先会社選択して担当者をユーザー単位で登録 */}
                    <TradingPartnerCompanyNestedContainer />
                    <TradingPartnerPrivatePersonContainer />
                </TabsPanel>
            </Tabs>
        </>
    );
};

export default TradePartnerPresentational;
