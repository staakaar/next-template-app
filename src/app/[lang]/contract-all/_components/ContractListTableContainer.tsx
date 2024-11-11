"use client";
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
import React from "react";
import { useRecoilValue } from "recoil";
import { contractListState } from "@/stores/contracts/atom";
import ContractSearchArea from "@/components/common/ContractSearchArea";

/** 常に最新情報を取得 */
// export const dynamic = "force-dynamic";

const ContractListTableContainer = () => {
    const [activeTab, setActiveTab] = useState("created");
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearchAreaOpen, setIsSearchAreaOpen] = useState(false);

    const contracts = useRecoilValue(contractListState);

    // const data = useFetchContracts(page, pageSize, search);

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
                                <TabsTab value="under_construction">
                                    作成中
                                </TabsTab>
                                <TabsTab value="created">作成済み</TabsTab>
                                <TabsTab value="internal_approved">
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
                                <ContractListTablePresentation
                                    contracts={contracts.contracts}
                                    initialTotalCount={contracts.totalCount}
                                />
                            </TabsPanel>
                        </Tabs>
                    </Stack>
                </Box>
            </Box>
        </>
    );
};

export default ContractListTableContainer;
