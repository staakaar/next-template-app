"use client";

import { useState } from "react";
import {
    Collapse,
    Button,
    Group,
    Box,
    TextInput,
    Select,
    Stack,
    Grid,
    ActionIcon,
    GridCol,
    TabsList,
    TabsTab,
    Tabs,
    TabsPanel,
} from "@mantine/core";
import { IconSearch, IconRefresh, IconDownload } from "@tabler/icons-react";
import { DatePickerInput } from "@mantine/dates";

interface ContractSearchAreaProps {
    isOpen: boolean;
    onClose: () => void;
}

export type ContractSearchCondition = {
    keyword: string;
    // 契約情報
    contractCode: string;
    contractName: string;
    contractStatus: string;
    issueanceType: string;
    contractType: string;
    startDate: Date | null;
    endDate: Date | null;

    // 自社情報
    ownCompanyPersonInCharge: string;

    // 部署
    departmentId: string;
};

const ContractSearchArea = ({ isOpen, onClose }: ContractSearchAreaProps) => {
    // 検索タブ
    const [activeTab, setActiveTab] = useState("basic");

    // 検索条件
    const [searchParams, setSearchParams] = useState({
        keyword: "",
        contractCode: "",
        contractName: "",
        contractStatus: "",
        issueanceType: "",
        contractType: "",
        startDate: new Date(),
        endDate: new Date(),
        ownCompanyPersonInCharge: "",
        departmentId: "",
    } as ContractSearchCondition);

    // 検索条件の状態管理Zustand

    // 検索条件をリセット
    const handleReset = () => {};

    // 検索
    const handleSearch = () => {};

    // CSVエクスポート
    const handleExport = () => {};

    return (
        <Box mb="sm">
            <Collapse in={isOpen}>
                <Tabs defaultValue="basic">
                    <TabsList>
                        <TabsTab value="basic">基本情報</TabsTab>
                        <TabsTab value="ownCompany">自社情報</TabsTab>
                        <TabsTab value="department">部署情報</TabsTab>
                    </TabsList>

                    <Box p="md">
                        <Stack>
                            <TabsPanel value="basic">
                                <Grid>
                                    <Grid.Col span={6}>
                                        <TextInput
                                            label="キーワード"
                                            placeholder="検索キーワードを入力"
                                            value={searchParams.keyword}
                                            onChange={(e) =>
                                                setSearchParams({
                                                    ...searchParams,
                                                    keyword:
                                                        e.currentTarget.value,
                                                })
                                            }
                                        />
                                    </Grid.Col>
                                    <Grid.Col span={6}>
                                        <Select
                                            label="ステータス"
                                            placeholder="選択してください"
                                            value={searchParams.contractStatus}
                                            onChange={(value) =>
                                                setSearchParams({
                                                    ...searchParams,
                                                    contractStatus: value || "",
                                                })
                                            }
                                            data={[
                                                {
                                                    value: "active",
                                                    label: "有効",
                                                },
                                                {
                                                    value: "inactive",
                                                    label: "無効",
                                                },
                                                {
                                                    value: "pending",
                                                    label: "保留中",
                                                },
                                            ]}
                                        />
                                    </Grid.Col>
                                    <Grid.Col span={6}>
                                        <DatePickerInput
                                            type="range"
                                            label="期間"
                                            placeholder="期間を選択"
                                            value={[
                                                searchParams.startDate,
                                                searchParams.endDate,
                                            ]}
                                            onChange={([start, end]) =>
                                                setSearchParams({
                                                    ...searchParams,
                                                    startDate: start,
                                                    endDate: end,
                                                })
                                            }
                                        />
                                    </Grid.Col>
                                    <Grid.Col span={6}>
                                        <Select
                                            label="カテゴリ"
                                            placeholder="選択してください"
                                            value={searchParams.contractType}
                                            onChange={(value) =>
                                                setSearchParams({
                                                    ...searchParams,
                                                    contractType: value || "",
                                                })
                                            }
                                            data={[
                                                {
                                                    value: "category1",
                                                    label: "カテゴリ1",
                                                },
                                                {
                                                    value: "category2",
                                                    label: "カテゴリ2",
                                                },
                                                {
                                                    value: "category3",
                                                    label: "カテゴリ3",
                                                },
                                            ]}
                                        />
                                    </Grid.Col>
                                </Grid>
                            </TabsPanel>
                            {/* ボタングループ */}
                            <Group mt="md" flex={1} justify="center">
                                <Button
                                    variant="subtle"
                                    color="gray"
                                    leftSection={<IconRefresh size="1rem" />}
                                    onClick={handleReset}
                                >
                                    条件をリセット
                                </Button>
                                <Group>
                                    <Button
                                        leftSection={<IconSearch size="1rem" />}
                                        onClick={handleSearch}
                                    >
                                        検索
                                    </Button>
                                    <Button
                                        variant="outline"
                                        leftSection={
                                            <IconDownload size="1rem" />
                                        }
                                        onClick={handleExport}
                                    >
                                        CSVエクスポート
                                    </Button>
                                </Group>
                            </Group>
                        </Stack>
                    </Box>
                </Tabs>
            </Collapse>
        </Box>
    );
};

export default ContractSearchArea;
