"use client";
import React, { Suspense } from "react";
import { useState } from "react";
import Link from "next/link";
import {
    Box,
    Tabs,
    Button,
    Group,
    Stack,
    TabsList,
    TabsTab,
    TabsPanel,
} from "@mantine/core";
import { IconFilter, IconPlus } from "@tabler/icons-react";
import ContractListTablePresentation from "./ContractListTablePresentational";
import { useRecoilValue } from "recoil";
import { contractListState } from "@/stores/contracts/atom";
import ContractSearchArea from "@/components/common/ContractSearchArea";
import ContractAllLoading from "../loading";
import { ErrorBoundary } from "react-error-boundary";
import { useFetchContracts } from "@/lib/contract/api";
import { ContractResponse } from "@/types/api/contract";

/** 常に最新情報を取得 */
// export const dynamic = "force-dynamic";

const generateMockContracts = (count: number): ContractResponse => {
    const contracts = Array.from({ length: count }, (_, index) => ({
        contractCode: `C${index + 1}`,
        contractName: `Contract ${index + 1}`,
        contractStatus: `${index % 2 == 0 ? "CREATE" : "UNDER_CONSTRUCTION"}`,
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
        <>
            <Box className="min-h-screen w-full bg-black-alpha-200">
                <Box className="sm:gap-4 sm:py-4 sm:pl-14 sm:mt-10">
                    <Stack gap="md" p="md">
                        <Tabs value={activeTab} defaultValue="created">
                            <TabsList>
                                <TabsTab value="underConstruction">
                                    作成中
                                </TabsTab>
                                <TabsTab value="created">作成済み</TabsTab>
                                <TabsTab value="internalApproved">
                                    承認中
                                </TabsTab>
                                <TabsTab value="revised">差し戻し</TabsTab>
                                <TabsTab value="reject">却下</TabsTab>
                                <TabsTab value="approved">承認済み</TabsTab>
                                <TabsTab value="issued">発行</TabsTab>
                                <TabsTab value="ok">合意</TabsTab>
                                <TabsTab value="reject">却下</TabsTab>
                                <TabsTab value="complete">締結</TabsTab>
                            </TabsList>

                            <Group className="flex items-center mt-8">
                                <Group flex="1" justify="flex-end">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            setIsSearchAreaOpen(
                                                !isSearchAreaOpen
                                            )
                                        }
                                    >
                                        <Group gap="xs">
                                            <IconFilter size="1rem" />
                                            <span>検索</span>
                                        </Group>
                                    </Button>

                                    <Button
                                        component={Link}
                                        href="/contract-new"
                                        size="sm"
                                    >
                                        <Group gap="xs">
                                            <IconPlus size="1rem" />
                                            <span>新規作成</span>
                                        </Group>
                                    </Button>
                                </Group>
                            </Group>
                            <ContractSearchArea
                                isOpen={isSearchAreaOpen}
                                onClose={() => setIsSearchAreaOpen(false)}
                            />
                            <TabsPanel value="created">
                                {/* トースターにする */}
                                <ErrorBoundary
                                    fallback={
                                        <p>契約書一覧取得に失敗しました</p>
                                    }
                                >
                                    <Suspense fallback={<ContractAllLoading />}>
                                        <ContractListTablePresentation
                                            contracts={contracts.contracts}
                                            initialTotalCount={
                                                contracts.totalCount
                                            }
                                        />
                                    </Suspense>
                                </ErrorBoundary>
                            </TabsPanel>
                        </Tabs>
                    </Stack>
                </Box>
            </Box>
        </>
    );
};

export default ContractListTableContainer;
