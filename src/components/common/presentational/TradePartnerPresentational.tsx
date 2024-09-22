import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Box, Heading } from "@chakra-ui/react";
import TradePartnerTableContainer from "../container/tradePartner/TradePartnerTableContainer";

const TradePartnerPresentational = () => {
    return (
        <>
            <Box className="flex items-center justify-between">
                <Heading className="mt-4 mb-6">取引先</Heading>
                {/* 詳細時は更新ボタン */}
                <Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded hover:shadow-lg transition-all duration-200">
                    更新
                </Button>
            </Box>
            <Tabs defaultValue="list">
                <div className="flex items-center">
                    <TabsList className="inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground">
                        <TabsTrigger value="list">一覧</TabsTrigger>
                        <TabsTrigger value="add">取引先追加</TabsTrigger>
                        <TabsTrigger value="newUser">担当者追加</TabsTrigger>
                    </TabsList>
                </div>
                <Separator className="mt-4" />
                <TabsContent value="list">
                    <TradePartnerTableContainer />
                </TabsContent>
                <TabsContent value="add">
                    <div>取引先追加</div>
                </TabsContent>
                <TabsContent value="newUser">
                    {/* 取引先会社選択して担当者をユーザー単位で登録 */}
                    <div>担当者追加</div>
                </TabsContent>
            </Tabs>
        </>
    );
};

export default TradePartnerPresentational;
