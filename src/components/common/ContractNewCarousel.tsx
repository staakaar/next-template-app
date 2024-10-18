"use client";

import { ComponentType, Suspense } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../ui/carousel";
import dynamic from "next/dynamic";
import { ContractNewStep } from "@/app/contract-new/page";
import { Box } from "@chakra-ui/react";

export type StepComponent = {
    ContractBasic: ComponentType<{}>;
    ContractFile: ComponentType<{}>;
    ContractTradeCompany: ComponentType<{}>;
    ContractDetails: ComponentType<{}>;
    ContractAuthority: ComponentType<{}>;
    ExternalLink: ComponentType<{}>;
    RelatedInfo: ComponentType<{}>;
    Section: ComponentType<{}>;
    Workflow: ComponentType<{}>;
};

// 動的にインポートするコンポーネントを定義
const StepComponents: StepComponent = {
    ContractBasic: dynamic(
        () => import("@/components/common/container/ContractBasicContainer")
    ),
    ContractFile: dynamic(
        () => import("@/components/common/container/ContractFileContainer")
    ),
    ContractTradeCompany: dynamic(
        () =>
            import(
                "@/components/common/container/tradePartner/TradePartnerCompanyTableContainer"
            )
    ),
    ContractDetails: dynamic(
        () =>
            import(
                "@/components/common/container/contractDetails/ContractDetailsContainer"
            )
    ),
    ContractAuthority: dynamic(
        () => import("@/components/common/container/ContractAuthorityContainer")
    ),
    ExternalLink: dynamic(
        () => import("@/components/common/container/ExternalLinkContainer")
    ),
    RelatedInfo: dynamic(
        () => import("@/components/common/container/RelatedContractContainer")
    ),
    Section: dynamic(
        () => import("@/components/common/container/ContractSectionContainer")
    ),
    Workflow: dynamic(
        () => import("@/components/common/container/WorkflowContainer")
    ),
    // 他のステップも同様に追加
};

// ローディングコンポーネント
const LoadingFallback = () => <div>Loading...</div>;

// エラーフォールバックコンポーネント
const ErrorFallback = ({ error }) => (
    <div>
        <h2>エラーが発生しました</h2>
        <p>{error.message}</p>
    </div>
);

export type ContractNewDynamicCarouselProps = {
    steps: ContractNewStep[];
    currentStep: number;
    handlePrevious: () => void;
    handleNext: () => void;
};

const ContractNewDynamicCarousel = ({
    steps,
    currentStep,
    handlePrevious,
    handleNext,
}: ContractNewDynamicCarouselProps) => {
    return (
        <>
            <Box
                className="overflow-auto"
                style={{ maxHeight: "calc(100vh - 200px)" }}
            >
                <Carousel className="w-full xs:max-w-[300px] md:max-w-[500px] xl:max-w-[1200px] mx-auto">
                    {currentStep > 0 && <CarouselPrevious />}
                    <CarouselContent>
                        {/* <CarouselPrevious /> */}
                        {steps.map((step: any, index: number) => {
                            const StepComponent = StepComponents[step.name];
                            return (
                                <CarouselItem key={step.name}>
                                    <div className="p-1 w-full">
                                        <Suspense
                                            fallback={<LoadingFallback />}
                                        >
                                            <StepComponent
                                                isActive={index === currentStep}
                                                onNext={handleNext}
                                                onPrevious={handlePrevious}
                                                isEdit={false}
                                            />
                                        </Suspense>
                                    </div>
                                </CarouselItem>
                            );
                        })}
                    </CarouselContent>
                    {currentStep < steps.length - 1 && <CarouselNext />}
                </Carousel>
            </Box>
        </>
    );
};

export default ContractNewDynamicCarousel;
