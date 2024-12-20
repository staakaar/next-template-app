import React, { ReactNode } from "react";
import { Card, Button, Group, Box, Stack, Paper, Anchor } from "@mantine/core";
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
import ContractDetailActionButtons from "@/components/common/ContractDetailActionButtons";

interface ContractDetailTabProps {
    children: ReactNode;
    tabs: ReactNode;
    contractBasic: ReactNode;
    contractTrade: ReactNode;
    contractAuthority: ReactNode;
    contractDetails: ReactNode;
    contractFile: ReactNode;
    contractHistory: ReactNode;
    externalLink: ReactNode;
    ownCompany: ReactNode;
    relatedInfo: ReactNode;
    section: ReactNode;
    workflow: ReactNode;
    businessForm: ReactNode;
}

const Layout = ({
    children,
    contractBasic,
    contractTrade,
    contractAuthority,
    contractDetails,
    contractFile,
    contractHistory,
    externalLink,
    ownCompany,
    relatedInfo,
    section,
    workflow,
    businessForm,
}: Readonly<ContractDetailTabProps>) => {
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
                            "@media (minWidth: 768px)": {
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
                                    <ContractDetailActionButtons />
                                </Group>
                                {/* </Box> */}
                            </Group>
                            {/* </Box> */}
                            {/* ステッパー */}
                            <ContractStatusStepper />
                            {/* セクション */}
                            <ContractDetailSection />
                            {/* メニューレイアウト */}
                            <ContractDetailMenuLayout
                                contractBasic={contractBasic}
                                contractTrade={contractTrade}
                                contractAuthority={contractAuthority}
                                contractDetails={contractDetails}
                                contractFile={contractFile}
                                contractHistory={contractHistory}
                                externalLink={externalLink}
                                ownCompany={ownCompany}
                                relatedInfo={relatedInfo}
                                section={section}
                                workflow={workflow}
                                businessForm={businessForm}
                            />
                            <Box className="flex-1 lg:max-w-2xl: bg-black-alpha-200"></Box>
                            {children}
                        </Stack>
                    </Box>
                </Card>
            </Box>
            <Paper
                shadow="sm"
                p="md"
                className="sticky bottom-0 border-t border-gray-300 bg-white flex justify-end items-center z-50 w-full transition-all duration-200 ease-in-out shadow-lg"
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
