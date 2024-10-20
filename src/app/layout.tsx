import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { Providers } from "./providers";
import { cn } from "@/lib/utils";
import "./globals.css";
import React from "react";
import Header from "@/components/organisms/Header";
import { RecoilRootProvider } from "@/app/recoil";
import { TooltipProvider } from "@/components/ui/tooltip";
import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const metadata: Metadata = {
    title: "Contract",
    description: "contract app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ja" suppressHydrationWarning>
            <head>
                <ColorSchemeScript />
            </head>
            <body
                className={cn(
                    "min-h-screen bg-background font-sans antialiased",
                    fontSans.variable
                )}
            >
                <MantineProvider>
                    <RecoilRootProvider>
                        <TooltipProvider>
                            <Header />
                            <Providers>{children}</Providers>
                        </TooltipProvider>
                    </RecoilRootProvider>
                </MantineProvider>
            </body>
        </html>
    );
}
