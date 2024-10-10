"use client";
import { selectedContractSelector } from "@/stores/contracts/atom";
import { Badge, Box, Heading, VStack } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";

const ContractDetailSection = () => {
    const contract = useRecoilValue(selectedContractSelector);
    console.log(contract);
    if (!contract) return;

    return (
        <Heading className="text-md font-bold flex justify-start py-2">
            <Box>詳細画面</Box>
            {/* 契約書コード、案件名、発行分類・種別ステータスはバッジで表示する */}
            <VStack spacing={2} align="stretch" marginLeft={8}>
                <Badge fontSize="0.5em" variant="subtle" colorScheme="green">
                    契約書コード: {contract.contractCode}
                </Badge>
                <Badge fontSize="0.5em" variant="subtle" colorScheme="green">
                    契約書名: {contract.contractName}
                </Badge>
                <Badge fontSize="0.5em" variant="subtle" colorScheme="green">
                    ステータス: {contract.contractStatus}
                </Badge>
            </VStack>
        </Heading>
    );
};

export default ContractDetailSection;
