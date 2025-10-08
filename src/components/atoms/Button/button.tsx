"use client";

import {
    Button as MantineButton,
    type ButtonProps as MantineButtonProps,
} from "@mantine/core";
import React from "react";

export type ButtonProps = MantineButtonProps;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    function Button(
        {
            variant = "filled",
            size = "md",
            color = "blue",
            radius = "sm",
            children,
            ...rest
        },
        ref
    ) {
        return (
            <MantineButton
                ref={ref}
                variant={variant}
                size={size}
                color={color}
                radius={radius}
                {...rest}
            >
                {children}
            </MantineButton>
        );
    }
);

export default Button;
