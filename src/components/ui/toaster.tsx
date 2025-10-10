"use client";

import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

export function Toaster({ theme = "system", ...props }: ToasterProps) {
    return (
        <Sonner
            theme={theme}
            richColors
            closeButton
            position="top-center"
            toastOptions={{
                classNames: {
                    toast: "bg-background border",
                },
            }}
            {...props}
        />
    );
}
