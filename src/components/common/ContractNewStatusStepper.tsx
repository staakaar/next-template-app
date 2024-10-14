"use client";
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

const ContractSteps = [
    { title: "1", description: "基本情報" },
    { title: "2", description: "ファイル" },
    { title: "3", description: "明細" },
    { title: "4", description: "セクション" },
    { title: "5", description: "自社" },
    { title: "6", description: "WF" },
    { title: "7", description: "権限" },
];

const ContractNewStatusStepper = () => {
    const { activeStep } = useSteps({
        index: 1,
        count: ContractSteps.length,
    });

    return (
        <Box className="flex justify-center sm:w-min-full md:w-min-full lg:w-min-full mt-4">
            <Stepper size="lg" index={activeStep}>
                {ContractSteps.map((step, index) => (
                    <Step key={index}>
                        <StepIndicator className="bg-blue-500 hover:bg-blue-600 text-white font-bold">
                            <StepStatus
                                complete={<StepIcon />}
                                incomplete={<StepNumber />}
                                active={<StepNumber />}
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

export default ContractNewStatusStepper;
