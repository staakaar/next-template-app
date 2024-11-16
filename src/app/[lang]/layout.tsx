import { MantineProviders } from "./providers";
import { ColorSchemeScript } from "@mantine/core";
import "@mantine/core/styles.layer.css";
import "mantine-datatable/styles.layer.css";
import "./globals.css";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import React from "react";
import Header from "@/components/organisms/Header";
import { RecoilRootProvider } from "./recoil";
import SideMenu from "@/components/organisms/ContractSideMenu/ContractSideMenu";
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
    params,
}: Readonly<{
    children: React.ReactNode;
    params: any;
}>) {
    const { lang }: any = React.use(params);
    return (
        <html lang={lang} dir={dir(lang)} suppressHydrationWarning>
            <head>
                <meta charSet="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <ColorSchemeScript defaultColorScheme="light" />
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
