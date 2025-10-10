"use client";

import React from "react";
import { ThemeProvider } from "@/components/theme-provider";

export function UIProviders({ children }: { children: React.ReactNode }) {
    return <ThemeProvider>{children}</ThemeProvider>;
}
