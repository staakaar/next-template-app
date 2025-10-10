"use client";

import * as React from "react";
import { Button as ShadcnButton } from "@/components/ui/button";

export type ButtonProps = React.ComponentProps<typeof ShadcnButton>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    function Button(props, ref) {
        return <ShadcnButton ref={ref} {...props} />;
    }
);

export default Button;
