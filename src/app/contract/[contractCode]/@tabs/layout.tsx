import React, { ReactNode } from "react";

const Layout = ({
    children,
    // tabs,
}: Readonly<{
    children: ReactNode;
    tabs: ReactNode;
}>) => {
    return <>{children}</>;
};

export default Layout;
