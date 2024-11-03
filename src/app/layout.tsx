import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { MantineProviders } from "./providers";
import { cn } from "@/lib/utils";
import "./globals.css";
import React from "react";
import Header from "@/components/organisms/Header";
import { RecoilRootProvider } from "@/app/recoil";
import "@mantine/core/styles.css";
import { ColorSchemeScript } from "@mantine/core";
import SideMenu from "@/components/organisms/SideMenu";

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
                <MantineProviders>
                    <RecoilRootProvider>
                        <Header />
                        <SideMenu />

                        {children}
                    </RecoilRootProvider>
                </MantineProviders>
            </body>
        </html>
    );
}
