"use client";

import { Suspense } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../ui/carousel";
import dynamic from "next/dynamic";

// 動的にインポートするコンポーネントを定義
const StepComponents = {
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

const ContractNewDynamicCarousel = ({
    steps,
    currentStep,
    handlePrevious,
    handleNext,
}: any) => {
    return (
        <>
            <Carousel className="w-full max-w-xs">
                <CarouselContent>
                    {steps.map((step: any, index: number) => {
                        const StepComponent = StepComponents[step.name];
                        return (
                            <CarouselItem key={step.name}>
                                <div className="p-1 w-full">
                                    <Suspense fallback={<LoadingFallback />}>
                                        <StepComponent
                                            isActive={index === currentStep}
                                        />
                                    </Suspense>
                                </div>
                            </CarouselItem>
                        );
                    })}
                </CarouselContent>
                {currentStep > 0 && (
                    <CarouselPrevious onClick={handlePrevious} />
                )}
                {currentStep < steps.length - 1 && (
                    <CarouselNext
                        onClick={handleNext}
                        disabled={currentStep === 0}
                    />
                )}
            </Carousel>
        </>
    );
};

export default ContractNewDynamicCarousel;
