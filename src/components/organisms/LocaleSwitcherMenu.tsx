"use client";

import { useTransition } from "react";
import { setUserLocale } from "@/app/i18n/locale";
import { Locale } from "@/app/i18n/config";
import {
    Menu,
    MenuDropdown,
    MenuItem,
    MenuTarget,
    UnstyledButton,
} from "@mantine/core";
import { IconCheck, IconLanguage } from "@tabler/icons-react";

interface Props {
    defaultValue: string;
    items: Array<{ value: string; label: string }>;
    label: string;
}

export default function LocaleSwitcherMenu({
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
        <Menu position="bottom-end" width="target" withinPortal>
            <MenuTarget>
                <UnstyledButton
                    className="p-2 rounded-sm transition-colors hover:bg-gray-200 disabled:opacity-60 disabled:pointer-events-none"
                    aria-label={label}
                    disabled={isPending}
                >
                    <IconLanguage className="w-6 h-6 text-gray-600 hover:text-gray-900" />
                </UnstyledButton>
            </MenuTarget>

            <MenuDropdown className="min-w-[8rem] py-1">
                {items.map((item) => (
                    <MenuItem
                        key={item.value}
                        onClick={() => onChange(item.value)}
                        leftSection={
                            item.value === defaultValue ? (
                                <IconCheck className="w-5 h-5 text-gray-600" />
                            ) : (
                                <div className="w-5" />
                            )
                        }
                    >
                        {item.label}
                    </MenuItem>
                ))}
            </MenuDropdown>
        </Menu>
    );
}
