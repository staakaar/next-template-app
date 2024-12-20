"use client";

import { useEffect, useRef, useState } from "react";
import { Drawer, ScrollArea, Title, Box } from "@mantine/core";
import { IconNotes, IconCalendarStats } from "@tabler/icons-react";
import classes from "./ContractSideMenu.module.css";
import { useViewportSize } from "@mantine/hooks";
import { NavigationLinksGroup } from "../NavigationLinksGroup/NavigationLinksGroup";

const contractMenu = [
    {
        label: "管理メニュー",
        icon: IconNotes,
        initiallyOpened: true,
        links: [
            { label: "契約書一覧", link: "/contract-all" },
            { label: "契約書【A】", link: "/" },
            { label: "契約書【B】", link: "/" },
            { label: "WF", link: "/workflow-all" },
        ],
    },
    {
        label: "設定メニュー",
        icon: IconCalendarStats,
        initiallyOpened: true,
        links: [
            { label: "デフォルト", link: "/" },
            { label: "セクション", link: "/" },
            { label: "帳票", link: "/" },
            { label: "個人設定", link: "/user-settings" },
            { label: "会社設定", link: "/company-settings" },
        ],
    },
];

const SideMenu = () => {
    const links = contractMenu.map((item) => (
        <NavigationLinksGroup {...item} key={item.label} />
    ));
    const [drawerOpened, setDrawerOpened] = useState(false);
    const { width } = useViewportSize();
    const sidebarTriggerRef = useRef<HTMLDivElement>(null);

    // サイドバートリガーエリアの設定
    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            // デスクトップサイズでのみ有効
            if (width >= 768) {
                if (event.clientX <= 20 && !drawerOpened) {
                    setDrawerOpened(true);
                }
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [width, drawerOpened]);

    // ドロワーが開いているときのマウス位置監視
    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            if (drawerOpened && event.clientX > 300) {
                // ドロワーの幅に応じて調整
                setDrawerOpened(false);
            }
        };

        if (drawerOpened) {
            window.addEventListener("mousemove", handleMouseMove);
        }

        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [drawerOpened]);

    return (
        <>
            {/* モバイル用ドロワー */}
            <Drawer
                opened={drawerOpened}
                onClose={() => setDrawerOpened(false)}
                size={300}
                padding={0}
                withCloseButton={false}
                withinPortal={false}
                trapFocus={false}
                withOverlay={width < 768}
                // styles={(theme) => ({
                //     root: {
                //         position: "fixed",
                //     },
                //     drawer: {
                //         transition: "transform 150ms ease",
                //     },
                // })}
            >
                <nav className={classes.navbar}>
                    <Box className={classes.header}>
                        <Title size="xl">契約メニュー</Title>
                    </Box>
                    <ScrollArea className={classes.links}>
                        <div className={classes.linksInner}>{links}</div>
                    </ScrollArea>
                </nav>
                {/* <Menu shadow="md">
                    <MenuItem
                        variant="subtle"
                        leftSection={<IconSettings size="1.2rem" />}
                    >
                        管理メニュー
                    </MenuItem>
                    <MenuItem
                        leftSection={<IconFileText size="1.2rem" />}
                        component={Link}
                        href="/contract-all"
                    >
                        契約書一覧
                    </MenuItem>
                    <MenuItem
                        leftSection={<IconFileText size="1.2rem" />}
                        component={Link}
                        href=""
                    >
                        契約書【A】
                    </MenuItem>
                    <MenuItem
                        leftSection={<IconFileText size="1.2rem" />}
                        component={Link}
                        href=""
                    >
                        契約書【B】
                    </MenuItem>
                    <MenuItem
                        leftSection={<IconSettings size="1.2rem" />}
                        component={Link}
                        href=""
                    >
                        WF
                    </MenuItem>
                    <Divider />
                </Menu>
                <Menu shadow="md">
                    <MenuItem
                        variant="subtle"
                        leftSection={<IconSettings size="1.2rem" />}
                    >
                        設定メニュー
                    </MenuItem>
                    <MenuItem
                        leftSection={<IconAdjustments size="1.2rem" />}
                        component={Link}
                        href="/user-settings"
                    >
                        項目設定
                    </MenuItem>
                    <MenuItem
                        leftSection={<IconAdjustments size="1.2rem" />}
                        component={Link}
                        href="/user-settings"
                    >
                        セクション
                    </MenuItem>
                    <MenuItem
                        leftSection={<IconUserCircle size="1.2rem" />}
                        component={Link}
                        href="/user-settings"
                    >
                        個人設定
                    </MenuItem>
                    <MenuItem
                        leftSection={<IconBuildingSkyscraper size="1.2rem" />}
                        component={Link}
                        href="/company-settings"
                    >
                        会社設定
                    </MenuItem>
                    <Divider />
                </Menu> */}
            </Drawer>
        </>
    );
};

export default SideMenu;
