"use client";
import { Box, Button, Icon } from "@chakra-ui/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
} from "@/components/ui/menubar";
import { IconButton } from "@chakra-ui/react";
import { QuestionOutlineIcon, SettingsIcon } from "@chakra-ui/icons";
import { CircleUser } from "lucide-react";
import Link from "next/link";

const Header = () => {
    return (
        // ヘッダー固定する
        <Box className="border-b">
            <Box className="flex h-16 items-center px-4 justify-between">
                <Box className="flex items-center">
                    <Box fontWeight="bold" fontSize="lg" marginLeft="20px">
                        <Link href={"/contract-all"}>サービス名</Link>
                    </Box>
                    <Box
                        as="nav"
                        className="flex items-center space-x-4 lg:space-x-4 mx-6 ml-20"
                    >
                        <Menubar className="ml-2 border-none focus:ring-0">
                            <MenubarMenu>
                                <Icon as={SettingsIcon} />
                                <MenubarTrigger>管理メニュー</MenubarTrigger>
                                <MenubarContent>
                                    <MenubarItem>
                                        <Icon as={SettingsIcon} />
                                        <Link
                                            href={"/contract-all"}
                                            className="ml-2"
                                        >
                                            契約書一覧
                                        </Link>
                                    </MenubarItem>
                                    <MenubarItem>
                                        <Icon as={SettingsIcon} />
                                        <Link href={""} className="ml-2">
                                            契約書【A】
                                        </Link>
                                    </MenubarItem>
                                    <MenubarItem>
                                        <Icon as={SettingsIcon} />
                                        <Link href={""} className="ml-2">
                                            契約書【B】
                                        </Link>
                                    </MenubarItem>
                                    <MenubarItem>
                                        <Icon as={SettingsIcon} />
                                        <Link href={""} className="ml-2">
                                            WF
                                        </Link>
                                    </MenubarItem>
                                    <MenubarSeparator />
                                </MenubarContent>
                            </MenubarMenu>
                            <MenubarMenu>
                                <Icon as={SettingsIcon}></Icon>
                                <MenubarTrigger>設定メニュー</MenubarTrigger>
                                <MenubarContent>
                                    <MenubarItem>
                                        <Icon as={SettingsIcon} />
                                        <Link
                                            href={"/user-settings"}
                                            className="ml-2"
                                        >
                                            項目設定{" "}
                                        </Link>
                                    </MenubarItem>
                                    <MenubarItem>
                                        <Icon as={SettingsIcon} />
                                        <Link
                                            href={"/user-settings"}
                                            className="ml-2"
                                        >
                                            セクション{" "}
                                        </Link>
                                    </MenubarItem>
                                    <MenubarItem>
                                        <Icon as={SettingsIcon} />
                                        <Link
                                            href={"/user-settings"}
                                            className="ml-2"
                                        >
                                            個人設定{" "}
                                        </Link>
                                    </MenubarItem>
                                    <MenubarItem>
                                        <Icon as={SettingsIcon} />
                                        <Link
                                            href={"/company-settings"}
                                            className="ml-2"
                                        >
                                            会社設定
                                        </Link>
                                    </MenubarItem>
                                    <MenubarSeparator />
                                </MenubarContent>
                            </MenubarMenu>
                        </Menubar>
                    </Box>
                </Box>
                <Box className="flex items-center">
                    <Box className="flex items-center">
                        <Box className="space-x-4">
                            <IconButton
                                aria-label={"button"}
                                icon={<QuestionOutlineIcon />}
                                bg={"white"}
                            />
                        </Box>
                        <Box className="space-x-4 ml-4">
                            <p>会社名</p>
                        </Box>
                        <Box className="space-x-4 ml-4">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="secondary"
                                        size="icon"
                                        className="rounded-full"
                                    >
                                        <CircleUser className="h-5 w-5" />
                                        <span className="sr-only">
                                            Toggle user menu
                                        </span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>
                                        My Account
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        Settings
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>Support</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>Logout</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
export default Header;
