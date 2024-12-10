import { ownCompanyFormSchema } from "@/lib/ownCompany/schema";
import {
    Autocomplete,
    Box,
    Checkbox,
    ComboboxItem,
    HoverCard,
    HoverCardDropdown,
    HoverCardTarget,
    LoadingOverlay,
    OptionsFilter,
    Select,
    SimpleGrid,
    Stack,
    Textarea,
    TextInput,
    Text,
    Tooltip,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

type OwnCompanyFormValues = z.infer<typeof ownCompanyFormSchema>;

interface OwnCompanyFormProps {
    form: ReturnType<typeof useForm<OwnCompanyFormValues>>;
}

const OwnCompanyPresentationalForm = ({ form }: OwnCompanyFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = form;

    // 名義情報の検索
    const optionsFilter: OptionsFilter = ({ options, search }) => {
        const splittedSearch = search.toLowerCase().trim().split(" ");
        return (options as ComboboxItem[]).filter((option) => {
            const words = option.label.toLowerCase().trim().split(" ");
            return splittedSearch.every((searchWord) =>
                words.some((word) => word.includes(searchWord))
            );
        });
    };

    return (
        <Box className="mt-10">
            <LoadingOverlay visible={form.formState.isSubmitting} />
            <form>
                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
                    <Autocomplete
                        label="自社担当者"
                        placeholder="自社担当者"
                        data={["APIで取得", "したデータ", "をセット"]}
                        filter={optionsFilter}
                        error={errors.ownCompanyPersonInCharge?.message}
                    />
                    <Autocomplete
                        label="担当部署"
                        placeholder="担当部署"
                        data={["APIで取得", "したデータ", "をセット"]}
                        filter={optionsFilter}
                        error={errors.ownCompanyDepartmentName?.message}
                    />
                    <TextInput
                        label="外部リンク"
                        error={errors.externalLink?.message}
                        {...register("externalLink")}
                        disabled={form.formState.isSubmitting}
                        required
                    />
                    <HoverCard width={280} shadow="md">
                        <HoverCardTarget>
                            <Checkbox
                                label="解除要項"
                                error={errors.isCancellation?.message}
                                {...register("isCancellation")}
                            />
                        </HoverCardTarget>
                        <HoverCardDropdown>
                            <Text size="sm">
                                契約書の解約済みであるかを確認するフラグです。
                            </Text>
                        </HoverCardDropdown>
                    </HoverCard>
                </SimpleGrid>
                <Stack mt="lg">
                    <Textarea
                        label=""
                        error={errors.cancellationText?.message}
                        {...register("cancellationText")}
                        disabled={form.formState.isSubmitting}
                        minRows={3}
                    />
                </Stack>
                {/* <Stack mt="lg">
                    <Tooltip
                        label="契約書の解約済みであるかを確認するフラグです。"
                        refProp="rootRef"
                    >
                        <Checkbox label="解約済み" onChange={(value) => {}} />
                    </Tooltip>
                    <Tooltip label="テスト1フラグです。" refProp="rootRef">
                        <Checkbox label="テスト1" onChange={(value) => {}} />
                    </Tooltip>
                    <Tooltip label="テスト2フラグです。" refProp="rootRef">
                        <Checkbox label="テスト2" onChange={(value) => {}} />
                    </Tooltip>
                </Stack> */}
            </form>
        </Box>
    );
};

export default OwnCompanyPresentationalForm;
