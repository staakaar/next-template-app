"use client";

import { useState } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../ui/carousel";

const ContractNewCarousel = () => {
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        { name: "basicInfo", component: "" },
        { name: "fileUpload", component: "" },
    ];

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSkip = () => {
        handleNext();
    };

    // const handleSave = (data: any) => {
    //     setFormData({ ...formData, ...data });
    //     handleNext();
    // };

    return (
        <div>
            <Carousel className="w-full max-w-xs">
                <CarouselContent>
                    {steps.map((step, index) => (
                        <CarouselItem key={step.name}>
                            <div className="p-1"></div>
                        </CarouselItem>
                    ))}
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
        </div>
    );
};

export default ContractNewCarousel;
