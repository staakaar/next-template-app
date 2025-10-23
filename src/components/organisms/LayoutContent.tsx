"use client";

export default function LayoutContent({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="flex-1 overflow-auto">
            {children}
        </main>
    );
}
