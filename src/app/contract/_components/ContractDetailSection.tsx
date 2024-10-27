"use client";
import { Group, Title, Badge } from "@mantine/core";
import { useRecoilValue } from "recoil";
import { selectedContractSelector } from "@/stores/contracts/atom";

const ContractDetailSection = () => {
    const contract = useRecoilValue(selectedContractSelector);
    console.log(contract);
    if (!contract) return;

    return (
        <Title className="text-md font-bold flex justify-start mt-4">
            {/* 契約書コード、案件名、発行分類・種別ステータスはバッジで表示する */}
            {"契約書詳細"}
            <Group align="stretch">
                <Badge variant="destructive">{contract.contractCode}</Badge>
                <Badge variant="destructive">{contract.contractStatus}</Badge>
                <Badge variant="destructive">{contract.contractName}</Badge>
            </Group>
        </Title>
    );
};

export default ContractDetailSection;
