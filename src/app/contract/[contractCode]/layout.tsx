import {
    IconArrowLeft,
    IconCopy,
    IconFileExport,
    IconSend,
} from "@tabler/icons-react";
import Link from "next/link";
import React, { ReactNode } from "react";
import ContractDetailActionButtons from "@/components/common/ContractDetailActionButtons";
import ContractDetailMenuLayout from "@/components/common/ContractDetailMenuLayout";
import ContractStatusStepper from "@/components/common/ContractStatusStepper";
import { Card } from "@/components/ui/card";
import ContractDetailSection from "../_components/ContractDetailSection";
import { ContractDetailUpdateButton } from "../_components/ContractDetailUpdateButton";

interface ContractDetailTabProps {
    children: ReactNode;
    tabs: ReactNode;
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

const Layout = ({
    children,
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
}: Readonly<ContractDetailTabProps>) => {
    return (
        <>
            <div className="min-h-full h-full">
                <Card className="flex flex-col flex-1 min-h-screen w-full">
                    <div className="w-full p-4 md:px-8">
                        <div className="flex flex-col space-y-4">
                            <div className="flex items-center justify-between">
                                <Link
                                    href="/contract-all"
                                    className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                                >
                                    一覧へ戻る
                                </Link>
                                <div className="flex items-center gap-2">
                                    <ContractDetailActionButtons />
                                </div>
                            </div>
                            {/* ステッパー */}
                            <ContractStatusStepper />
                            {/* セクション */}
                            <ContractDetailSection />
                            {/* メニューレイアウト */}
                            <ContractDetailMenuLayout
                                contractBasic={contractBasic}
                                contractTrade={contractTrade}
                                contractAuthority={contractAuthority}
                                contractDetails={contractDetails}
                                contractFile={contractFile}
                                contractHistory={contractHistory}
                                externalLink={externalLink}
                                ownCompany={ownCompany}
                                relatedInfo={relatedInfo}
                                section={section}
                                workflow={workflow}
                                businessForm={businessForm}
                            />
                            <div className="flex-1 lg:max-w-2xl bg-black/5"></div>
                            {children}
                        </div>
                    </div>
                </Card>
            </div>
            <div className="sticky bottom-0 border-t border-gray-300 bg-white flex justify-end items-center z-50 w-full transition-all duration-200 ease-in-out shadow-lg p-4">
                <div className="flex items-center gap-2">
                    <ContractDetailUpdateButton
                        activeTab={undefined}
                        contractCode={undefined}
                    />
                </div>
            </div>
            {/* <footer className="flex items-center justify-end bg-background h-16 sticky bottom-0 border-t">
                <div className="mr-8">
                    <ContractDetailUpdateButton
                        activeTab={undefined}
                        contractCode={undefined}
                    />
                </div>
            </footer> */}
        </>
    );
};

export default Layout;
