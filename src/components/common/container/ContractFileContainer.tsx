import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Box, Heading } from "@chakra-ui/react";
import ContractFilePresentational from "../presentational/ContractFilePresentational";

const ContractFileContainer = () => {
    return (
        <Box>
            <Box className="flex items-center justify-between">
                <Heading className="mt-4 mb-6">契約書ファイル</Heading>
                {/* 詳細時は更新ボタン */}
                <Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded hover:shadow-lg transition-all duration-200">
                    更新
                </Button>
            </Box>
            <Separator className="mt-4" />
            <div className="grid gap-3">
                <ContractFilePresentational />
            </div>
        </Box>
    );
};

export default ContractFileContainer;
