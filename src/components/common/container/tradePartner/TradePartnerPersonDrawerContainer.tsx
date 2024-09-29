import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Box } from "@chakra-ui/react";
import { Cross1Icon } from "@radix-ui/react-icons";
import TradePartnerPersonTableContainer from "./TradePartnerPersonTableContainer";

const TradePartnerPersonDrawerContainer = ({
    isOpen,
    setOpen,
    selectedRow,
}: any) => {
    const beforeDestroyDrawer = () => {
        /** ドロワー削除時に必要な値をリセットする */
    };

    return (
        <>
            <Drawer
                direction={"right"}
                onClose={() => beforeDestroyDrawer}
                open={isOpen}
                onOpenChange={setOpen}
            >
                <DrawerContent className="left-0 h-[100vh] w-[80vw] max-w-[80%] sm:max-w-[80%]">
                    <DrawerHeader>
                        <Box className="flex items-center justify-between space-x-4">
                            <Box className="flex items-center">
                                <DrawerClose>
                                    <Button variant={"outline"}>
                                        <Cross1Icon />
                                    </Button>
                                </DrawerClose>
                                <DrawerTitle>「 」取引先担当者一覧</DrawerTitle>
                            </Box>
                            <Box className="flex items-center">
                                <Button>追加</Button>
                                <Button>更新</Button>
                            </Box>
                        </Box>
                    </DrawerHeader>
                    <Box className="p-4 overflow-auto h-[calc(100vh - 100px)]">
                        <TradePartnerPersonTableContainer />
                    </Box>
                </DrawerContent>
            </Drawer>
            {/* drawer  */}
            {/* tradePartnerPersonTableContainer */}
            {/* tradePartnerPersonTablePresentation */}
        </>
    );
};

export default TradePartnerPersonDrawerContainer;
