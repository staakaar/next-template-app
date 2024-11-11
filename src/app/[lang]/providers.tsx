"use client";

import React from "react";
import { MantineProvider } from "@mantine/core";
import theme from "@/styles/theme";
import "@mantine/core/styles.css";

export function MantineProviders({ children }: { children: React.ReactNode }) {
    return (
        <MantineProvider theme={theme} defaultColorScheme="light">
            {children}
        </MantineProvider>
    );
}
