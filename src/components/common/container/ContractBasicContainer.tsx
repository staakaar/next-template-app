import { postContractBasic } from "@/lib/contract/api";
import { ContractBasicForm } from "@/lib/contract/schema";
import { Box, Heading, useToast } from "@chakra-ui/react";
import ContractBasicPresentationalForm from "../presentational/ContractBasicPresentationalForm";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useEffect } from "react";
import {
    saveContractBasic,
    updateContractBasic,
} from "@/lib/contractBasic/api";

export type ContractBasicContainerProps = {
    isEdit: boolean;
    handleNext: () => void;
    handlePrevious: () => void;
};

const ContractBasicContainer = ({ isEdit }: ContractBasicContainerProps) => {
    // 保存データのフェッチ
    // ストアに格納
    // 子要素で抜き出してセット

    // 子要素でセットしたデータをserver actionsへ
    // 成功の場合成功トースター 失敗の場合は失敗のトースター
    // const onSubmit = async (data: ContractBasicForm) => {};

    useEffect(() => {
        if (isEdit && contractCode) {
            fetchContractBasic(contractId).then((data) => {
                reset(data);
            });
        }
    }, [isEdit, contractCode, reset]);

    const handleSkip = () => {
        // スキップ処理を実装
        console.log("Skipped");
        // 例: 次のステップに進む
    };

    const onSubmit = async (data) => {
        try {
            let result;
            if (isEdit) {
                result = await updateContractBasic(contractCode, data);
            } else {
                result = await saveContractBasic(data);
            }

            if (result.success) {
                // 成功後の処理（例：次のステップに進む、リダイレクトするなど）
            } else {
                throw new Error("Server responded with an error");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <Box>
            <Box className="flex items-center justify-between">
                <Heading className="mt-4 mb-6">基本情報</Heading>
                {/* 詳細時は更新ボタン */}
                {isEdit ? (
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded hover:shadow-lg transition-all duration-200">
                        更新
                    </Button>
                ) : (
                    <>
                        <Box>
                            <Button
                                onClick={handleSkip}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded hover:shadow-lg transition-all duration-200"
                            >
                                スキップ
                            </Button>
                            <Button
                                onClick={onSubmit}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded hover:shadow-lg transition-all duration-200"
                            >
                                登録
                            </Button>
                        </Box>
                    </>
                )}
            </Box>
            <Separator className="mt-4" />
            <div className="grid gap-3">
                <ContractBasicPresentationalForm />
            </div>
        </Box>
    );
};
export default ContractBasicContainer;
