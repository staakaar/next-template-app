"use client";

import { Select } from "@mantine/core";
import { IconLanguage } from "@tabler/icons-react";
import { useTransition } from "react";
import { setUserLocale } from "@/app/i18n/locale";
import { Locale } from "@/app/i18n/config";

interface Props {
    defaultValue: string;
    items: Array<{ value: string; label: string }>;
    label: string;
}

export default function LocaleSwitcherSelect({
    defaultValue,
    items,
    label,
}: Props) {
    const [isPending, startTransition] = useTransition();

    function onChange(value: string) {
        const locale = value as Locale;
        startTransition(() => {
            setUserLocale(locale);
        });
    }

    return (
        <Select
            defaultValue={defaultValue}
            onChange={(value: string | null) => {
                if (value !== null) {
                    onChange(value);
                }
            }}
            data={items}
            label={label}
            leftSection={<IconLanguage size="1.2rem" />}
            disabled={isPending}
            styles={(theme) => ({
                input: {
                    "&:hover": {
                        backgroundColor: theme.colors.gray[1],
                    },
                },
                item: {
                    "&[data-selected]": {
                        "&, &:hover": {
                            backgroundColor: theme.colors.blue[1],
                            color: theme.colors.blue[9],
                        },
                    },
                },
            })}
            classNames={{
                root: "min-w-[8rem]",
                input: "rounded-sm p-2 transition-colors",
                dropdown: "bg-white py-1 shadow-md rounded-sm",
                item: "flex items-center px-3 py-2 text-base cursor-pointer",
            }}
        />
    );
}
