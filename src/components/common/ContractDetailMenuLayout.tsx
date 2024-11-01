"use client";
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
import { useState } from "react";
import ContractBasicContainer from "./container/ContractBasicContainer";
import { selectedContractCodeState } from "@/stores/contracts/atom";
import { useRecoilValue } from "recoil";
import { Tabs, TabsList, TabsTab } from "@mantine/core";

const ContractDetailMenuLayout = () => {
    const params = useParams();
    const contractCode = params.contractCode;
    const router = useRouter();
    const selectedContractCode = useRecoilValue(selectedContractCodeState);
    console.log("contractDetailMenuLayout", contractCode);

    const [activeMenu, setActiveMenu] = useState("basic");
    const sideMenu = [
        {
            id: "basic",
            url: `contract-basic`,
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
            url: `contract-trade`,
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
    ];

    return (
        <Tabs value={activeMenu} orientation="horizontal">
            <TabsList className="">
                {sideMenu.map((menu) => (
                    <TabsTab key={menu.id} value={menu.id} color="blue">
                        <NavLink
                            key={menu.id}
                            href={`${menu.url}`}
                            isActive={activeMenu === menu.id}
                            onClick={(e) => {
                                setActiveMenu(menu.id);
                                router.push(menu.url);
                            }}
                        >
                            {menu.label}
                        </NavLink>
                    </TabsTab>
                ))}
            </TabsList>
        </Tabs>
    );
};

export default ContractDetailMenuLayout;
