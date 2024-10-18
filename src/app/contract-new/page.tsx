"use client";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { Box, Heading } from "@chakra-ui/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ContractNewStatusStepper from "@/components/common/ContractNewStatusStepper";
import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@chakra-ui/react";
import ContractNewDynamicCarousel from "@/components/common/ContractNewCarousel";
import {
    ContractBasicRequest,
    postContractBasic,
} from "@/lib/contractBasic/api";

export type ContractNewStep = {
    name: String;
    label: String;
};

const CONTRACT_NEW_STEPS: ContractNewStep[] = [
    { name: "ContractBasic", label: "基本情報" },
    { name: "ContractFile", label: "契約書ファイル" },
    { name: "ContractTradeCompany", label: "取引先" },
    { name: "ContractDetails", label: "明細" },
    { name: "ContractAuthority", label: "権限" },
    { name: "RelatedInfo", label: "関連情報" },
    { name: "Section", label: "セクション" },
    { name: "Workflow", label: "ワークフロー" },
];

/** 新規作成ページ */
const ContractNewPage = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const router = useRouter();

    const handleBackToList = () => {
        if (currentStep === 0) {
            console.log("currentStep 0");
            setIsDialogOpen(true);
        } else {
            console.log("aaaa");
            setIsDialogOpen(false);
            navigateToTopPage;
        }
    };

    const handleConfirmBackToList = () => {
        setIsDialogOpen(false);
        router.push("/contract-all");
    };

    // 前のステップ
    const handlePrevious = () => {
        // if (currentStep > 0) {
        //     setCurrentStep(currentStep - 1);
        // }
        setCurrentStep((prev) => Math.max(0, prev - 1));
    };

    // 次のステップ
    const handleNext = () => {
        console.log("handleNext");
        setCurrentStep((prev) =>
            Math.min(CONTRACT_NEW_STEPS.length - 1, prev + 1)
        );
        // if (currentStep < CONTRACT_NEW_STEPS.length - 1) {
        //     setCurrentStep(currentStep + 1);
        // }
    };

    const handleSave = async () => {
        console.log("handleSave");
        // server actionsで登録
        const a = {
            contractCode: "COL000001",
            contractName: "aa",
        } as ContractBasicRequest;

        switch (currentStep) {
            case 0:
                await postContractBasic(a);
                break;
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
            case 4:
                break;
            case 5:
                break;
            case 6:
                break;
            case 7:
                break;
            default:
        }
        // 正常に完了した場合にsetCurrentStep+1する
    };

    const handleSkip = () => {
        console.log("handleSkip");
        setCurrentStep(currentStep + 1);
    };

    const navigateToTopPage = () => {
        redirect("/contract-all");
    };

    return (
        <>
            {/* 詳細タブ表示(各ドメイン) */}
            {/* タブに応じて新規作成ページを切り替える 契約書情報を一番最初に入力する必要あり */}
            <Card className="flex min-h-screen w-full flex-col bg-muted/40">
                <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 sm:mt-10">
                    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                        <Box className="text-sm font-medium flex justify-between">
                            {/* <DialogTrigger asChild> */}
                            <Button onClick={handleBackToList}>
                                <Link href={""}>一覧へ戻る</Link>
                            </Button>
                            {/* </DialogTrigger> */}
                            {/* <Box className="flex items-center space-x-2"> */}
                            {/* 基本情報を保存した瞬間に非表示 */}
                            {/* <Button
                                    onClick={handleSkip}
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded hover:shadow-lg transition-all duration-200"
                                >
                                    スキップ
                                </Button> */}
                            {/* 基本情報とファイルの登録をしている場合は表示 */}
                            {/* <Button
                                    onClick={handleSave}
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded hover:shadow-lg transition-all duration-200"
                                >
                                    登録
                                </Button> */}
                            {/* </Box> */}
                        </Box>
                        <ContractNewStatusStepper />
                        <Card className="px-4 py-4">
                            <Box className="flex items-center justify-between space-y-2 px-8 py-4">
                                <Heading className="text-md font-bold">
                                    新規作成画面
                                </Heading>
                            </Box>
                            <Separator />
                            <ContractNewDynamicCarousel
                                steps={CONTRACT_NEW_STEPS}
                                currentStep={currentStep}
                                handlePrevious={handlePrevious}
                                handleNext={handleNext}
                            />
                        </Card>
                    </main>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <VisuallyHidden>
                                <DialogTitle>
                                    入力した内容は保存されません。よろしいですか？
                                </DialogTitle>
                            </VisuallyHidden>
                            <DialogDescription>
                                入力した内容は保存されません。よろしいですか？
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <DialogFooter>
                                <Button onClick={() => setIsDialogOpen(false)}>
                                    キャンセル
                                </Button>
                            </DialogFooter>
                            <Button onClick={handleConfirmBackToList}>
                                OK
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </Card>
        </>
    );
};

export default ContractNewPage;
