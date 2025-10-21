"use client";
import useContractStore from "@/stores/contracts/ContractStore";

const ContractDetailSection = () => {
    const contract = useContractStore();
    console.log(contract);
    if (!contract) return;

    return (
        <h1 className="text-3xl font-bold flex justify-start">
            {/* 契約書コード、案件名、発行分類・種別ステータスはバッジで表示する */}
            {"契約書詳細"}
        </h1>
    );
};

export default ContractDetailSection;
