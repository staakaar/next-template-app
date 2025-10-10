"use client";
import * as React from "react";
import { Input } from "@/components/ui/input";

export interface TextFieldProps
    extends React.InputHTMLAttributes<HTMLInputElement> {}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
    function TextField(props, ref) {
        return <Input ref={ref} {...props} />;
    }
);

export default TextField;
