"use client";
import { useState } from "react";
import { Stepper, Step } from "@/components/ui/stepper";
import { useContractBasicStore } from "@/stores/contractBasic/ContractBasicStore";

const ContractSteps = [
    { title: 0, description: "下書き" },
    { title: 1, description: "契約書作成中" },
    { title: 2, description: "契約書作成済" },
    { title: 3, description: "発行済み" },
    { title: 4, description: "内部承認中" },
    { title: 5, description: "内部承認済" },
    { title: 6, description: "完了" },
    { title: 7, description: "締結" },
];

const ContractStatusStepper = () => {
    const { contractBasic } = useContractBasicStore();
    const contractStatus = Number(contractBasic.status);
    const [activeStep, setActiveStep] = useState(
        [0, 1, 2, 3, 4, 5, 6, 7].includes(contractStatus) ? contractStatus : 0
    );

    return (
        <div className="flex justify-center w-full mt-4 px-4 md:px-8">
            <Stepper activeStep={activeStep} className="w-full max-w-6xl">
                {ContractSteps.map((step, index) => (
                    <Step
                        key={index}
                        stepNumber={index}
                        description={step.description}
                        isLast={index === ContractSteps.length - 1}
                    />
                ))}
            </Stepper>
        </div>
    );
};

export default ContractStatusStepper;
