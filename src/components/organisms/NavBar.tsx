"use client";
import {
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    IconButton,
    List,
    ListIcon,
    ListItem,
    Menu,
    MenuButton,
    Stack,
    useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon, SunIcon } from "@chakra-ui/icons";
import { useRef } from "react";

export const Navbar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef();

    return (
        <>
            <Box as="nav" role="navigation" bg="bg.accent.default">
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Menu>
                        <MenuButton
                            as={IconButton}
                            aria-label="Options"
                            icon={<HamburgerIcon />}
                            variant="outline"
                            onClick={onOpen}
                            colorScheme="gray"
                            ref={btnRef}
                        />
                    </Menu>
                </Box>
            </Box>
            <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>メニュー</DrawerHeader>

                    <DrawerBody>
                        <Stack spacing="24px">
                            <Box minH="100%" minW="250px">
                                <List minH="inherit">
                                    <ListItem minH="50px">
                                        <ListIcon
                                            as={SunIcon}
                                            color="red.300"
                                        />
                                        テスト1
                                    </ListItem>
                                    <ListItem minH="50px">
                                        <ListIcon
                                            as={SunIcon}
                                            color="red.300"
                                        />
                                        テスト2
                                    </ListItem>
                                    <ListItem minH="50px">
                                        <ListIcon
                                            as={SunIcon}
                                            color="red.300"
                                        />
                                        テスト3
                                    </ListItem>
                                </List>
                            </Box>
                        </Stack>
                    </DrawerBody>

                    <DrawerFooter borderTopWidth="1px">
                        <Button variant="outline" mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
};
