"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { IconFilter, IconPlus } from "@tabler/icons-react";
import ContractListTablePresentation from "./ContractListTablePresentational";
import ContractSearchArea from "@/components/common/ContractSearchArea";
import ContractAllLoading from "../loading";
import { ErrorBoundary } from "react-error-boundary";
import type { ContractResponse } from "@/types/api/contract";

/** 常に最新情報を取得 */
// export const dynamic = "force-dynamic";

const generateMockContracts = (count: number): ContractResponse => {
    const contracts = Array.from({ length: count }, (_, index) => ({
        contractCode: `C${index + 1}`,
        contractName: `Contract ${index + 1}`,
        contractStatus: `${index % 2 === 0 ? "CREATE" : "UNDER_CONSTRUCTION"}`,
        tradePartner: `Partner ${index + 1}`,
        contractPersonInCharge: `Person ${index + 1}`,
    }));

    return {
        contracts,
        totalCount: count,
    };
};

const ContractListTableContainer = () => {
    const [activeTab, setActiveTab] = useState("created");
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearchAreaOpen, setIsSearchAreaOpen] = useState(false);

    // const contracts = useRecoilValue(contractListState);
    const contracts = generateMockContracts(100);

    // useEffect(() => {
    //     if (data) {
    //         setContracts(data.contracts);
    //     }
    // }, [data, setContracts]);

    return (
        <div className="min-h-screen w-full bg-gray-50">
            <div className="sm:gap-4 sm:py-4 sm:pl-14 sm:mt-10">
                <div className="space-y-4 p-4">
                    <Tabs value={activeTab} onValueChange={setActiveTab} defaultValue="created">
                        <TabsList className="w-full justify-start">
                            <TabsTrigger value="underConstruction">作成中</TabsTrigger>
                            <TabsTrigger value="created">作成済み</TabsTrigger>
                            <TabsTrigger value="internalApproved">承認中</TabsTrigger>
                            <TabsTrigger value="revised">差し戻し</TabsTrigger>
                            <TabsTrigger value="reject">却下</TabsTrigger>
                            <TabsTrigger value="approved">承認済み</TabsTrigger>
                            <TabsTrigger value="issued">発行</TabsTrigger>
                            <TabsTrigger value="ok">合意</TabsTrigger>
                            <TabsTrigger value="complete">締結</TabsTrigger>
                        </TabsList>

                        <div className="flex items-center mt-8">
                            <div className="flex-1 flex justify-end gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                        setIsSearchAreaOpen(!isSearchAreaOpen)
                                    }
                                >
                                    <IconFilter size={16} />
                                    <span>検索</span>
                                </Button>

                                <Button
                                    asChild
                                    size="sm"
                                >
                                    <Link href="/contract-new">
                                        <IconPlus size={16} />
                                        <span>新規作成</span>
                                    </Link>
                                </Button>
                            </div>
                        </div>
                        <ContractSearchArea
                            isOpen={isSearchAreaOpen}
                            onClose={() => setIsSearchAreaOpen(false)}
                        />
                        <TabsContent value="created">
                            {/* トースターにする */}
                            <ErrorBoundary
                                fallback={<p>契約書一覧取得に失敗しました</p>}
                            >
                                <Suspense fallback={<ContractAllLoading />}>
                                    <ContractListTablePresentation
                                        contracts={contracts.contracts}
                                        initialTotalCount={contracts.totalCount}
                                    />
                                </Suspense>
                            </ErrorBoundary>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

export default ContractListTableContainer;
