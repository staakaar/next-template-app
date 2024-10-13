"use client";
import { Badge } from "@/components/ui/badge";
import { selectedContractSelector } from "@/stores/contracts/atom";
import { Heading, HStack } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";

const ContractDetailSection = () => {
    const contract = useRecoilValue(selectedContractSelector);
    console.log(contract);
    if (!contract) return;

    return (
        <Heading className="text-md font-bold flex justify-start mt-4">
            {/* 契約書コード、案件名、発行分類・種別ステータスはバッジで表示する */}
            <HStack spacing={2} align="stretch">
                <Badge variant="destructive">{contract.contractCode}</Badge>
                <Badge variant="destructive">{contract.contractStatus}</Badge>
                <Badge variant="destructive">{contract.contractName}</Badge>
            </HStack>
        </Heading>
    );
};

export default ContractDetailSection;
