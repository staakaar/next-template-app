import { createInstance } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";
import { i18n, Locale } from "../../../middleware";

const initI18next = async (lang: Locale, ns: any) => {
    const i18nInstance = createInstance();
    await i18nInstance
        .use(initReactI18next)
        .use(
            resourcesToBackend(
                (language: string, namespace: string) =>
                    import(`../../locales/${language}/${namespace}.json`)
            )
        )
        .init(getOptions(lang, ns));
    return i18nInstance;
};

export async function useTranslation(lang: Locale, ns: any, options = {}) {
    const i18nextInstance = await initI18next(lang, ns);
    return {
        t: i18nextInstance.getFixedT(lang, Array.isArray(ns) ? ns[0] : ns),
        i18n: i18nextInstance,
    };
}

const getOptions = (lang = i18n.defaultLocale, ns = "translation") => {
    return {
        supportedLnaguages: i18n.locales,
        fallBackLnaguage: i18n.defaultLocale,
        lang,
        fallBackNS: "translation",
        defaultNS: "translation",
        ns,
    };
};
