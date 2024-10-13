import Link from "next/link";
import { ReactNode } from "react";
import React from "react";

export type NavLinkProps = {
    href: string;
    children: ReactNode;
    isActive: boolean;
    onClick: React.MouseEventHandler<HTMLAnchorElement>;
};

const NavLink = ({ href, children, isActive, onClick }: NavLinkProps) => (
    <Link
        href={href}
        className={`hover:text-blue-800 focus:text-blue-800 focus:ring-offset-2 transition-all duration-200 inline-flex items-center whitespace-nowrap py-2 ml-4 ${
            isActive ? "text-blue-800 font-bold" : ""
        }`}
        onClick={onClick}
    >
        {children}
    </Link>
);

export default NavLink;
