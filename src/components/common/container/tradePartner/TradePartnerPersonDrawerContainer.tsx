import {
    Drawer,
    Button,
    Box,
    DrawerHeader,
    DrawerBody,
    DrawerContent,
    DrawerCloseButton,
    DrawerOverlay,
} from "@mantine/core";
import TradePartnerPersonTableContainer from "./TradePartnerPersonTableContainer";
import React from "react";

const TradePartnerPersonDrawerContainer = ({
    opened,
    onClose,
    selectedRow,
}: any) => {
    return (
        <>
            <Drawer
                size="full"
                position="right"
                onClose={onClose}
                opened={opened}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader>
                        <Box className="flex justify-between">
                            <Box className="flex items-center">
                                <DrawerCloseButton left="0" top="0" />「
                                」取引先担当者一覧
                            </Box>
                            {/* </Box> */}
                            <Box className="flex items-center">
                                <Box>
                                    <Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded hover:shadow-lg transition-all duration-200">
                                        追加
                                    </Button>
                                </Box>
                                <Box className="ml-4">
                                    <Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded hover:shadow-lg transition-all duration-200">
                                        更新
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </DrawerHeader>
                    <DrawerBody className="p-4 overflow-auto h-[calc(100vh - 100px)]">
                        <TradePartnerPersonTableContainer />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default TradePartnerPersonDrawerContainer;
