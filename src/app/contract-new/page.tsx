import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

import { Box, Button, Heading, VStack } from "@chakra-ui/react";
import Link from "next/link";
import ContractStatusStepper from "@/components/common/ContractStatusStepper";
import ContractBasicContainer from "@/components/common/ContractBasicContainer";

/** 新規作成ページ */
const ContractNewPage = () => {
    return (
        <>
            {/* 詳細タブ表示(各ドメイン) */}
            {/* タブに応じて新規作成ページを切り替える 契約書情報を一番最初に入力する必要あり */}
            <Card className="flex-1 space-y-4 p-8 pt-6">
                <Box className="text-sm font-medium">
                    <Link href={"/contract-all"}>一覧へ戻る</Link>
                </Box>
                {/* TODO: プログレスバーを設置 */}
                <ContractStatusStepper />
                <Box className="flex items-center justify-between space-y-2 px-8">
                    <Heading className="text-md font-bold">
                        新規作成画面
                    </Heading>
                    <Box className="flex items-center space-x-2">
                        {/* 基本情報を保存した瞬間に非表示 */}
                        <Button>キャンセル</Button>
                        {/* 基本情報とファイルの登録をしている場合は表示 */}
                        <Button>アプローチ</Button>
                        <Button>出力</Button>
                        <Button>コピー</Button>
                        <Button>WF</Button>
                        <Button>発行</Button>
                    </Box>
                </Box>
                {/* <Box className="space-x-4 px-8">
                    <Tabs defaultValue="basic" className="w-[400px]">
                        <TabsList className="inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground">
                            <TabsTrigger value="basic">基本情報</TabsTrigger>
                            <TabsTrigger value="contractFile">
                                ファイル
                            </TabsTrigger>
                            <TabsTrigger value="contractDetails">
                                明細
                            </TabsTrigger>
                            <TabsTrigger value="section">
                                セクション
                            </TabsTrigger>
                            <TabsTrigger value="draft">ドラフト</TabsTrigger>
                            <TabsTrigger value="ownCompany">
                                自社情報
                            </TabsTrigger>
                            <TabsTrigger value="relatedInfo">
                                関連情報
                            </TabsTrigger>
                            <TabsTrigger value="workflow">WF</TabsTrigger>
                            <TabsTrigger value="history">履歴</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </Box> */}
                <Separator />

                <Box className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0 space-x-4 px-8 lg:h-[900px]">
                    <Box as="aside" className="-mx-4 lg:w-1/5">
                        <VStack
                            as="nav"
                            align="stretch"
                            w="25%"
                            className="flex space-x-2 lg:flex-col lg:space-x-12 lg:space-y-1 mt-20"
                        >
                            {/* 共通かする 基本情報だけ入力可能 保存したら他の項目も値をセットして入力できるようにする */}
                            <Link
                                className="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 hover:bg-transparent justify-start bg-transparent"
                                href={"#basic"}
                            >
                                基本情報
                            </Link>
                            <Link
                                href={"#tradePartner"}
                                className="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 hover:bg-transparent justify-start bg-transparent"
                            >
                                取引先
                            </Link>
                            <Link
                                href={"#file"}
                                className="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 hover:bg-transparent justify-start bg-transparent"
                            >
                                ファイル
                            </Link>
                            <Link
                                href={"#details"}
                                className="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 hover:bg-transparent justify-start bg-transparent"
                            >
                                明細
                            </Link>
                            <Link
                                href={"#section"}
                                className="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 hover:bg-transparent justify-start bg-transparent"
                            >
                                セクション
                            </Link>
                            <Link
                                href={"ownCompany"}
                                className="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 hover:bg-transparent justify-start bg-transparent"
                            >
                                自社情報
                            </Link>
                            <Link
                                href={"authority"}
                                className="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 hover:bg-transparent justify-start bg-transparent"
                            >
                                権限
                            </Link>
                            <Link
                                href={"relatedInfo"}
                                className="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 hover:bg-transparent justify-start bg-transparent"
                            >
                                関連情報
                            </Link>
                            <Link
                                href={"workflow"}
                                className="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 hover:bg-transparent justify-start bg-transparent"
                            >
                                WF
                            </Link>
                            <Link
                                href={"history"}
                                className="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 hover:bg-transparent justify-start bg-transparent"
                            >
                                履歴
                            </Link>
                        </VStack>
                    </Box>
                    <Box flex={1} className="flex-1 lg:max-w-2xl:">
                        <Box className="flex items-center justify-between">
                            <Heading className="mt-4 mb-6">フォーム</Heading>
                            {/* 詳細時は更新ボタン */}
                            <Button>更新</Button>
                        </Box>
                        <Separator />
                        {/* containerにする */}
                        <ContractBasicContainer />
                        {/* <ContractFileForm />
                        <ContractDetailsForm />
                        <ContractSectionForm />
                        <OwnCompanyForm />
                        <ContractAuthority />
                        <RelatedContract />
                        <WorkflowForm />
                        <ContractHistory /> */}
                    </Box>
                </Box>
            </Card>
        </>
    );
};

export default ContractNewPage;
