"use client";
import { useState } from "react";
import { Stepper, Box, StepperStep } from "@mantine/core";

const ContractSteps = [
    { title: "1", description: "契約書作成中" },
    { title: "2", description: "内部承認中" },
    { title: "3", description: "発行済み" },
    { title: "4", description: "締結" },
];

const ContractStatusStepper = () => {
    const [activeStep] = useState(1);

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
                    separator: {
                        marginLeft: theme.spacing.xl,
                        marginRight: theme.spacing.xl,
                    },
                    step: {
                        padding: theme.spacing.md,
                    },
                    stepIcon: {
                        borderWidth: 0,
                        backgroundColor: activeStep
                            ? theme.colors.blue[6]
                            : undefined,
                        color: activeStep ? theme.white : undefined,
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
                        label={step.title}
                        description={step.description}
                    />
                ))}
            </Stepper>
        </Box>
    );
};

export default ContractStatusStepper;
