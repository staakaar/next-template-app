"use client";
import { useState } from "react";
import { Stepper, Box, StepperStep } from "@mantine/core";
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
        <Box className="flex justify-center sm:w-min-full md:w-min-full lg:w-min-full mt-4">
            <Stepper
                size="sm"
                color="blue"
                active={activeStep}
                styles={(theme) => ({
                    root: {
                        padding: "0 1rem",
                        "@media (minWidth: 768px)": {
                            padding: "0 2rem",
                        },
                    },
                    // separator: {
                    // marginLeft: theme.spacing.xl,
                    // marginRight: theme.spacing.xl,
                    // },
                    step: {
                        padding: theme.spacing.sm,
                    },
                    stepIcon: {
                        borderWidth: 0,
                        backgroundColor: !activeStep
                            ? theme.colors.blue[6]
                            : undefined,
                        color: !activeStep ? theme.white : undefined,
                        "&[dataCompleted]": {
                            backgroundColor: theme.colors.blue[6],
                            color: theme.white,
                        },
                    },
                    stepLabel: {
                        fontSize: theme.fontSizes.sm,
                        fontWeight: 500,
                    },
                    stepDescription: {
                        fontSize: theme.fontSizes.xs,
                        marginTop: theme.spacing.xs,
                        color: theme.colors.gray[6],
                    },
                })}
            >
                {ContractSteps.map((step, index) => (
                    <StepperStep
                        key={index}
                        // label={step.title}
                        description={step.description}
                    />
                ))}
            </Stepper>
        </Box>
    );
};

export default ContractStatusStepper;
