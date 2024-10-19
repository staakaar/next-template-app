import { Box, Heading } from "@chakra-ui/react";
import ContractBasicPresentationalForm from "../presentational/ContractBasicPresentationalForm";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useEffect } from "react";
import {
    saveContractBasic,
    updateContractBasic,
} from "@/lib/contractBasic/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
    contractBasicFormState,
    defaultContractBasicForm,
} from "@/stores/contractBasic/atom";
import {
    ContractBasicFormData,
    contractBasicFormSchema,
} from "@/lib/contractBasic/schema";
import { z } from "zod";

export type ContractBasicContainerProps = {
    isEdit: boolean;
    contractCode: string; // 新規作成時は空
    handleNext: () => void;
    handlePrevious: () => void;
};

const ContractBasicContainer = ({
    isEdit,
    contractCode = "",
    handleNext,
    handlePrevious,
}: ContractBasicContainerProps) => {
    // 状態管理
    const contractBasic = useRecoilValue(contractBasicFormState);
    const setContractData = useSetRecoilState(contractBasicFormState);

    const form = useForm<z.infer<typeof contractBasicFormSchema>>({
        resolver: zodResolver(contractBasicFormSchema),
        defaultValues: isEdit ? contractBasic : defaultContractBasicForm,
    });

    useEffect(() => {
        if (isEdit && contractCode) {
            // fetch contractBasic
            // reset useFormの内容を
        }
    }, [isEdit, contractCode, form.reset]);

    const save = () => {};

    const update = () => {};

    // 新規作成と更新時
    const onSubmit = async (request: ContractBasicFormData) => {
        let result;
        if (isEdit) {
            result = await updateContractBasic(contractCode);
        } else {
            result = await saveContractBasic(request);
        }

        if (result) {
            // 成功後の処理（例：次のステップに進む、リダイレクトするなど）
        } else {
            throw new Error("Server responded with an error");
        }
    };

    return (
        <Box>
            <Box className="flex items-center justify-between">
                <Heading className="mt-4 mb-6">基本情報</Heading>
                {/* 詳細時は更新ボタン */}
                {isEdit ? (
                    <Button
                        onClick={form.handleSubmit(onSubmit)}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded hover:shadow-lg transition-all duration-200"
                    >
                        更新
                    </Button>
                ) : (
                    <>
                        <Box>
                            <Button
                                onClick={form.handleSubmit(onSubmit)}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded hover:shadow-lg transition-all duration-200"
                            >
                                登録
                            </Button>
                        </Box>
                    </>
                )}
            </Box>
            <Separator className="mt-2" />
            <div className="grid gap-3">
                <ContractBasicPresentationalForm form={form} />
            </div>
        </Box>
    );
};
export default ContractBasicContainer;
