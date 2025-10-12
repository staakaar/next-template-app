"use client";
import { ReactNode, useState } from "react";
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from "@/components/ui/tabs";
import { IconSettings } from "@tabler/icons-react";

interface ContractDetailMenuProps {
    contractBasic: ReactNode;
    contractTrade: ReactNode;
    contractAuthority: ReactNode;
    contractDetails: ReactNode;
    contractFile: ReactNode;
    contractHistory: ReactNode;
    externalLink: ReactNode;
    ownCompany: ReactNode;
    relatedInfo: ReactNode;
    section: ReactNode;
    workflow: ReactNode;
    businessForm: ReactNode;
}

const ContractDetailMenuLayout = ({
    contractBasic,
    contractTrade,
    contractAuthority,
    contractDetails,
    contractFile,
    contractHistory,
    externalLink,
    ownCompany,
    relatedInfo,
    section,
    workflow,
    businessForm,
}: ContractDetailMenuProps) => {
    const iconStyle = { width: 12, height: 12 };

    /** TODO: セクション連携した場合はこちらの配列の該当箇所に追加する */
    const sideMenu = [
        {
            id: "basic",
            label: "基本情報",
            icon: <IconSettings style={iconStyle} />,
        },
        {
            id: "tradePartner",
            label: "取引先",
            icon: <IconSettings style={iconStyle} />,
        },
        {
            id: "file",
            label: "ファイル",
            icon: <IconSettings style={iconStyle} />,
        },
        {
            id: "details",
            label: "明細",
            icon: <IconSettings style={iconStyle} />,
        },
        {
            id: "externalLink",
            label: "外部連携",
            icon: <IconSettings style={iconStyle} />,
        },
        {
            id: "section",
            label: "セクション",
            icon: <IconSettings style={iconStyle} />,
        },
        {
            id: "ownCompany",
            label: "自社情報",
            icon: <IconSettings style={iconStyle} />,
        },
        {
            id: "authority",
            label: "権限",
            icon: <IconSettings style={iconStyle} />,
        },
        {
            id: "relatedInfo",
            label: "関連情報",
            icon: <IconSettings style={iconStyle} />,
        },
        {
            id: "workflow",
            label: "WF",
            icon: <IconSettings style={iconStyle} />,
        },
        {
            id: "history",
            label: "履歴",
            icon: <IconSettings style={iconStyle} />,
        },
        {
            id: "businessForm",
            label: "帳票",
            icon: <IconSettings style={iconStyle} />,
        },
    ];

    return (
        <Tabs defaultValue="basic">
            <TabsList className="w-full justify-start">
                {sideMenu.map((menu) => (
                    <TabsTrigger key={menu.id} value={menu.id} className="gap-2">
                        {menu.icon}
                        {menu.label}
                    </TabsTrigger>
                ))}
            </TabsList>
            <TabsContent value="basic">{contractBasic}</TabsContent>
            <TabsContent value="tradePartner">{contractTrade}</TabsContent>
            <TabsContent value="file">{contractFile}</TabsContent>
            <TabsContent value="details">{contractDetails}</TabsContent>
            <TabsContent value="externalLink">{externalLink}</TabsContent>
            <TabsContent value="section">{section}</TabsContent>
            <TabsContent value="ownCompany">{ownCompany}</TabsContent>
            <TabsContent value="authority">{contractAuthority}</TabsContent>
            <TabsContent value="relatedInfo">{relatedInfo}</TabsContent>
            <TabsContent value="workflow">{workflow}</TabsContent>
            <TabsContent value="history">{contractHistory}</TabsContent>
            <TabsContent value="businessForm">{businessForm}</TabsContent>
        </Tabs>
    );
};

export default ContractDetailMenuLayout;
