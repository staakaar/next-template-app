'use client'

import { Box, Button, Container, HStack, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { Navbar } from "./NavBar";
import { IconButton } from "@chakra-ui/react";
import { TriangleDownIcon } from "@chakra-ui/icons";

const Header = () => {
    return (
        <Container minWidth='100vw' minHeight='5vh' bg='gray.100' p='4'>
            <HStack justifyContent={"space-between"}>
                <Box>
                    <Navbar></Navbar>
                </Box>
                <Box>
                    <HStack>
                        <Navbar></Navbar>
                        <Menu>
                            <MenuButton aria-label="user profile" as={IconButton} icon={<TriangleDownIcon />}>
                            </MenuButton>
                            <MenuList>
                                <MenuItem>ユーザー名</MenuItem>
                                <MenuItem>ヘルプ</MenuItem>
                            </MenuList>
                        </Menu>
                    </HStack>
                </Box>
            </HStack>
        </Container>
    );
}
export default Header;