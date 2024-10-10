import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Box, Heading } from "@chakra-ui/react";
import ContractDetailsPresentational from "../../presentational/contractDetails/ContractDetailsPresentational";

const ContractDetailsContainer = () => {
    return (
        <>
            <Box>
                <Box className="flex items-center justify-between">
                    <Heading className="mt-4 mb-6">契約書明細</Heading>
                    {/* 詳細時は更新ボタン */}
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded hover:shadow-lg transition-all duration-200">
                        更新
                    </Button>
                </Box>
                <Separator className="mt-4" />
                <div className="grid gap-3">
                    <ContractDetailsPresentational />
                </div>
            </Box>
            {/* タブ 明細一覧と追加を用意 追加はCarouselで複数保存可能にする */}
        </>
    );
};

export default ContractDetailsContainer;
