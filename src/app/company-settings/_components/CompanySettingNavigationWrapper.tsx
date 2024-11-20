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
} from "@mantine/core";
import { useState } from "react";
import CompanySettingNavigationMenu from "./CompanySettingNavigationMenu";

const navigationItems = [
    { label: "テスト1", path: "test1" },
    { label: "テスト2", path: "test2" },
    { label: "テスト3", path: "test3" },
    { label: "テスト4", path: "test4" },
    { label: "テスト5", path: "test5" },
    { label: "テスト6", path: "test6" },
];

const CompanySettingNavigationWrapper = () => {
    const [activeItem, setActiveItem] = useState<string>("test1");

    const handleNavClick = (path: string) => {
        setActiveItem(path);
    };

    return (
        <>
            <CompanySettingNavigationMenu
                items={navigationItems}
                activeItem={activeItem}
                handleNavClick={(path: string) => handleNavClick(path)}
            />
            <Stack style={{ flex: 1 }}>
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

                <Card shadow="sm" padding="lg" radius="md" withBorder>
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
            </Stack>
        </>
    );
};

export default CompanySettingNavigationWrapper;
