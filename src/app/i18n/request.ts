import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
    const locale = "ja";

    return {
        locale,
        messages: (await import(`../../locales//${locale}.json`)).default,
    };
});

/**
    以下、i18nの構造
    第一階層・・・ページごとに区分け
    第二階層・・・ドメイン、見出しごとに区分け
    第三階層・・・各パーツごとの文言
 */
