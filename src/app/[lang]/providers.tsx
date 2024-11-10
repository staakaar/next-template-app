"use client";

import React from "react";
import { MantineProvider } from "@mantine/core";
import theme from "@/styles/theme";

export function MantineProviders({ children }: { children: React.ReactNode }) {
    return <MantineProvider theme={theme}>{children}</MantineProvider>;
}
