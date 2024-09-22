"use client";
import NavLink from "@/components/atoms/NavigationLink/NavigationLink";
import ContractAuthorityContainer from "@/components/common/container/ContractAuthorityContainer";
import ContractDetailsContainer from "@/components/common/container/ContractDetailsContainer";
import ContractFileContainer from "@/components/common/container/ContractFileContainer";
import ContractHistoryContainer from "@/components/common/container/ContractHistoryContainer";
import ContractSectionContainer from "@/components/common/container/ContractSectionContainer";
import ExternalLinkContainer from "@/components/common/container/ExternalLinkContainer";
import OwnCompanyContainer from "@/components/common/container/OwnCompanyContainer";
import RelatedContractContainer from "@/components/common/container/RelatedContractContainer";
import TradePartnerContainer from "@/components/common/container/TradePartnerContainer";
import WorkflowContainer from "@/components/common/container/WorkflowContainer";
import ContractBasicContainer from "@/components/common/ContractBasicContainer";
import { Box, VStack } from "@chakra-ui/react";
import { useState } from "react";

const ContractDetailMenuLayout = () => {
    const [activeMenu, setActiveMenu] = useState("basic");
    const sideMenu = [
        {
            id: "basic",
            label: "基本情報",
            component: <ContractBasicContainer />,
        },
        {
            id: "tradePartner",
            label: "取引先",
            component: <TradePartnerContainer />,
        },
        { id: "file", label: "ファイル", component: <ContractFileContainer /> },
        {
            id: "details",
            label: "明細",
            component: <ContractDetailsContainer />,
        },
        {
            id: "externalLink",
            label: "外部連携",
            component: <ExternalLinkContainer />,
        },
        {
            id: "section",
            label: "セクション",
            component: <ContractSectionContainer />,
        },
        {
            id: "ownCompany",
            label: "自社情報",
            component: <OwnCompanyContainer />,
        },
        {
            id: "authority",
            label: "権限",
            component: <ContractAuthorityContainer />,
        },
        {
            id: "relatedInfo",
            label: "関連情報",
            component: <RelatedContractContainer />,
        },
        { id: "workflow", label: "WF", component: <WorkflowContainer /> },
        {
            id: "history",
            label: "履歴",
            component: <ContractHistoryContainer />,
        },
    ];

    return (
        <>
            <Box className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0 space-x-4 px-8 lg:h-[900px]">
                <Box as="aside" className="-mx-6 lg:w-1/5 border-r">
                    <VStack
                        as="nav"
                        align="stretch"
                        w="25%"
                        className="flex space-x-2 lg:flex-col lg:space-x-12 lg:space-y-1 mt-20"
                    >
                        {sideMenu.map((menu) => (
                            <NavLink
                                key={menu.id}
                                href={`#${menu.id}`}
                                isActive={activeMenu === menu.id}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setActiveMenu(menu.id);
                                }}
                            >
                                {menu.label}
                            </NavLink>
                        ))}
                    </VStack>
                </Box>
                <Box flex={1} className="flex-1 lg:max-w-2xl:">
                    {sideMenu.find((menu) => menu.id === activeMenu)?.component}
                </Box>
            </Box>
        </>
    );
};

export default ContractDetailMenuLayout;
