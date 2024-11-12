import "@mantine/core/styles.css";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { MantineProviders } from "./providers";
import { cn } from "@/lib/utils";
import "./globals.css";
import React from "react";
import Header from "@/components/organisms/Header";
import { RecoilRootProvider } from "./recoil";
import "@mantine/core/styles.css";
import { ColorSchemeScript } from "@mantine/core";
import SideMenu from "@/components/organisms/SideMenu";
import { i18n, Locale } from "../../../middleware";
import { dir } from "i18next";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});

export async function generateStaticParams() {
    return i18n.locales.map((locale) => ({ lang: locale }));
}

export const metadata: Metadata = {
    title: "Contract",
    description: "contract app",
};

export default function RootLayout({
    children,
    params: { lang },
}: Readonly<{
    children: React.ReactNode;
    params: { lang: Locale };
}>) {
    return (
        <html lang={lang} dir={dir(lang)} suppressHydrationWarning>
            <head>
                <meta charSet="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
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
