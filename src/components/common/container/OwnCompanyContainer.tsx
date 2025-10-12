"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useOwnCompany } from "@/api/own-company/own-company";
import { OwnCompanyForm, ownCompanyFormSchema } from "@/lib/ownCompany/schema";
import { defaultOwnCompanyForm } from "@/stores/ownCompany/OwnCompanyStore";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { saveOwnCompany, updateOwnCompany } from "@/lib/ownCompany/api";
import OwnCompanyPresentationalForm from "../presentational/OwnCompanyPresentationalForm";
import useContractStore from "@/stores/contracts/ContractStore";

export type OwnCompanyContainerProps = {
    isEdit: boolean;
    // contractCode: string; // 新規作成時は空
    // handleNext?: () => void;
    // handlePrevious?: () => void;
};

const OwnCompanyContainer = ({
    isEdit,
    // contractCode = "",
}: OwnCompanyContainerProps) => {
    const { selectedContractCode } = useContractStore();
    // fetch
    const { ownCompany, isLoading, isError, mutate } =
        useOwnCompany(selectedContractCode);

    const form = useForm<z.infer<typeof ownCompanyFormSchema>>({
        resolver: zodResolver(ownCompanyFormSchema),
        defaultValues: isEdit ? ownCompany : defaultOwnCompanyForm,
    });

    const save = () => {};

    const update = () => {};

    // 新規作成と更新時
    const onSubmit = async (request: OwnCompanyForm) => {
        let result;
        if (isEdit) {
            result = await updateOwnCompany(selectedContractCode);
        } else {
            result = await saveOwnCompany(request);
        }

        await mutate();

        if (result) {
            // 成功後の処理（例：次のステップに進む、リダイレクトするなど）
            toast.success(isEdit ? "更新完了" : "登録完了", {
                description: `${isEdit ? "更新" : "登録"}が成功しました。`,
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
                    <h2 className="mt-4 text-2xl font-bold">自社情報</h2>
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
                <OwnCompanyPresentationalForm form={form} />
            </div>
        </div>
    );
};

export default OwnCompanyContainer;
