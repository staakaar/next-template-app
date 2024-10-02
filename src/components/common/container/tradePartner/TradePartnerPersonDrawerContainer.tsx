import { Button } from "@/components/ui/button";
import {
    Box,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
} from "@chakra-ui/react";
import { Cross1Icon } from "@radix-ui/react-icons";
import TradePartnerPersonTableContainer from "./TradePartnerPersonTableContainer";
import React from "react";

const TradePartnerPersonDrawerContainer = ({
    onOpen,
    onClose,
    selectedRow,
}: any) => {
    const beforeDestroyDrawer = () => {
        /** ドロワー削除時に必要な値をリセットする */
    };

    return (
        <>
            {/* chakra uiへ変更する */}
            <Drawer onClose={() => beforeDestroyDrawer} isOpen={onOpen}>
                <DrawerContent className="left-0 h-[100vh] w-[80vw] max-w-[80%] sm:max-w-[80%]">
                    <DrawerHeader>
                        <Box className="flex items-center justify-between space-x-4">
                            <Box className="flex items-center">
                                <DrawerCloseButton />
                                {/* <Button variant={"outline"}>
                                        <Cross1Icon />
                                    </Button> */}
                                <Box>「 」取引先担当者一覧</Box>
                            </Box>
                            <Box className="flex items-center">
                                <Button>追加</Button>
                                <Button>更新</Button>
                            </Box>
                        </Box>
                    </DrawerHeader>
                    <DrawerBody className="p-4 overflow-auto h-[calc(100vh - 100px)]">
                        <TradePartnerPersonTableContainer />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
            {/* drawer  */}
            {/* tradePartnerPersonTableContainer */}
            {/* tradePartnerPersonTablePresentation */}
        </>
    );
};

export default TradePartnerPersonDrawerContainer;
