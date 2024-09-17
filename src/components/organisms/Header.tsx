"use client";
import {
    Box,
    Button,
    Container,
    Flex,
    HStack,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
} from "@chakra-ui/react";
import { Navbar } from "./NavBar";
import { IconButton } from "@chakra-ui/react";
import { TriangleDownIcon } from "@chakra-ui/icons";
import { ChevronDown, SearchIcon } from "lucide-react";
import Link from "next/link";

const Header = () => {
    return (
        <Container
            minWidth="100vw"
            minHeight="5vh"
            p="4"
            borderBottom={"solid"}
            borderColor={"gray.100"}
        >
            {/* <HStack justifyContent={"space-between"}> */}
            <Flex justifyContent="space-between">
                <Flex as="header" justifyContent="flex-start">
                    <Box>
                        <Navbar></Navbar>
                    </Box>
                    <Box
                        fontWeight="bold"
                        fontSize="lg"
                        marginLeft="20px"
                        marginTop="6px"
                    >
                        サービス名
                    </Box>
                    <Box marginLeft="100px" marginTop="6px">
                        <Menu>
                            <MenuButton
                                as={Button}
                                variant="link"
                                leftIcon={<ChevronDown />}
                                _hover={{ textDecoration: "none" }}
                            >
                                管理
                            </MenuButton>
                            <MenuList>
                                <MenuItem>
                                    <Link href="">契約書一覧</Link>
                                </MenuItem>
                                <MenuItem>
                                    <Link href="">契約書一覧発行</Link>
                                </MenuItem>
                            </MenuList>
                        </Menu>
                        <Menu autoSelect>
                            <MenuButton
                                marginLeft="100px"
                                as={Button}
                                variant="link"
                                leftIcon={<ChevronDown />}
                                _hover={{ textDecoration: "none" }}
                            >
                                設定
                            </MenuButton>
                            <MenuList>
                                <MenuItem>
                                    <Link href="">契約書一覧</Link>
                                </MenuItem>
                                <MenuItem>
                                    <Link href="">契約書一覧発行</Link>
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </Box>
                </Flex>
                <Flex as="header" justifyContent="flex-end">
                    <Box>
                        <HStack>
                            <IconButton
                                icon={<SearchIcon />}
                                aria-label={"button"}
                                bg={"none"}
                            />
                            <Menu>
                                <MenuButton
                                    aria-label="user profile"
                                    as={IconButton}
                                    icon={<TriangleDownIcon />}
                                    bg={"none"}
                                ></MenuButton>
                                <MenuList>
                                    <MenuItem>ユーザー名</MenuItem>
                                    <MenuItem>ヘルプ</MenuItem>
                                </MenuList>
                            </Menu>
                        </HStack>
                    </Box>
                </Flex>
            </Flex>
            {/* </HStack> */}
        </Container>
    );
};
export default Header;
