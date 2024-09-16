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
    { title: "1", description: "契約書作成中" },
    { title: "2", description: "内部承認中" },
    { title: "3", description: "発行済み" },
    { title: "4", description: "締結" },
];

const ContractStatusStepper = () => {
    const { activeStep } = useSteps({
        index: 1,
        count: ContractSteps.length,
    });

    return (
        <Stepper size="lg" index={activeStep}>
            {ContractSteps.map((step, index) => (
                <Step key={index}>
                    <StepIndicator>
                        <StepStatus
                            complete={<StepIcon />}
                            incomplete={<StepNumber />}
                            active={<StepNumber />}
                        />
                    </StepIndicator>

                    <Box flexShrink="0">
                        <StepTitle>{step.title}</StepTitle>
                        <StepDescription>{step.description}</StepDescription>
                    </Box>

                    <StepSeparator />
                </Step>
            ))}
        </Stepper>
    );
};

export default ContractStatusStepper;
