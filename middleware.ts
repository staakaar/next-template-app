import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import acceptLanguage from "accept-language";

export const i18n = {
    defaultLocale: "ja",
    locales: ["ja", "en"],
};
const cookieName = "i18next";

export type Locale = (typeof i18n)["locales"][number];

acceptLanguage.languages(i18n.locales);

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
    let lang;
    // if (request.cookies.has(cookieName))
    //     lang = acceptLanguage.get(request.cookies.get(cookieName)?.value);

    if (!lang)
        lang = acceptLanguage.get(request.headers.get("Accept-language"));
    if (!lang) lang = i18n.defaultLocale;

    if (
        !i18n.locales.some((locale) =>
            request.nextUrl.pathname.startsWith(`/${locale}/`)
        ) &&
        !request.nextUrl.pathname.startsWith("/_next")
    ) {
        return NextResponse.redirect(
            new URL(`/${lang}/${request.nextUrl.pathname}`, request.url)
        );
    }

    const segments = pathname.split("/").filter(Boolean);
    const firstSegment = segments[0];

    // 既に正しい形式のパスの場合はスキップ
    if (
        i18n.locales.includes(firstSegment as any) &&
        segments[1] === "contract-all"
    ) {
        return NextResponse.next();
    }

    if (request.headers.has("referer")) {
        const referer = new URL(request.headers.get("referer") as string);
        const refererWithLang = i18n.locales.find((locale) =>
            referer.pathname.startsWith(`/${locale}/`)
        );
        const response = NextResponse.next();
        if (refererWithLang) response.cookies.set(cookieName, refererWithLang);

        return response;
    }

    return NextResponse.next();

    // const pathnameHasLocale = i18n.locales.some(
    //     (locale) =>
    //         pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    // );

    // if (pathnameHasLocale) return;

    // const locale = getLocale(request);
    // request.nextUrl.pathname = `/${locale}${pathname}`;

    // return NextResponse.redirect(request.nextUrl);
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
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)"],
};
