"use client";
import { ContractStep } from "@/app/contract-new/page";
import { Stepper, Box, StepperStep } from "@mantine/core";

interface ContractNewStepperProps {
    activeStep: number;
    steps: ContractStep[];
    setActiveStep: () => void;
}

const ContractNewStepper = ({
    activeStep,
    steps,
    setActiveStep,
}: ContractNewStepperProps) => {
    return (
        <Box className="flex justify-center sm:w-min-full md:w-min-full lg:w-min-full">
            <Stepper
                size="lg"
                active={activeStep}
                onStepClick={setActiveStep}
                classNames={{
                    root: "w-full max-w-full px-10",
                    steps: "flex items-center justify-between",
                    separator: "flex-1 h-0.5 mx-2 bg-gray-300",
                    stepBody: "flex flex-col items-center",
                    stepIcon:
                        "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-200",
                    stepCompletedIcon: "bg-blue-500 text-white",
                }}
            >
                {steps.map((step, index) => (
                    <StepperStep
                        key={index}
                        label={
                            <span className="mt-2 text-sm font-medium text-gray-700">
                                {step.title}
                            </span>
                        }
                        description={
                            <span className="mt-1 text-xs text-gray-500">
                                {step.description}
                            </span>
                        }
                    ></StepperStep>
                ))}
            </Stepper>
        </Box>
    );
};

export default ContractNewStepper;
