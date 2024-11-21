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
    <Link href={href} onClick={onClick}>
        {children}
    </Link>
);

export default NavLink;
