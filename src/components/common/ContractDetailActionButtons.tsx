"use client";
import { useContractBasicStore } from "@/stores/contractBasic/ContractBasicStore";
import { Button } from "@mantine/core";

const ContractDetailActionButtons = () => {
    const { contractBasic } = useContractBasicStore();
    const contractStatus = contractBasic.status;

    return (
        <>
            {/* 基本情報を保存した瞬間に非表示 */}
            <Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded hover:shadow-lg transition-all duration-200">
                キャンセル
            </Button>
            {/* 基本情報とファイルの登録をしている場合は表示 */}
            <Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded hover:shadow-lg transition-all duration-200">
                アプローチ
            </Button>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded hover:shadow-lg transition-all duration-200">
                出力
            </Button>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded hover:shadow-lg transition-all duration-200">
                コピー
            </Button>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded hover:shadow-lg transition-all duration-200">
                WF
            </Button>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded hover:shadow-lg transition-all duration-200">
                発行
            </Button>
        </>
    );
};

export default ContractDetailActionButtons;
