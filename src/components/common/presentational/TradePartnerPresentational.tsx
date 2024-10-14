import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Box, Heading } from "@chakra-ui/react";
import TradePartnerTableContainer from "../container/tradePartner/TradePartnerTableContainer";
import TradePartnerCompanyTableContainer from "../container/tradePartner/TradePartnerCompanyTableContainer";

const TradePartnerPresentational = () => {
    return (
        <>
            <Box className="mt-8">
                <Tabs defaultValue="list">
                    <div className="flex items-center">
                        <TabsList className="inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground">
                            <TabsTrigger value="list">一覧</TabsTrigger>
                            <TabsTrigger value="add">取引先追加</TabsTrigger>
                            <TabsTrigger value="newUser">
                                担当者追加
                            </TabsTrigger>
                        </TabsList>
                    </div>
                    <Separator className="mt-4" />
                    <TabsContent value="list">
                        <TradePartnerTableContainer />
                    </TabsContent>
                    <TabsContent value="add">
                        <TradePartnerCompanyTableContainer />
                    </TabsContent>
                    <TabsContent value="newUser">
                        {/* 取引先会社選択して担当者をユーザー単位で登録 */}
                        <div>担当者追加</div>
                    </TabsContent>
                </Tabs>
            </Box>
        </>
    );
};

export default TradePartnerPresentational;
