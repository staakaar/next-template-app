"use client";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { Box, Heading } from "@chakra-ui/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ContractNewStatusStepper from "@/components/common/ContractNewStatusStepper";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../../components/ui/carousel";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@chakra-ui/react";
import ContractNewDynamicCarousel from "@/components/common/ContractNewCarousel";

const CONTRACT_NEW_STEPS = [
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
            setIsDialogOpen(true);
        } else {
            console.log("一覧へ");
            // router.push("/contract-all");
        }
    };

    const handleConfirmBackToList = () => {
        setIsDialogOpen(false);
        router.push("/contract-all");
    };

    // 前のステップ
    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    // 次のステップ
    const handleNext = () => {
        if (currentStep < CONTRACT_NEW_STEPS.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    console.log("***currentStep***", currentStep);
    console.log("***isDialogOpen***", isDialogOpen);

    return (
        <>
            {/* 詳細タブ表示(各ドメイン) */}
            {/* タブに応じて新規作成ページを切り替える 契約書情報を一番最初に入力する必要あり */}
            <Card className="flex min-h-screen w-full flex-col bg-muted/40">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 sm:mt-10">
                        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                            <Box className="text-sm font-medium flex justify-between">
                                <DialogTrigger asChild>
                                    <Button onClick={handleBackToList}>
                                        <Link href={""}>一覧へ戻る</Link>
                                    </Button>
                                </DialogTrigger>
                                <Box className="flex items-center space-x-2">
                                    {/* 基本情報を保存した瞬間に非表示 */}
                                    <Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded hover:shadow-lg transition-all duration-200">
                                        スキップ
                                    </Button>
                                    {/* 基本情報とファイルの登録をしている場合は表示 */}
                                    <Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded hover:shadow-lg transition-all duration-200">
                                        登録
                                    </Button>
                                </Box>
                            </Box>
                            <ContractNewStatusStepper />
                            <Card className="px-4 py-4">
                                <Box className="flex items-center justify-between space-y-2 px-8 py-4">
                                    <Heading className="text-md font-bold">
                                        新規作成画面
                                    </Heading>
                                </Box>
                                <Separator />
                                <Box
                                    className="overflow-auto"
                                    style={{ maxHeight: "calc(100vh - 200px)" }}
                                >
                                    <ContractNewDynamicCarousel
                                        steps={CONTRACT_NEW_STEPS}
                                        currentStep={currentStep}
                                        handlePrevious={handlePrevious}
                                        handleNext={handleNext}
                                    />
                                </Box>
                            </Card>
                        </main>
                    </div>
                    {/* {isDialogOpen && ( */}
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
                    {/* )} */}
                </Dialog>
            </Card>
        </>
    );
};

export default ContractNewPage;
