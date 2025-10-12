"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import ContractBasicPresentationalForm from "../presentational/ContractBasicPresentationalForm";
import {
    saveContractBasic,
    updateContractBasic,
} from "@/lib/contractBasic/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    useContractBasicStore,
    defaultContractBasicForm,
} from "@/stores/contractBasic/ContractBasicStore";
import {
    ContractBasicForm,
    contractBasicFormSchema,
} from "@/lib/contractBasic/schema";
import { z } from "zod";
import { useContractBasic } from "@/api/contract-basic/contract-basic";

export type ContractBasicContainerProps = {
    isEdit: boolean;
    contractCode: string; // 新規作成時は空
    handleNext?: () => void;
    handlePrevious?: () => void;
};

const ContractBasicContainer = ({
    isEdit,
    contractCode = "",
    handleNext,
    handlePrevious,
}: ContractBasicContainerProps) => {
    // fetch
    const { contractBasic, isLoading, isError, mutate } =
        useContractBasic(contractCode);
    // 状態管理
    // const { setContractBasic } = useContractBasicStore();

    const form = useForm<z.infer<typeof contractBasicFormSchema>>({
        resolver: zodResolver(contractBasicFormSchema),
        defaultValues: isEdit ? contractBasic : defaultContractBasicForm,
    });

    const save = () => {};

    const update = () => {};

    // 新規作成と更新時
    const onSubmit = async (request: ContractBasicForm) => {
        let result;
        if (isEdit) {
            result = await updateContractBasic(contractCode);
        } else {
            result = await saveContractBasic(request);
        }

        await mutate();

        if (result) {
            // 成功後の処理（例：次のステップに進む、リダイレクトするなど）
            toast.success(isEdit ? "更新完了" : "登録完了", {
                description: "エラーが発生しました。",
            });
        } else {
            toast.error("エラー", {
                description: "エラーが発生しました。",
            });
        }
    };

    return (
        <div className="mt-4 rounded-lg border bg-card p-6 shadow-sm">
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <h2 className="mt-4 text-2xl font-bold">基本情報</h2>
                    <div className="flex gap-2">
                        {isEdit ? (
                            <Button
                                type="submit"
                                onClick={form.handleSubmit(onSubmit)}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded hover:shadow-lg transition-all duration-200"
                            >
                                更新
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                onClick={form.handleSubmit(onSubmit)}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded hover:shadow-lg transition-all duration-200"
                            >
                                登録
                            </Button>
                        )}
                    </div>
                </div>
            </div>
            <Separator className="mt-2" />
            <div className="grid gap-3">
                <ContractBasicPresentationalForm form={form} />
            </div>
        </div>
    );
};

export default ContractBasicContainer;
