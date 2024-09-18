import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContractListTableContainer from "./_components/ContractListTableContainer";
import { Box, Button } from "@chakra-ui/react";
import Link from "next/link";

// shadcn ui でテーブル作成は DataTableパクる
// ステータスバーはhttps://ui.shadcn.com/examples/dashboard 参考にする項目数が多い場合は左右スライド可能
// 見出しと新規作成ボタンも現状のサイドメニューも↑参考にする

// 新規作成、詳細ページの画面は見出し、タブ、ボタンは↑と同様にする
// もしくは https://ui.shadcn.com/examples/forms 参考にする

const ContractList = () => {
    return (
        <>
            {/* タブで管理メニューと設定メニューを表示 */}
            {/* <Container className="container"> */}
            <Card className=" flex-1 space-y-4 p-8 pt-6">
                <Box className="flex items-center justify-between space-y-2 px-8">
                    <h2>見出し名</h2>
                    <Box className="flex items-center space-x-2">
                        <Button>
                            <Link href={"/contract-new"}>新規作成</Link>
                        </Button>
                    </Box>
                </Box>
                <Box className="space-x-4 px-8">
                    <Tabs defaultValue="account" className="w-[400px]">
                        <TabsList className="inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground">
                            <TabsTrigger value="account">作成中</TabsTrigger>
                            <TabsTrigger value="password">作成済み</TabsTrigger>
                            <TabsTrigger value="password">承認中</TabsTrigger>
                            <TabsTrigger value="password">差し戻し</TabsTrigger>
                            <TabsTrigger value="password">却下</TabsTrigger>
                            <TabsTrigger value="password">承認済み</TabsTrigger>
                            <TabsTrigger value="password">発行</TabsTrigger>
                            <TabsTrigger value="password">合意</TabsTrigger>
                            <TabsTrigger value="password">却下</TabsTrigger>
                        </TabsList>
                    </Tabs>
                    {/* <Container maxW={{ base: "100vw" }} mt={10}> */}
                    {/* 検索窓の表示・検索項目のドロップダウン・新規追加ボタン // */}
                    {/* <ContractSearchMenu /> */}
                    {/* ContractListTableContainer ContractListTablePresentationalを作成 */}

                    {/* </Container> */}
                </Box>
                <Box className="space-x-4 px-8">
                    <ContractListTableContainer />
                </Box>
            </Card>
            {/* </Container> */}
        </>
    );
};
export default ContractList;
