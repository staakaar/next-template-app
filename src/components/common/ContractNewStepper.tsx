"use client";
import { ContractStep } from "@/app/contract-new/page";
import { Stepper, Step } from "@/components/ui/stepper";

interface ContractNewStepperProps {
    activeStep: number;
    steps: ContractStep[];
    setActiveStep: (step: number) => void;
}

const ContractNewStepper = ({
    activeStep,
    steps,
    setActiveStep,
}: ContractNewStepperProps) => {
    return (
        <div className="flex justify-center w-full px-10">
            <Stepper
                activeStep={activeStep}
                onStepClick={setActiveStep}
                className="w-full max-w-full"
            >
                {steps.map((step, index) => (
                    <Step
                        key={index}
                        stepNumber={index}
                        label={step.title}
                        description={step.description}
                        isLast={index === steps.length - 1}
                    />
                ))}
            </Stepper>
        </div>
    );
};

export default ContractNewStepper;
