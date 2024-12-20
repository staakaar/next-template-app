import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
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
import SideMenu from "@/components/organisms/ContractSideMenu/ContractSideMenu";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});

// export async function generateStaticParams() {
//     return i18n.locales.map((locale) => ({ lang: locale }));
// }

export const metadata: Metadata = {
    title: "Contract",
    description: "contract app",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const locale = await getLocale();

    const messages = await getMessages();

    return (
        <html lang={locale} suppressHydrationWarning>
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
                <NextIntlClientProvider messages={messages}>
                    <MantineProviders>
                        <Header />
                        <SideMenu />

                        {children}
                    </MantineProviders>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
