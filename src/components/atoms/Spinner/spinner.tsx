"use client";
import React from "react";

type SpinnerProps = {
    size?: number;
    className?: string;
    fullScreen?: boolean;
};

const Spinner: React.FC<SpinnerProps> = ({
    size = 24,
    className,
    fullScreen,
}) => {
    const el = (
        <svg
            className={`animate-spin text-muted-foreground ${className ?? ""}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            width={size}
            height={size}
            role="img"
            aria-label="Loading"
        >
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
            />
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
        </svg>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 z-[9999] grid place-items-center bg-white/80">
                {el}
            </div>
        );
    }
    return <div className="inline-flex items-center justify-center">{el}</div>;
};

export default Spinner;
