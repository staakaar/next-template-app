import { Box, Tabs, Tab, TabList } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import React from "react";

/**
 * こちらのページでは契約詳細ページの共通部分のコンポーネントを実装
 * ・必要なものぱんクズリスト
 * ・ステータ遷移
 * ・契約書詳細のタブ(ドメインごとに)各タブをクリックした際にページ遷移するもしくはタブ遷移
 * ・ボタン
 */
export type Params = {
    id: String;
};

export type ContractLayoutProps = {
    children: React.ReactNode;
    params: Params;
};

const ContractLayout = ({ children, params }: ContractLayoutProps) => {
    const pathname = usePathname();
    const router = useRouter();

    const tabs = [
        { name: "稟議捺印", path: `/contracts/${params.id}/details` },
        { name: "契約書履歴", path: `/contracts/${params.id}/history` },
        { name: "契約書ファイル", path: `/contracts/${params.id}/files` },
        { name: "契約書権限", path: `/contracts/${params.id}/authorize` },
        { name: "クラウドサイン", path: `/contracts/${params.id}/cloudsign` },
        { name: "契約書基本情報", path: `/contracts/${params.id}/basic` },
        { name: "自社情報", path: `/contracts/${params.id}/own-company` },
        { name: "ドラフト契約書", path: `/contracts/${params.id}/draft` },
    ];

    return (
        <Box>
            <Tabs
                index={tabs.findIndex((tab) => tab.path === pathname)}
                onChange={(index) => router.push(tabs[index].path)}
            >
                <TabList>
                    {tabs.map((tab) => (
                        <Tab key={tab.path}>
                            <Link href={tab.path}>{tab.name}</Link>
                        </Tab>
                    ))}
                </TabList>
            </Tabs>
            {children}
        </Box>
    );
};

export default ContractLayout;
