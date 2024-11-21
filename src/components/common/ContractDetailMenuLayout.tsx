"use client";
import NavLink from "@/components/atoms/NavigationLink/NavigationLink";
import { useParams, useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import useContractStore from "@/stores/contracts/ContractStore";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@mantine/core";

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
    const params = useParams();
    const contractCode = params.contractCode;
    const router = useRouter();
    const { selectedContractCode } = useContractStore();
    console.log("contractDetailMenuLayout", selectedContractCode);

    const [activeMenu, setActiveMenu] = useState("basic");
    const sideMenu = [
        {
            id: "basic",
            url: `/contract/${selectedContractCode}/contractBasic`,
            label: "基本情報",
        },
        {
            id: "tradePartner",
            url: `/contract/${selectedContractCode}/contractTrade`,
            label: "取引先",
        },
        {
            id: "file",
            url: `contract-file`,
            label: "ファイル",
        },
        {
            id: "details",
            url: `contract-details`,
            label: "明細",
        },
        {
            id: "externalLink",
            url: `external-link`,
            label: "外部連携",
        },
        {
            id: "section",
            url: `section`,
            label: "セクション",
        },
        {
            id: "ownCompany",
            url: `own-company`,
            label: "自社情報",
        },
        {
            id: "authority",
            url: `contract-authority`,
            label: "権限",
        },
        {
            id: "relatedInfo",
            url: `related-info`,
            label: "関連情報",
        },
        {
            id: "workflow",
            url: `workflow`,
            label: "WF",
        },
        {
            id: "history",
            url: `contract-history`,
            label: "履歴",
        },
        {
            id: "businessForm",
            url: `business-form`,
            label: "帳票",
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
                    >
                        {/* <NavLink
                            key={menu.id}
                            href={``}
                            isActive={activeMenu === menu.id}
                            onClick={() => {
                                setActiveMenu(menu.id);
                            }}
                        > */}
                        {menu.label}
                        {/* </NavLink> */}
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
