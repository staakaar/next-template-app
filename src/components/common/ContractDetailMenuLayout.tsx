"use client";
// import NavLink from "@/components/atoms/NavigationLink/NavigationLink";
// import { useParams, useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import { rem, Tabs, TabsList, TabsPanel, TabsTab } from "@mantine/core";
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
    // const { selectedContractCode } = useContractStore();
    // console.log("contractDetailMenuLayout", selectedContractCode);

    const iconStyle = { width: rem(12), height: rem(12) };

    const [activeMenu, setActiveMenu] = useState("basic");
    /** TODO: セクション連携した場合はこちらの配列の該当箇所に追加する */
    const sideMenu = [
        {
            id: "basic",
            // url: `/contract/${selectedContractCode}/contractBasic`,
            label: "基本情報",
            icon: <IconSettings style={iconStyle} />,
        },
        {
            id: "tradePartner",
            // url: `/contract/${selectedContractCode}/contractTrade`,
            label: "取引先",
            icon: <IconSettings style={iconStyle} />,
        },
        {
            id: "file",
            // url: `contract-file`,
            label: "ファイル",
            icon: <IconSettings style={iconStyle} />,
        },
        {
            id: "details",
            // url: `contract-details`,
            label: "明細",
            icon: <IconSettings style={iconStyle} />,
        },
        {
            id: "externalLink",
            // url: `external-link`,
            label: "外部連携",
            icon: <IconSettings style={iconStyle} />,
        },
        {
            id: "section",
            // url: `section`,
            label: "セクション",
            icon: <IconSettings style={iconStyle} />,
        },
        {
            id: "ownCompany",
            // url: `own-company`,
            label: "自社情報",
            icon: <IconSettings style={iconStyle} />,
        },
        {
            id: "authority",
            // url: `contract-authority`,
            label: "権限",
            icon: <IconSettings style={iconStyle} />,
        },
        {
            id: "relatedInfo",
            // url: `related-info`,
            label: "関連情報",
            icon: <IconSettings style={iconStyle} />,
        },
        {
            id: "workflow",
            // url: `workflow`,
            label: "WF",
            icon: <IconSettings style={iconStyle} />,
        },
        {
            id: "history",
            // url: `contract-history`,
            label: "履歴",
            icon: <IconSettings style={iconStyle} />,
        },
        {
            id: "businessForm",
            // url: `business-form`,
            label: "帳票",
            icon: <IconSettings style={iconStyle} />,
        },
    ];

    return (
        <Tabs defaultValue="basic" value={activeMenu} orientation="horizontal">
            <TabsList className="">
                {sideMenu.map((menu) => (
                    <TabsTab
                        key={menu.id}
                        value={menu.id}
                        color="blue"
                        onClick={() => setActiveMenu(menu.id)}
                        leftSection={menu.icon}
                        className={
                            activeMenu === menu.id ? "text-blue-500" : ""
                        }
                    >
                        {menu.label}
                    </TabsTab>
                ))}
            </TabsList>
            <TabsPanel value="basic">{contractBasic}</TabsPanel>
            <TabsPanel value="tradePartner">{contractTrade}</TabsPanel>
            <TabsPanel value="file">{contractFile}</TabsPanel>
            <TabsPanel value="details">{contractDetails}</TabsPanel>
            <TabsPanel value="externalLink">{externalLink}</TabsPanel>
            <TabsPanel value="section">{section}</TabsPanel>
            <TabsPanel value="ownCompany">{ownCompany}</TabsPanel>
            <TabsPanel value="authority">{contractAuthority}</TabsPanel>
            <TabsPanel value="relatedInfo">{relatedInfo}</TabsPanel>
            <TabsPanel value="workflow">{workflow}</TabsPanel>
            <TabsPanel value="history">{contractHistory}</TabsPanel>
            <TabsPanel value="businessForm">{businessForm}</TabsPanel>
        </Tabs>
    );
};

export default ContractDetailMenuLayout;
