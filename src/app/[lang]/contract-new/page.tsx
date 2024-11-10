"use client";
import { Anchor, Card } from "@mantine/core";
import { Separator } from "@/components/ui/separator";
import { Box, Title } from "@mantine/core";
import Link from "next/link";
import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { Button } from "@mantine/core";
import ContractNewStepper from "@/components/common/ContractNewStepper";
import dynamic from "next/dynamic";
import ContractNewConfirmDialog from "@/components/ContractNewModal";
import VLoading from "../loading";
// const CONTRACT_NEW_STEPS: ContractNewStep[] = [
//     { name: "ContractBasic", label: "基本情報" },
//     { name: "ContractFile", label: "契約書ファイル" },
//     { name: "ContractTradeCompany", label: "取引先" },
//     { name: "ContractDetails", label: "明細" },
//     { name: "ContractAuthority", label: "権限" },
//     { name: "RelatedInfo", label: "関連情報" },
//     { name: "Section", label: "セクション" },
//     { name: "Workflow", label: "ワークフロー" },
// ];

export type ContractStep = {
    title: String;
    description: String;
};

const ContractSteps: ContractStep[] = [
    { title: "1", description: "基本情報" },
    { title: "2", description: "ファイル" },
    { title: "3", description: "明細" },
    { title: "4", description: "セクション" },
    { title: "5", description: "自社" },
    { title: "6", description: "WF" },
    { title: "7", description: "権限" },
];

// 動的にインポートするコンポーネントを定義
const ContractBasicContainer = dynamic(
    () => import("@/components/common/container/ContractBasicContainer"),
    { loading: () => <VLoading /> }
);
const ContractFileContainer = dynamic(
    () => import("@/components/common/container/ContractFileContainer"),
    { loading: () => <VLoading /> }
);
const TradePartnerCompanyTableContainer = dynamic(
    () =>
        import(
            "@/components/common/container/tradePartner/TradePartnerCompanyTableContainer"
        ),
    { loading: () => <VLoading /> }
);
const ContractDetailsContainer = dynamic(
    () =>
        import(
            "@/components/common/container/contractDetails/ContractDetailsContainer"
        ),
    { loading: () => <VLoading /> }
);
const ContractAuthorityContainer = dynamic(
    () => import("@/components/common/container/ContractAuthorityContainer"),
    { loading: () => <VLoading /> }
);
const ExternalLinkContainer = dynamic(
    () => import("@/components/common/container/ExternalLinkContainer"),
    { loading: () => <VLoading /> }
);
const RelatedContractContainer = dynamic(
    () => import("@/components/common/container/RelatedContractContainer"),
    { loading: () => <VLoading /> }
);
const ContractSectionContainer = dynamic(
    () => import("@/components/common/container/ContractSectionContainer"),
    { loading: () => <VLoading /> }
);
const WorkflowContainer = dynamic(
    () => import("@/components/common/container/WorkflowContainer"),
    { loading: () => <VLoading /> }
);

/** 新規作成ページ */
const ContractNewPage = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const router = useRouter();
    const [activeStep, setActiveStep] = useState(0);

    const handleBackToList = () => {
        if (activeStep === 0) {
            setIsDialogOpen(true);
            return;
        }
        redirect("/contract-all");
    };

    const handleConfirmBackToList = () => {
        router.push("/contract-all");
        setIsDialogOpen(false);
    };

    // 前のステップ
    const handlePrevious = () => {
        setActiveStep((prevStep: number) => prevStep - 1);
    };

    // 次のステップ
    const handleNext = () => {
        setActiveStep((prevStep: number) => prevStep + 1);
    };

    const handleSkip = () => {
        handleNext;
    };

    const navigateToTopPage = () => {
        redirect("/contract-all");
    };

    const renderComponent = () => {
        switch (activeStep) {
            case 0:
                return (
                    <ContractBasicContainer
                        isEdit={false}
                        contractCode={""}
                        handleNext={handleNext}
                        handlePrevious={handlePrevious}
                    />
                );
            case 1:
                return <ContractFileContainer isEdit={true} />;
            case 2:
                return <TradePartnerCompanyTableContainer />;
            case 3:
                return <ContractDetailsContainer />;
            case 4:
                return <ContractAuthorityContainer />;
            case 5:
                return <ExternalLinkContainer />;
            case 6:
                return <RelatedContractContainer />;
            case 7:
                return <ContractSectionContainer />;
            case 8:
                return <WorkflowContainer />;
        }
    };

    return (
        <>
            {/* 詳細タブ表示(各ドメイン) */}
            {/* タブに応じて新規作成ページを切り替える 契約書情報を一番最初に入力する必要あり */}
            <Card className="flex min-h-screen w-full flex-col bg-muted/40">
                <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-8">
                    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                        <Box className="text-sm font-medium flex justify-between">
                            <Anchor
                                component={Link}
                                onClick={handleBackToList}
                                href={""}
                            >
                                一覧へ戻る
                            </Anchor>
                        </Box>
                        <ContractNewStepper
                            activeStep={activeStep}
                            steps={ContractSteps}
                            setActiveStep={() => setActiveStep}
                        />
                        <Card className="px-4">
                            <Box className="flex items-center justify-between px-4 pb-4">
                                <Title className="text-md font-bold">
                                    新規作成画面
                                </Title>
                            </Box>
                            <Separator />
                            <Box
                                className="overflow-auto mx-2"
                                style={{ maxHeight: "calc(100vh - 200px)" }}
                            >
                                {renderComponent()}
                            </Box>
                        </Card>
                    </main>
                </div>
            </Card>
            <ContractNewConfirmDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onConfirm={handleConfirmBackToList}
            />
        </>
    );
};

export default ContractNewPage;
