import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useOwnCompany } from "@/api/own-company/own-company";
import { OwnCompanyForm, ownCompanyFormSchema } from "@/lib/ownCompany/schema";
import { defaultOwnCompanyForm } from "@/stores/ownCompany/OwnCompanyStore";
import {
    Box,
    Button,
    Divider,
    Group,
    Paper,
    Stack,
    Title,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { saveOwnCompany, updateOwnCompany } from "@/lib/ownCompany/api";
import OwnCompanyPresentationalForm from "../presentational/OwnCompanyPresentationalForm";

export type OwnCompanyContainerProps = {
    isEdit: boolean;
    contractCode: string; // 新規作成時は空
    // handleNext?: () => void;
    // handlePrevious?: () => void;
};

const OwnCompanyContainer = ({
    isEdit,
    contractCode = "",
}: OwnCompanyContainerProps) => {
    // fetch
    const { ownCompany, isLoading, isError, mutate } =
        useOwnCompany(contractCode);

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
            result = await updateOwnCompany(contractCode);
        } else {
            result = await saveOwnCompany(request);
        }

        await mutate();

        if (result) {
            // 成功後の処理（例：次のステップに進む、リダイレクトするなど）
            notifications.show({
                title: isEdit ? "更新完了" : "登録完了",
                message: `${isEdit ? "更新" : "登録"}が成功しました。`,
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
                    <Title className="mt-4">自社情報</Title>
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
                <OwnCompanyPresentationalForm form={form} />
            </Box>
        </Paper>
    );
};

export default OwnCompanyContainer;
