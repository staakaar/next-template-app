import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import TradePartnerPersonTableContainer from "./TradePartnerPersonTableContainer";
import React from "react";
import { TradePartner } from "@/types/api/tradePartner";

interface TradePartnerPersonDrawerContainerProps {
    opened: boolean;
    onClose: () => void;
    selectedRow: TradePartner;
}

const TradePartnerPersonDrawerContainer = ({
    opened,
    onClose,
    selectedRow,
}: TradePartnerPersonDrawerContainerProps) => {
    return (
        <Drawer open={opened} onOpenChange={onClose}>
            <DrawerContent className="fixed inset-y-0 right-0 h-full w-full max-w-full border-l">
                <DrawerHeader>
                    <div className="flex justify-between">
                        <div className="flex items-center">
                            <DrawerClose asChild>
                                <Button variant="ghost" size="icon" className="mr-2">
                                    <X className="h-4 w-4" />
                                </Button>
                            </DrawerClose>
                            「」取引先担当者一覧
                        </div>
                        <div className="flex items-center gap-4">
                            <Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded hover:shadow-lg transition-all duration-200">
                                追加
                            </Button>
                            <Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded hover:shadow-lg transition-all duration-200">
                                更新
                            </Button>
                        </div>
                    </div>
                </DrawerHeader>
                <div className="p-4 overflow-auto h-[calc(100vh-100px)]">
                    <TradePartnerPersonTableContainer />
                </div>
            </DrawerContent>
        </Drawer>
    );
};

export default TradePartnerPersonDrawerContainer;
