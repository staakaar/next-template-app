"use client";

import { Check, Languages } from "lucide-react";
import { useTransition } from "react";
import { Locale } from "@/app/i18n/config";
import { setUserLocale } from "@/app/i18n/locale";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9"
                    aria-label={label}
                    disabled={isPending}
                >
                    <Languages className="h-5 w-5" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="min-w-[8rem]">
                {items.map((item) => (
                    <DropdownMenuItem
                        key={item.value}
                        onClick={() => onChange(item.value)}
                        className="flex items-center space-x-2"
                    >
                        {item.value === defaultValue ? (
                            <Check className="h-4 w-4" />
                        ) : (
                            <div className="h-4 w-4" />
                        )}
                        <span>{item.label}</span>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
