"use client";
import {
    Card,
    TextInput,
    Button,
    Title,
    Text,
    Checkbox,
    Stack,
    Group,
    TabsTab,
    TabsPanel,
    Tabs,
    TabsList,
} from "@mantine/core";
import { useState } from "react";
import CompanySettingNavigationMenu from "./CompanySettingNavigationMenu";

// const companySettingTabs = [
//     { label: "テスト1", path: "test1" },
//     { label: "テスト2", path: "test2" },
//     { label: "テスト3", path: "test3" },
//     { label: "テスト4", path: "test4" },
//     { label: "テスト5", path: "test5" },
//     { label: "テスト6", path: "test6" },
// ];

const CompanySettingNavigationWrapper = () => {
    // const [activeItem, setActiveItem] = useState<string>("test1");

    // const handleNavClick = (path: string) => {
    //     setActiveItem(path);
    // };

    return (
        <>
            {/* <CompanySettingNavigationMenu
                items={navigationItems}
                activeItem={activeItem}
                handleNavClick={(path: string) => handleNavClick(path)}
            /> */}
            <Tabs
                defaultValue="contract"
                orientation="vertical"
                className="flex"
            >
                <Stack w={250}>
                    <TabsList>
                        <TabsTab value="contract">契約書</TabsTab>
                        <TabsTab value="ownCompany">自社情報</TabsTab>
                        <TabsTab value="authority">権限</TabsTab>
                    </TabsList>
                </Stack>

                <Stack w={900} ml={30} className="flex">
                    <TabsPanel value="contract">
                        <Card shadow="sm" padding="lg" radius="md" withBorder>
                            <Stack>
                                <Title order={3}>契約書設定</Title>
                                <Text c="dimmed" size="sm">
                                    説明
                                </Text>
                                <TextInput placeholder="Store Name" mt="md" />
                                <Group
                                    mt="md"
                                    pt="md"
                                    style={{ borderTop: "1px solid #eee" }}
                                >
                                    <Button>Save</Button>
                                </Group>
                            </Stack>
                        </Card>

                        <Card
                            mt={30}
                            shadow="sm"
                            padding="lg"
                            radius="md"
                            withBorder
                        >
                            <Stack>
                                <Title order={3}>設定</Title>
                                <Text c="dimmed" size="sm">
                                    説明
                                </Text>
                                <TextInput
                                    placeholder="プレイスホルダー"
                                    defaultValue=""
                                    mt="md"
                                />
                                <Checkbox label="有効" defaultChecked mt="sm" />
                                <Group
                                    mt="md"
                                    pt="md"
                                    style={{ borderTop: "1px solid #eee" }}
                                >
                                    <Button>Save</Button>
                                </Group>
                            </Stack>
                        </Card>
                    </TabsPanel>
                    <TabsPanel value="ownCompany">
                        <div>ownCompany</div>
                    </TabsPanel>
                    <TabsPanel value="authority">
                        <div>authority</div>
                    </TabsPanel>
                </Stack>
            </Tabs>
        </>
    );
};

export default CompanySettingNavigationWrapper;
