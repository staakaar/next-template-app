import { Tabs, TabsList, TabsTab, TabsPanel } from "@mantine/core";
import TradePartnerTableContainer from "../container/tradePartner/TradePartnerTableContainer";
import TradePartnerCompanyTableContainer from "../container/tradePartner/TradePartnerCompanyTableContainer";

const TradePartnerPresentational = () => {
    return (
        <>
            <Tabs orientation="horizontal" defaultValue="list">
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
                    <div>担当者追加</div>
                </TabsPanel>
            </Tabs>
        </>
    );
};

export default TradePartnerPresentational;
