import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

export const i18n = {
    defaultLocale: "ja",
    locales: ["ja", "en"],
} as const;

export type Locale = (typeof i18n)["locales"][number];

function getLocale(request: NextRequest): string | undefined {
    // Negotiator expects plain object so we need to transform headers
    const negotiatorHeaders: Record<string, string> = {};
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

    // @ts-ignore locales are readonly
    const locales: string[] = i18n.locales;

    // Use negotiator and intl-localematcher to get best locale
    let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
        locales
    );

    const locale = matchLocale(languages, locales, i18n.defaultLocale);

    return locale;
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    console.log("🔥");
    const pathnameHasLocale = i18n.locales.some(
        (locale) =>
            pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) return;

    console.log("🔥🔥");
    // Redirect if there is no locale
    const locale = getLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname}`;
    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(request.nextUrl);
    // // `/_next/` and `/api/` are ignored by the watcher, but we need to ignore files in `public` manually.
    // // If you have one
    // if (
    //   [
    //     '/manifest.json',
    //     '/favicon.ico',
    //     // Your other files in `public`
    //   ].includes(pathname)
    // )
    //   return

    // // Check if there is any supported locale in the pathname
    // const pathnameIsMissingLocale = i18n.locales.every(
    //     (locale) =>
    //         !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    // );

    // // Redirect if there is no locale
    // if (pathnameIsMissingLocale) {
    //     const locale = getLocale(request);

    //     // e.g. incoming request is /products
    //     // The new URL is now /en-US/products
    //     return NextResponse.redirect(
    //         new URL(
    //             `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
    //             request.url
    //         )
    //     );
    // }
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
