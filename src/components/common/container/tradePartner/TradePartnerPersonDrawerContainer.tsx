import { Button } from "@/components/ui/button";
import {
    Box,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
} from "@chakra-ui/react";
import TradePartnerPersonTableContainer from "./TradePartnerPersonTableContainer";
import React from "react";

const TradePartnerPersonDrawerContainer = ({
    isOpen,
    onClose,
    selectedRow,
}: any) => {
    return (
        <>
            <Drawer
                size="full"
                placement="right"
                onClose={onClose}
                isOpen={isOpen}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader>
                        <Box className="flex justify-between">
                            <Box className="flex items-center">
                                <DrawerCloseButton
                                    position="static"
                                    left="0"
                                    top="0"
                                    marginLeft="2"
                                />
                                「 」取引先担当者一覧
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
