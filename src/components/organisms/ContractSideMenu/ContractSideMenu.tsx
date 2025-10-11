"use client";

import { Calendar, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
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

const SideMenu = () => {
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
        <Drawer open={drawerOpened} onOpenChange={setDrawerOpened}>
            <DrawerContent className="h-[800px] w-[300px] p-0">
                <nav className="bg-white dark:bg-gray-800 h-full w-full p-4 flex flex-col border-r border-gray-200 dark:border-gray-700">
                    <div className="p-4 -mx-4 -mt-4 mb-0 text-black dark:text-white border-b border-gray-200 dark:border-gray-700">
                        <h1 className="text-xl font-semibold">契約メニュー</h1>
                    </div>
                    <div className="flex-1 -mx-4 overflow-y-auto">
                        <div className="pt-6 pb-6">{links}</div>
                    </div>
                </nav>
            </DrawerContent>
        </Drawer>
    );
};

export default SideMenu;
