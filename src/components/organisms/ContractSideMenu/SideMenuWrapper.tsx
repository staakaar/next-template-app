"use client";

import { usePathname } from "next/navigation";
import ContractSideMenu from "./ContractSideMenu";
import ContractSideMenuDrawer from "./ContractSideMenuDrawer";

const SideMenuWrapper = () => {
    const pathname = usePathname();

    // ルートページ（トップページ）では常時表示型のサイドメニューを表示
    if (pathname === "/contract-all") {
        return <ContractSideMenu />;
    }

    // その他のページではドロワー型のサイドメニューを表示
    return <ContractSideMenuDrawer />;
};

export default SideMenuWrapper;
