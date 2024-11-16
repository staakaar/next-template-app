"use client";
import {
    Button,
    Paper,
    Stack,
    Title,
    Group,
    Divider,
    Box,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import ContractBasicPresentationalForm from "../presentational/ContractBasicPresentationalForm";
import { Suspense, useEffect } from "react";
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
import { ErrorBoundary } from "react-error-boundary";
import Loading from "../atoms/Loading";

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
    // 状態管理
    const contractBasic = useRecoilValue(contractBasicFormState);
    const setContractData = useSetRecoilState(contractBasicFormState);

    const form = useForm<z.infer<typeof contractBasicFormSchema>>({
        resolver: zodResolver(contractBasicFormSchema),
        defaultValues: isEdit ? contractBasic : defaultContractBasicForm,
    });

    useEffect(() => {
        if (isEdit && contractCode) {
            const fetchContractBasic = async () => {
                try {
                    const response = await fetch(
                        `api/contracts/${contractCode}`
                    );
                    const data = await response.json();
                    form.reset(data);
                } catch (error) {
                    console.log("基本情報の取得に失敗しました。", error);
                    notifications.show({
                        title: "エラー",
                        message: "エラーが発生しました。",
                        color: "red",
                    });
                }
            };

            fetchContractBasic();
        }
    }, [isEdit, contractCode, form]);

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
            notifications.show({
                title: isEdit ? "更新完了" : "登録完了",
                message: "エラーが発生しました。",
                color: "red",
            });
        } else {
            notifications.show({
                title: "エラー",
                message: "エラーが発生しました。",
                color: "red",
            });
        }
    };

    return (
        <Paper shadow="xs" p="md">
            <Stack>
                <Group align="center" justify="space-between">
                    <Title className="mt-4">基本情報</Title>
                    {/* 詳細時は更新ボタン */}
                    <Group>
                        {isEdit ? (
                            <Button
                                type="submit"
                                onClick={form.handleSubmit(onSubmit)}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded hover:shadow-lg transition-all duration-200"
                            >
                                更新
                            </Button>
                        ) : (
                            <>
                                <Button
                                    type="submit"
                                    onClick={form.handleSubmit(onSubmit)}
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded hover:shadow-lg transition-all duration-200"
                                >
                                    登録
                                </Button>
                            </>
                        )}
                    </Group>
                </Group>
            </Stack>
            <Divider className="mt-2" />
            <Box className="grid gap-3">
                <ErrorBoundary fallback={<p>契約書基本情報</p>}>
                    <Suspense fallback={<Loading />}>
                        <ContractBasicPresentationalForm form={form} />
                    </Suspense>
                </ErrorBoundary>
            </Box>
        </Paper>
    );
};
export default ContractBasicContainer;
