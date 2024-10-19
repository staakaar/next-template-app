"use client";
import { ContractStep } from "@/app/contract-new/page";
import {
    Box,
    Step,
    StepDescription,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    useSteps,
} from "@chakra-ui/react";

export type ContractNewStepperProps = {
    activeStep: number;
    steps: ContractStep[];
};

const ContractNewStepper = ({ activeStep, steps }: ContractNewStepperProps) => {
    return (
        <Box className="flex justify-center sm:w-min-full md:w-min-full lg:w-min-full">
            <Stepper size="lg" index={activeStep}>
                {steps.map((step, index) => (
                    <Step key={index}>
                        <StepIndicator>
                            <StepStatus
                                complete={<StepIcon />}
                                incomplete={<StepNumber />}
                                active={
                                    <Box
                                        as="span"
                                        className={`flex items-center justify-center w-full h-full rounded-full ${
                                            index === activeStep
                                                ? "bg-blue-500 text-white"
                                                : "bg-gray-200 text-gray-600"
                                        }`}
                                    >
                                        {index + 1}
                                    </Box>
                                }
                            />
                        </StepIndicator>

                        <Box flexShrink="0" className="mx-6">
                            <StepTitle>{step.title}</StepTitle>
                            <StepDescription>
                                {step.description}
                            </StepDescription>
                        </Box>

                        <StepSeparator />
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
};

export default ContractNewStepper;
