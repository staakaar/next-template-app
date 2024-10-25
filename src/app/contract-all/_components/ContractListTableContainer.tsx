"use client";
import { useState } from "react";
import Link from "next/link";
import {
    Box,
    Tabs,
    TextInput,
    Button,
    Menu,
    ActionIcon,
    Group,
    Stack,
    TabsList,
    TabsTab,
    TabsPanel,
    MenuTarget,
    MenuDropdown,
    MenuLabel,
    MenuItem,
    Collapse,
} from "@mantine/core";
import {
    IconSearch,
    IconFilter,
    IconFile,
    IconPlus,
} from "@tabler/icons-react";
import ContractListTablePresentation from "./ContractListTablePresentational";
import React from "react";
import { useRecoilValue } from "recoil";
import { contractListState } from "@/stores/contracts/atom";
import ContractSearchArea from "@/components/common/ContractSearchArea";

/** 常に最新情報を取得 */
// export const dynamic = "force-dynamic";

const ContractListTableContainer = () => {
    const [isOpen, setIsOpen] = useState(false);
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
                            <Box className="mb-4 flex justify-center">
                                <TabsList className="inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground">
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
                                </TabsList>
                            </Box>

                            <Group className="flex items-center">
                                <TextInput
                                    placeholder="Search..."
                                    leftSection={<IconSearch size="1rem" />}
                                    style={{ width: "600px" }}
                                />
                                <Group flex="1" justify="flex-end" gap="sm">
                                    {/* <Menu position="bottom-end">
                                        <MenuTarget>
                                            <Box>
                                                <Collapse in={showSearch}>
                                                    <Box mb="md">
                                                        <TextInput
                                                            placeholder="検索..."
                                                            leftSection={
                                                                <IconSearch size="1rem" />
                                                            }
                                                            value={searchQuery}
                                                            onChange={(event) =>
                                                                setSearchQuery(
                                                                    event
                                                                        .currentTarget
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </Box>
                                                </Collapse>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    <Group gap="xs">
                                                        <IconFilter size="1rem" />
                                                        <span>検索</span>
                                                    </Group>
                                                </Button>
                                            </Box>
                                        </MenuTarget>
                                        <MenuDropdown>
                                            <MenuLabel>Filter by</MenuLabel>
                                            <MenuItem>Active</MenuItem>
                                            <MenuItem>Draft</MenuItem>
                                            <MenuItem>Archived</MenuItem>
                                        </MenuDropdown>
                                    </Menu> */}
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
                                    <ContractSearchArea
                                        isOpen={isSearchAreaOpen}
                                        onClose={() =>
                                            setIsSearchAreaOpen(false)
                                        }
                                    />

                                    <ActionIcon variant="outline" size="lg">
                                        <IconFile size="1.1rem" />
                                    </ActionIcon>

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
                            <TabsPanel value="created">
                                <ContractListTablePresentation
                                    contracts={contracts.contracts}
                                    // columns={columns}
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
