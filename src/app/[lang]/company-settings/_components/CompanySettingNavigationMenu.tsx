"use client";

import { NavLink, Stack } from "@mantine/core";

interface NavItem {
    label: string;
    path: string;
}

interface NavMenuProps {
    activeItem?: string;
    items: NavItem[];
    handleNavClick: (path: string) => void;
}

const CompanySettingNavigationMenu = ({
    activeItem,
    items,
    handleNavClick,
}: NavMenuProps) => {
    return (
        <Stack w={250}>
            {items.map((item) => (
                <NavLink
                    key={item.path}
                    label={item.label}
                    active={activeItem === item.path}
                    onClick={() => {
                        handleNavClick(item.path);
                    }}
                    styles={{
                        root: {
                            borderRadius: "4px",
                            padding: "8px 12px",
                            "&[dataActive]": {
                                backgroundColor: "var(--mantine-color-blue-1)",
                                color: "var(--mantine-color-blue-7)",
                                fontWeight: 500,
                                "&:hover": {
                                    backgroundColor:
                                        "var(--mantine-color-blue-2)",
                                },
                            },
                            "&:hover": {
                                backgroundColor: "var(--mantine-color-gray-0)",
                            },
                        },
                    }}
                />
            ))}
        </Stack>
    );
};

export default CompanySettingNavigationMenu;
