import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface LinksGroupProps {
    icon: React.FC<{ className?: string }>;
    label: string;
    initiallyOpened?: boolean;
    links?: { label: string; link: string }[];
}

export function LinksGroup({
    icon: Icon,
    label,
    initiallyOpened,
    links,
}: LinksGroupProps) {
    const hasLinks = Array.isArray(links);
    const [opened, setOpened] = useState(initiallyOpened || false);
    const items = (hasLinks ? links : []).map((link) => (
        <Link
            key={link.label}
            href={link.link}
            className="block px-3 py-2 ml-8 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 border-l border-gray-200"
            onClick={(event) => event.preventDefault()}
        >
            {link.label}
        </Link>
    ));

    return (
        <Collapsible open={opened} onOpenChange={setOpened}>
            <CollapsibleTrigger asChild>
                <Button
                    variant="ghost"
                    className="w-full justify-between p-3 font-medium text-sm hover:bg-gray-50"
                >
                    <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-md">
                            <Icon className="w-4 h-4" />
                        </div>
                        <span>{label}</span>
                    </div>
                    {hasLinks && (
                        <ChevronRight
                            className={`w-4 h-4 transition-transform ${
                                opened ? "rotate-90" : ""
                            }`}
                        />
                    )}
                </Button>
            </CollapsibleTrigger>
            {hasLinks && (
                <CollapsibleContent className="space-y-1">
                    {items}
                </CollapsibleContent>
            )}
        </Collapsible>
    );
}

export function NavigationLinksGroup(item: LinksGroupProps) {
    return (
        <div className="p-4">
            <LinksGroup {...item} />
        </div>
    );
}
