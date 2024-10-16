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
import { HStack } from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Tabs, TabsList } from "../ui/tabs";
import ContractBasicContainer from "./container/ContractBasicContainer";

const ContractDetailMenuLayout = () => {
    const params = useParams();
    const contractCode = params.contractCode;
    const router = useRouter();
    console.log("contractDetailMenuLayout", contractCode);

    const [activeMenu, setActiveMenu] = useState("basic");
    const sideMenu = [
        {
            id: "basic",
            url: `contract-basic`,
            label: "基本情報",
            component: <ContractBasicContainer />,
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
            component: <ContractFileContainer />,
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
        // <Box className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0 space-x-4 px-8 lg:h-[900px]">
        //     <Box as="aside" className="-mx-6 lg:w-1/5 border-r">
        <HStack
            as="nav"
            align="stretch"
            w="25%"
            className="flex space-x-2 lg:flex-col lg:space-x-12 lg:space-y-1 mt-6"
        >
            <Tabs>
                <div className="flex items-center">
                    <TabsList className="inline-flex h-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                        {sideMenu.map((menu) => (
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
                        ))}
                    </TabsList>
                </div>
            </Tabs>
        </HStack>
        //     </Box>
        // </Box>
    );
};

export default ContractDetailMenuLayout;
