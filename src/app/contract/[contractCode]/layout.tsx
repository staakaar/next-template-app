import React, { ReactNode } from "react";
import ContractStatusStepper from "@/components/common/ContractStatusStepper";
import { Card } from "@/components/ui/card";
import { Box } from "@chakra-ui/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ContractDetailMenuLayout from "@/components/common/ContractDetailMenuLayout";
import ContractDetailSection from "../_components/ContractDetailSection";
import { ContractDetailUpdateButton } from "../_components/ContractDetailUpdateButton";

const Layout = ({
    children,
    tabs,
}: Readonly<{
    children: ReactNode;
    tabs: ReactNode;
}>) => {
    return (
        <>
            <Card className="flex min-h-screen w-full flex-col bg-muted/40">
                <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-10 sm:mt-8">
                    <main className="flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0">
                        <Box className="text-sm font-medium flex justify-between">
                            <Link
                                className="inline-block"
                                href={"/contract-all"}
                            >
                                一覧へ戻る
                            </Link>
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
                        <ContractStatusStepper />
                        {/* <Card className="px-4 py-4"> */}
                        {/* <Box className="flex items-center justify-between space-y-2 px-8"> */}
                        {/* <Box className="flex justify-start"> */}
                        <ContractDetailSection />
                        {/* </Box> */}
                        <ContractDetailMenuLayout />
                        {/* </Box> */}
                        <Separator />
                        {/* <Box
                        className="overflow-auto"
                        style={{ maxHeight: "calc(100vh - 200px)" }}
                    > */}
                        <Box
                            flex={1}
                            className="flex-1 lg:max-w-2xl: bg-black-alpha-200"
                        >
                            {tabs}
                        </Box>
                        {children}
                        {/* </Box> */}
                        {/* </Card> */}
                    </main>
                </div>
            </Card>
            <footer className="flex items-center justify-end bg-background h-16 sticky bottom-0 border-t">
                <Box className="mr-8">
                    <ContractDetailUpdateButton
                        activeTab={undefined}
                        contractCode={undefined}
                    />
                </Box>
            </footer>
        </>
    );
};

export default Layout;
