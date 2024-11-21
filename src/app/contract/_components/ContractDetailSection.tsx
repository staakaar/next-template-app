"use client";
import { Title } from "@mantine/core";
import useContractStore from "@/stores/contracts/ContractStore";

const ContractDetailSection = () => {
    const contract = useContractStore();
    console.log(contract);
    if (!contract) return;

    return (
        <Title className="text-3xl font-bold flex justify-start">
            {/* 契約書コード、案件名、発行分類・種別ステータスはバッジで表示する */}
            {"契約書詳細"}
        </Title>
    );
};

export default ContractDetailSection;
