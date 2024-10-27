import {
    Box,
    Tabs,
    Divider,
    TabsList,
    TabsTab,
    TabsPanel,
} from "@mantine/core";
import TradePartnerTableContainer from "../container/tradePartner/TradePartnerTableContainer";
import TradePartnerCompanyTableContainer from "../container/tradePartner/TradePartnerCompanyTableContainer";

const TradePartnerPresentational = () => {
    return (
        <>
            <Box className="mt-8">
                <Tabs defaultValue="list">
                    <div className="flex items-center">
                        <TabsList className="inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground">
                            <TabsTab value="list">一覧</TabsTab>
                            <TabsTab value="add">取引先追加</TabsTab>
                            <TabsTab value="newUser">担当者追加</TabsTab>
                        </TabsList>
                    </div>
                    <Divider className="mt-4" />
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
            </Box>
        </>
    );
};

export default TradePartnerPresentational;
