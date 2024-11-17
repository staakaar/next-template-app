"use client";
import { useRecoilValue } from "recoil";
import NavLink from "@/components/atoms/NavigationLink/NavigationLink";
import ContractAuthorityContainer from "@/components/common/container/ContractAuthorityContainer";
import ContractDetailsContainer from "@/components/common/container/contractDetails/ContractDetailsContainer";
import ContractFileContainer from "@/components/common/container/ContractFileContainer";
import ContractHistoryContainer from "@/components/common/container/ContractHistoryContainer";
import ContractSectionContainer from "@/components/common/container/ContractSectionContainer";
import ExternalLinkContainer from "@/components/common/container/ExternalLinkContainer";
import OwnCompanyContainer from "@/components/common/container/OwnCompanyContainer";
import RelatedContractContainer from "@/components/common/container/RelatedContractContainer";
import TradePartnerContainer from "@/components/common/container/TradePartnerContainer";
import WorkflowContainer from "@/components/common/container/WorkflowContainer";
import { useParams, useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import ContractBasicContainer from "./container/ContractBasicContainer";
import { selectedContractCodeState } from "@/stores/contracts/contract";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@mantine/core";
import BusinessFormContainer from "./container/businessForm/BusinessFormContainer";

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
    const selectedContractCode = useRecoilValue(selectedContractCodeState);
    console.log("contractDetailMenuLayout", selectedContractCode);

    const [activeMenu, setActiveMenu] = useState("basic");
    const sideMenu = [
        {
            id: "basic",
            url: `/contract/${selectedContractCode}/contractBasic`,
            label: "基本情報",
            component: (
                <ContractBasicContainer
                    isEdit={false}
                    contractCode={selectedContractCode}
                />
            ),
        },
        {
            id: "tradePartner",
            url: `/contract/${selectedContractCode}/contractTrade`,
            label: "取引先",
            component: <TradePartnerContainer />,
        },
        {
            id: "file",
            url: `contract-file`,
            label: "ファイル",
            component: <ContractFileContainer isEdit={false} />,
        },
        {
            id: "details",
            url: `contract-details`,
            label: "明細",
            component: <ContractDetailsContainer />,
        },
        {
            id: "externalLink",
            url: `external-link`,
            label: "外部連携",
            component: <ExternalLinkContainer />,
        },
        {
            id: "section",
            url: `section`,
            label: "セクション",
            component: <ContractSectionContainer />,
        },
        {
            id: "ownCompany",
            url: `own-company`,
            label: "自社情報",
            component: <OwnCompanyContainer />,
        },
        {
            id: "authority",
            url: `contract-authority`,
            label: "権限",
            component: <ContractAuthorityContainer />,
        },
        {
            id: "relatedInfo",
            url: `related-info`,
            label: "関連情報",
            component: <RelatedContractContainer />,
        },
        {
            id: "workflow",
            url: `workflow`,
            label: "WF",
            component: <WorkflowContainer />,
        },
        {
            id: "history",
            url: `contract-history`,
            label: "履歴",
            component: <ContractHistoryContainer />,
        },
        {
            id: "businessForm",
            url: `business-form`,
            label: "帳票",
            component: <BusinessFormContainer />,
        },
    ];

    return (
        <Tabs defaultValue="basic" value={activeMenu} orientation="horizontal">
            <TabsList className="">
                {sideMenu.map((menu) => (
                    <TabsTab key={menu.id} value={menu.id} color="blue">
                        <NavLink
                            key={menu.id}
                            href={``}
                            isActive={activeMenu === menu.id}
                            onClick={() => {
                                setActiveMenu(menu.id);
                                // router.push(menu.url);
                            }}
                        >
                            {menu.label}
                        </NavLink>
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
