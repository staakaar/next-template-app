// "use client";
import React, { ReactNode } from "react";
import {
    Card,
    Button,
    Group,
    Box,
    Stack,
    Divider,
    Paper,
    Container,
    Anchor,
} from "@mantine/core";
import {
    IconArrowLeft,
    IconFileExport,
    IconCopy,
    IconSend,
} from "@tabler/icons-react";
import ContractStatusStepper from "@/components/common/ContractStatusStepper";
import Link from "next/link";
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
            <Box className="min-h-full h-full">
                {/* <Card className="flex min-h-screen w-full flex-col bg-muted/40"> */}
                <Card
                    shadow="sm"
                    mx={4}
                    style={{
                        flex: "1 1 auto",
                        backgroundColor: "var(--mantine-color-gray-0)",
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        minHeight: "100vh",
                    }}
                >
                    <Box
                        style={{
                            width: "100%",
                            padding: "1rem",
                            "@media (min-width: 768px)": {
                                padding: "1rem 2rem",
                            },
                        }}
                    >
                        <Stack>
                            <Group align="center" justify="space-between">
                                <Anchor
                                    component={Link}
                                    href="/contract-all"
                                    size="sm"
                                    // leftSection={<IconArrowLeft size="1rem" />}
                                >
                                    一覧へ戻る
                                </Anchor>
                                <Group>
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
                                </Group>
                                {/* </Box> */}
                            </Group>
                            {/* </Box> */}
                            {/* ステッパー */}
                            <ContractStatusStepper />
                            {/* セクション */}
                            <ContractDetailSection />
                            {/* メニューレイアウト */}
                            <ContractDetailMenuLayout />
                            <Divider />
                            <Box
                                flex={1}
                                className="flex-1 lg:max-w-2xl: bg-black-alpha-200"
                            >
                                {tabs}
                            </Box>
                            {children}
                        </Stack>
                    </Box>
                </Card>
            </Box>
            <Paper
                shadow="sm"
                p="md"
                style={{
                    position: "sticky",
                    bottom: 0,
                    borderTop: "1px solid var(--mantine-color-gray-3)",
                    backgroundColor: "var(--mantine-color-white)",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    display: "flex",
                }}
            >
                <Group>
                    <ContractDetailUpdateButton
                        activeTab={undefined}
                        contractCode={undefined}
                    />
                </Group>
            </Paper>
            {/* <footer className="flex items-center justify-end bg-background h-16 sticky bottom-0 border-t">
                <Box className="mr-8">
                    <ContractDetailUpdateButton
                        activeTab={undefined}
                        contractCode={undefined}
                    />
                </Box>
            </footer> */}
        </>
    );
};

export default Layout;
