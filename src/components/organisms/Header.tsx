"use client";

import {
    Box,
    Group,
    Text,
    Menu,
    ActionIcon,
    Button,
    Avatar,
    Divider,
    MenuItem,
    MenuDropdown,
    MenuTarget,
    MenuLabel,
    MenuDivider,
} from "@mantine/core";
import {
    IconSettings,
    IconHelp,
    IconUser,
    IconFileText,
    IconBuildingSkyscraper,
    IconAdjustments,
    IconUserCircle,
    IconLogout,
    IconQuestionMark,
} from "@tabler/icons-react";
import Link from "next/link";
import LanguagePicker from "./LanguagePicker/LanguagePicker";

const Header = () => {
    return (
        <>
            <Box
                py="md"
                px="xl"
                style={{
                    borderBottom: "1px solid var(--mantine-color-gray-3)",
                }}
            >
                <Group flex={1} justify="space-between">
                    <Group>
                        <Text
                            component={Link}
                            href="/contract-all"
                            size="lg"
                            style={{ textDecoration: "none" }}
                        >
                            サービス名
                        </Text>

                        {/* 管理メニュー */}
                        <Group ml="xl">
                            <Menu shadow="md">
                                <MenuTarget>
                                    <Button
                                        variant="subtle"
                                        leftSection={
                                            <IconSettings size="1.2rem" />
                                        }
                                    >
                                        管理メニュー
                                    </Button>
                                </MenuTarget>

                                <MenuDropdown>
                                    <MenuItem
                                        leftSection={
                                            <IconFileText size="1.2rem" />
                                        }
                                        component={Link}
                                        href="/contract-all"
                                    >
                                        契約書一覧
                                    </MenuItem>
                                    <MenuItem
                                        leftSection={
                                            <IconFileText size="1.2rem" />
                                        }
                                        component={Link}
                                        href=""
                                    >
                                        契約書【A】
                                    </MenuItem>
                                    <MenuItem
                                        leftSection={
                                            <IconFileText size="1.2rem" />
                                        }
                                        component={Link}
                                        href=""
                                    >
                                        契約書【B】
                                    </MenuItem>
                                    <MenuItem
                                        leftSection={
                                            <IconSettings size="1.2rem" />
                                        }
                                        component={Link}
                                        href=""
                                    >
                                        WF
                                    </MenuItem>
                                    <Divider />
                                </MenuDropdown>
                            </Menu>

                            {/* 設定メニュー */}
                            <Menu shadow="md">
                                <MenuTarget>
                                    <Button
                                        variant="subtle"
                                        leftSection={
                                            <IconSettings size="1.2rem" />
                                        }
                                    >
                                        設定メニュー
                                    </Button>
                                </MenuTarget>

                                <MenuDropdown>
                                    <MenuItem
                                        leftSection={
                                            <IconAdjustments size="1.2rem" />
                                        }
                                        component={Link}
                                        href="/user-settings"
                                    >
                                        項目設定
                                    </MenuItem>
                                    <MenuItem
                                        leftSection={
                                            <IconAdjustments size="1.2rem" />
                                        }
                                        component={Link}
                                        href="/user-settings"
                                    >
                                        セクション
                                    </MenuItem>
                                    <MenuItem
                                        leftSection={
                                            <IconUserCircle size="1.2rem" />
                                        }
                                        component={Link}
                                        href="/user-settings"
                                    >
                                        個人設定
                                    </MenuItem>
                                    <MenuItem
                                        leftSection={
                                            <IconBuildingSkyscraper size="1.2rem" />
                                        }
                                        component={Link}
                                        href="/company-settings"
                                    >
                                        会社設定
                                    </MenuItem>
                                    <Divider />
                                </MenuDropdown>
                            </Menu>
                        </Group>
                    </Group>

                    {/* 右側: ヘルプ、会社名、ユーザーメニュー */}
                    <Group>
                        <LanguagePicker />
                        <ActionIcon
                            variant="subtle"
                            size="lg"
                            aria-label="Help"
                        >
                            <IconQuestionMark size="1.2rem" />
                        </ActionIcon>

                        <Text>会社名</Text>

                        <Menu shadow="md" position="bottom-end">
                            <MenuTarget>
                                <ActionIcon
                                    variant="subtle"
                                    size="lg"
                                    radius="xl"
                                >
                                    <Avatar
                                        size="sm"
                                        radius="xl"
                                        src={null}
                                        alt="User menu"
                                    >
                                        <IconUser size="1.2rem" />
                                    </Avatar>
                                </ActionIcon>
                            </MenuTarget>

                            <MenuDropdown>
                                <MenuLabel>My Account</MenuLabel>
                                <MenuDivider />
                                <MenuItem
                                    leftSection={<IconSettings size="1.2rem" />}
                                >
                                    Settings
                                </MenuItem>
                                <MenuItem
                                    leftSection={<IconHelp size="1.2rem" />}
                                >
                                    Support
                                </MenuItem>
                                <MenuDivider />
                                <MenuItem
                                    leftSection={<IconLogout size="1.2rem" />}
                                    color="red"
                                >
                                    Logout
                                </MenuItem>
                            </MenuDropdown>
                        </Menu>
                    </Group>
                </Group>
            </Box>
        </>
    );
};
export default Header;
