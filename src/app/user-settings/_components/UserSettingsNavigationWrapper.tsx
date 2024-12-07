"use client";
import { IconSettings } from "@tabler/icons-react";
import {
    Button,
    Card,
    Checkbox,
    Group,
    rem,
    Stack,
    Tabs,
    TabsList,
    TabsPanel,
    TabsTab,
    TextInput,
    Title,
    Text,
} from "@mantine/core";
import { useState } from "react";

const iconStyle = { width: rem(12), height: rem(12) };

const userSettingTabs = [
    {
        id: "test1",
        label: "契約書",
        icon: <IconSettings style={iconStyle} />,
    },
    {
        id: "test2",
        label: "自社情報",
        icon: <IconSettings style={iconStyle} />,
    },
];

const UserSettingsNavigationWrapper = () => {
    const [activeMenu, setActiveMenu] = useState("contract");

    return (
        <>
            <Tabs
                defaultValue="test1"
                orientation="vertical"
                className="flex"
                variant="unstyled"
            >
                <Stack w={250}>
                    <TabsList>
                        {userSettingTabs.map((menu) => (
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
                    <TabsPanel value="test1">
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
                    <TabsPanel value="test2">
                        <div>test2</div>
                    </TabsPanel>
                </Stack>
            </Tabs>
        </>
    );
};

export default UserSettingsNavigationWrapper;
