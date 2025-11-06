"use client";

import { Calendar, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
} from "@/components/ui/drawer";
import { NavigationLinksGroup } from "../NavigationLinksGroup/NavigationLinksGroup";

const contractMenu = [
    {
        label: "管理メニュー",
        icon: FileText,
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
        icon: Calendar,
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

const ContractSideMenuDrawer = () => {
    const links = contractMenu.map((item) => (
        <NavigationLinksGroup {...item} key={item.label} />
    ));
    const [drawerOpened, setDrawerOpened] = useState(false);
    const [width, setWidth] = useState(0);

    // ビューポートサイズの取得
    useEffect(() => {
        const updateWidth = () => setWidth(window.innerWidth);
        updateWidth();
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, []);

    // サイドバートリガーエリアの設定（左端でトリガー）
    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            // デスクトップサイズでのみ有効
            if (width >= 768) {
                const leftEdgeThreshold = 12; // 左端から12px以内で開く
                if (event.clientX <= leftEdgeThreshold && !drawerOpened) {
                    setDrawerOpened(true);
                }
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [width, drawerOpened]);

    // ドロワーが開いているときのマウス位置監視（ドロワー幅より右に移動で閉じる）
    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            const drawerWidth = 300;
            const buffer = 24; // 多少の余白を持たせる
            // マウスがドロワーの外（ドロワー幅+余白）より右に出たら閉じる
            if (drawerOpened && event.clientX > drawerWidth + buffer) {
                setDrawerOpened(false);
            }
        };

        if (drawerOpened) {
            window.addEventListener("mousemove", handleMouseMove);
        }

        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [drawerOpened]);

    return (
        <Drawer
            open={drawerOpened}
            onOpenChange={setDrawerOpened}
            direction="left"
        >
            <DrawerContent className="fixed left-0 right-auto top-0 bottom-0 h-[100dvh] w-[280px] md:w-[300px] p-0 rounded-none shadow-lg">
                {/* Accessible header following shadcn/ui drawer docs */}
                <DrawerHeader className="sr-only">
                    <DrawerTitle>契約メニュー</DrawerTitle>
                    <DrawerDescription>サイドバーのメニュー</DrawerDescription>
                </DrawerHeader>
                <nav className="bg-white dark:bg-gray-800 h-full w-full p-4 pt-[env(safe-area-inset-top)] flex flex-col border-r border-gray-200 dark:border-gray-700">
                    <div className="p-4 -mx-4 -mt-4 mb-0 text-black dark:text-white border-b border-gray-200 dark:border-gray-700">
                        <h1 className="text-xl font-semibold">契約メニュー</h1>
                    </div>
                    <div className="flex-1 -mx-4 overflow-y-auto overscroll-contain">
                        <div className="pt-6 pb-6">{links}</div>
                    </div>
                </nav>
            </DrawerContent>
        </Drawer>
    );
};

export default ContractSideMenuDrawer;
