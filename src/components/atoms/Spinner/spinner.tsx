"use client";
import React from "react";
import { Spinner, Center, CenterProps, SpinnerProps } from "@chakra-ui/react";

interface CustomSpinnerProps extends SpinnerProps {
    fullScreen?: boolean;
    containerProps?: CenterProps;
}

const VSpinner: React.FC<CustomSpinnerProps> = ({
    size = "xl",
    color = "blue.500",
    thickness = "4px",
    speed = "0.65s",
    fullScreen = false,
    containerProps,
    ...props
}) => {
    const spinner = (
        <Spinner
            size={size}
            color={color}
            thickness={thickness}
            speed={speed}
            {...props}
        />
    );

    if (fullScreen) {
        return (
            <Center
                position="fixed"
                top={0}
                left={0}
                right={0}
                bottom={0}
                bg="rgba(255, 255, 255, 0.8)"
                zIndex={9999}
                {...containerProps}
            >
                {spinner}
            </Center>
        );
    }

    return <Center {...containerProps}>{spinner}</Center>;
};

export default VSpinner;
