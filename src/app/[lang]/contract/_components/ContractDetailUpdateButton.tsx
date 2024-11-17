"use client";
import { useState } from "react";
import { Button } from "@mantine/core";
import updateContractFiles from "@/lib/contractFile/api";
import { updateContractBasic } from "@/lib/contractBasic/api";
import { updateContractDetails } from "@/lib/contractDetails/api";

export function ContractDetailUpdateButton({
    activeTab,
    contractCode,
}: {
    activeTab: any;
    contractCode: any;
}) {
    const [isUpdating, setIsUpdating] = useState(false);

    const handleUpdate = async () => {
        setIsUpdating(true);
        try {
            switch (activeTab) {
                case "basic":
                    await updateContractBasic(contractCode);
                    break;
                case "details":
                    await updateContractDetails(contractCode);
                    break;
                case "files":
                    await updateContractFiles(contractCode);
                    break;
                default:
                    console.error("Unknown tab");
            }
            // 成功メッセージを表示
        } catch (error) {
            // エラーメッセージを表示
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <Button
            onClick={handleUpdate}
            disabled={isUpdating}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded hover:shadow-lg transition-all duration-200"
        >
            {isUpdating ? "更新中..." : "更新"}
        </Button>
    );
}
