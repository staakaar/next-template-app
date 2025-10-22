"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function LayoutContent({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isTopPage = pathname === "/";

    return (
        <main
            className={cn(
                "transition-all duration-300",
                isTopPage && "ml-64"
            )}
        >
            {children}
        </main>
    );
}
