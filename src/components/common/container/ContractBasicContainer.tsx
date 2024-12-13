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
        <Paper shadow="xs" p="md" className="mt-4">
            <Stack>
                <Group align="center" justify="space-between">
                    <Title className="mt-4">基本情報</Title>
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
                            <Button
                                type="submit"
                                onClick={form.handleSubmit(onSubmit)}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded hover:shadow-lg transition-all duration-200"
                            >
                                登録
                            </Button>
                        )}
                    </Group>
                </Group>
            </Stack>
            <Divider className="mt-2" />
            <Box className="grid gap-3">
                <ContractBasicPresentationalForm form={form} />
            </Box>
        </Paper>
    );
};

export default ContractBasicContainer;
