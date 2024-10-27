"use client";

import React from "react";
import { MantineProvider } from "@mantine/core";
// import customTheme from "@/styles/theme";

export function MantineProviders({ children }: { children: React.ReactNode }) {
    return <MantineProvider>{children}</MantineProvider>;
}
