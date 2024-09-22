import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { Box, Button, Heading, VStack } from "@chakra-ui/react";
import Link from "next/link";
import ContractStatusStepper from "@/components/common/ContractStatusStepper";
import ContractBasicContainer from "@/components/common/ContractBasicContainer";
import TradePartnerContainer from "@/components/common/container/TradePartnerContainer";

/** 新規作成ページ */
const ContractNewPage = () => {
    return (
        <>
            {/* 詳細タブ表示(各ドメイン) */}
            {/* タブに応じて新規作成ページを切り替える 契約書情報を一番最初に入力する必要あり */}
            <Card className="flex min-h-screen w-full flex-col bg-muted/40">
                <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 sm:mt-10">
                    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                        <Box className="text-sm font-medium">
                            <Link href={"/contract-all"}>一覧へ戻る</Link>
                        </Box>
                        <ContractStatusStepper />
                        <Box className="flex items-center justify-between space-y-2 px-8">
                            <Heading className="text-md font-bold">
                                新規作成画面
                            </Heading>
                            <Box className="flex items-center space-x-2">
                                {/* 基本情報を保存した瞬間に非表示 */}
                                <Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded hover:shadow-lg transition-all duration-200">
                                    キャンセル
                                </Button>
                                {/* 基本情報とファイルの登録をしている場合は表示 */}
                                <Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded hover:shadow-lg transition-all duration-200">
                                    アプローチ
                                </Button>
                                <Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded hover:shadow-lg transition-all duration-200">
                                    出力
                                </Button>
                                <Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded hover:shadow-lg transition-all duration-200">
                                    コピー
                                </Button>
                                <Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded hover:shadow-lg transition-all duration-200">
                                    WF
                                </Button>
                                <Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded hover:shadow-lg transition-all duration-200">
                                    発行
                                </Button>
                            </Box>
                        </Box>
                        <Separator />

                        <Box className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0 space-x-4 px-8 lg:h-[900px]">
                            <Box as="aside" className="-mx-6 lg:w-1/5 border-r">
                                <VStack
                                    as="nav"
                                    align="stretch"
                                    w="25%"
                                    className="flex space-x-2 lg:flex-col lg:space-x-12 lg:space-y-1 mt-20"
                                >
                                    <Link
                                        className="hover:text-blue-800 hover:underline focus:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 inline-flex items-center whitespace-nowrap"
                                        href={"#basic"}
                                    >
                                        基本情報
                                    </Link>
                                    <Link
                                        href={"#tradePartner"}
                                        className="hover:text-blue-800 hover:underline focus:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 inline-flex items-center whitespace-nowrap"
                                    >
                                        取引先
                                    </Link>
                                    <Link
                                        href={"#file"}
                                        className="hover:text-blue-800 hover:underline focus:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 inline-flex items-center whitespace-nowrap"
                                    >
                                        ファイル
                                    </Link>
                                    <Link
                                        href={"#details"}
                                        className="hover:text-blue-800 hover:underline focus:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 inline-flex items-center whitespace-nowrap"
                                    >
                                        明細
                                    </Link>
                                    <Link
                                        href={"#details"}
                                        className="hover:text-blue-800 hover:underline focus:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 inline-flex items-center whitespace-nowrap"
                                    >
                                        外部連携
                                    </Link>
                                    <Link
                                        href={"#section"}
                                        className="hover:text-blue-800 hover:underline focus:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 inline-flex items-center whitespace-nowrap"
                                    >
                                        セクション
                                    </Link>
                                    <Link
                                        href={"ownCompany"}
                                        className="hover:text-blue-800 hover:underline focus:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 inline-flex items-center whitespace-nowrap"
                                    >
                                        自社情報
                                    </Link>
                                    <Link
                                        href={"authority"}
                                        className="hover:text-blue-800 hover:underline focus:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 inline-flex items-center whitespace-nowrap"
                                    >
                                        権限
                                    </Link>
                                    <Link
                                        href={"relatedInfo"}
                                        className="hover:text-blue-800 hover:underline focus:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 inline-flex items-center whitespace-nowrap"
                                    >
                                        関連情報
                                    </Link>
                                    <Link
                                        href={"workflow"}
                                        className="hover:text-blue-800 hover:underline focus:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 inline-flex items-center whitespace-nowrap"
                                    >
                                        WF
                                    </Link>
                                    <Link
                                        href={"history"}
                                        className="hover:text-blue-800 hover:underline focus:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 inline-flex items-center whitespace-nowrap"
                                    >
                                        履歴
                                    </Link>
                                </VStack>
                            </Box>
                            <Box flex={1} className="flex-1 lg:max-w-2xl:">
                                {/* containerにする */}
                                <ContractBasicContainer />
                                <TradePartnerContainer />
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
                    </main>
                </div>
            </Card>
        </>
    );
};

export default ContractNewPage;
