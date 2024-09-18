"use client";
import { Box, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
} from "@/components/ui/menubar";
import { Navbar } from "./NavBar";
import { IconButton } from "@chakra-ui/react";
import { QuestionOutlineIcon } from "@chakra-ui/icons";
import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";

const Header = () => {
    return (
        <Box className="border-b">
            <Box className="flex h-16 items-center px-4 justify-between">
                <Box className="flex items-center">
                    <Navbar />
                    <Box fontWeight="bold" fontSize="lg" marginLeft="20px">
                        サービス名
                    </Box>
                    <Box
                        as="nav"
                        className="flex items-center space-x-4 lg:space-x-4 mx-6"
                    >
                        <Menubar className="space-x-4">
                            <MenubarMenu>
                                <MenubarTrigger>管理</MenubarTrigger>
                                <MenubarContent>
                                    <MenubarItem>
                                        <Link href={""}>契約書一覧</Link>
                                    </MenubarItem>
                                    <MenubarItem>
                                        <Link href={""}>契約書</Link>
                                    </MenubarItem>
                                    <MenubarSeparator />
                                </MenubarContent>
                            </MenubarMenu>
                            <MenubarMenu>
                                <MenubarTrigger>設定</MenubarTrigger>
                                <MenubarContent>
                                    <MenubarItem>
                                        <Link href={"/contract-all"}>
                                            契約書一覧
                                        </Link>
                                    </MenubarItem>
                                    <MenubarItem>
                                        <Link href={"/contract-all"}>
                                            契約書
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
                            <Menu>
                                <MenuButton
                                    aria-label={"button"}
                                    as={IconButton}
                                    icon={<ChevronDownIcon />}
                                    bg={"none"}
                                ></MenuButton>
                                <MenuList>
                                    <MenuItem>ユーザー名</MenuItem>
                                    <MenuItem>ヘルプ</MenuItem>
                                </MenuList>
                            </Menu>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
export default Header;
