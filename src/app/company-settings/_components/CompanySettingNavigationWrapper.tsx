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
    rem,
} from "@mantine/core";
import { useState } from "react";
import { IconSettings } from "@tabler/icons-react";

const iconStyle = { width: rem(12), height: rem(12) };

const companySettingTabs = [
    {
        id: "contract",
        label: "契約書",
        icon: <IconSettings style={iconStyle} />,
    },
    {
        id: "ownCompany",
        label: "自社情報",
        icon: <IconSettings style={iconStyle} />,
    },
    {
        id: "authority",
        label: "権限",
        icon: <IconSettings style={iconStyle} />,
    },
];

const CompanySettingNavigationWrapper = () => {
    // const [activeItem, setActiveItem] = useState<string>("test1");

    // const handleNavClick = (path: string) => {
    //     setActiveItem(path);
    // };
    const [activeMenu, setActiveMenu] = useState("contract");

    return (
        <>
            <Tabs
                defaultValue="contract"
                orientation="vertical"
                className="flex"
                variant="unstyled"
            >
                <Stack w={250}>
                    <TabsList>
                        {companySettingTabs.map((menu) => (
                            <TabsTab
                                key={menu.id}
                                value={menu.id}
                                color="blue"
                                mt={15}
                                onClick={() => setActiveMenu(menu.id)}
                                leftSection={menu.icon}
                                className={
                                    activeMenu === menu.id
                                        ? "text-blue-500"
                                        : ""
                                }
                            >
                                {menu.label}
                            </TabsTab>
                        ))}
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
