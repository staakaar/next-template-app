import { useLocale, useTranslations } from "next-intl";
import LocaleSwitcherSelect from "./LocaleSwitcherSelect";

const LocaleSwitcher = () => {
    const t = useTranslations("LocaleSwitcher");
    const locale = useLocale();

    const items = [
        { value: "en", label: t("en") },
        { value: "ja", label: t("ja") },
    ];

    return (
        <LocaleSwitcherSelect
            defaultValue={locale}
            items={items}
            label={t("label")}
        />
    );
};

export default LocaleSwitcher;
