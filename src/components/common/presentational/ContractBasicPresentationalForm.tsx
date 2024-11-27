"use client";
import {
    Textarea,
    Box,
    TextInput,
    SimpleGrid,
    NumberInput,
    Stack,
    Select,
    LoadingOverlay,
    Checkbox,
    Autocomplete,
    OptionsFilter,
    ComboboxItem,
    Tooltip,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import React from "react";
import { contractBasicFormSchema } from "@/lib/contractBasic/schema";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";

type ContractBasicFormValues = z.infer<typeof contractBasicFormSchema>;

interface ContractBasicFormProps {
    form: ReturnType<typeof useForm<ContractBasicFormValues>>;
}

const ContractBasicPresentationalForm = ({ form }: ContractBasicFormProps) => {
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
                    <TextInput
                        label="契約書コード"
                        error={errors.contractCode?.message}
                        {...register("contractCode")}
                        disabled={form.formState.isSubmitting}
                        required
                    />
                    <TextInput
                        label="契約書名"
                        error={errors.contractName?.message}
                        {...register("contractName")}
                        disabled={form.formState.isSubmitting}
                        required
                    />
                    <TextInput
                        label="発行分類"
                        error={errors.issuanceType?.message}
                        {...register("issuanceType")}
                        disabled={form.formState.isSubmitting}
                        required
                    />
                    <TextInput
                        label="ステータス"
                        error={errors.status?.message}
                        {...register("status")}
                        disabled={form.formState.isSubmitting}
                        required
                    />
                    <Controller
                        name="contractConclusionDate"
                        control={control}
                        render={({ field }) => (
                            <DateInput
                                label="契約締結日"
                                error={errors.contractConclusionDate?.message}
                                {...register("contractConclusionDate")}
                                disabled={form.formState.isSubmitting}
                                onChange={(value) => field.onChange(value)}
                                required
                            />
                        )}
                    />
                    <Controller
                        name="contractStartDate"
                        control={control}
                        render={({ field }) => (
                            <DateInput
                                label="契約開始日"
                                error={errors.contractStartDate?.message}
                                {...register("contractStartDate")}
                                disabled={form.formState.isSubmitting}
                                onChange={(value) => field.onChange(value)}
                                required
                            />
                        )}
                    />
                    <Controller
                        name="contractEndDate"
                        control={control}
                        render={({ field }) => (
                            <DateInput
                                label="契約終了日"
                                error={errors.contractEndDate?.message}
                                {...register("contractEndDate")}
                                disabled={form.formState.isSubmitting}
                                onChange={(value) => field.onChange(value)}
                                required
                            />
                        )}
                    />
                    <Autocomplete
                        label="名義情報"
                        placeholder="名義情報"
                        data={["APIで取得", "したデータ", "をセット"]}
                        filter={optionsFilter}
                    />
                    <Controller
                        name="role"
                        control={control}
                        render={({ field }) => (
                            <Select
                                label="ロール"
                                error={errors.role?.message}
                                {...register("role")}
                                data={[
                                    { value: "admin", label: "admin" },
                                    { value: "user", label: "User" },
                                    { value: "manager", label: "Manager" },
                                ]}
                                disabled={form.formState.isSubmitting}
                                onChange={(value) => field.onChange(value)}
                                required
                            />
                        )}
                    />
                    {/* <TextInput
                        label="Department"
                        error={errors.department?.message}
                        {...register("department")}
                        disabled={form.formState.isSubmitting}
                        required
                    /> */}
                    {/* <Controller
                        name="salary"
                        control={control}
                        render={({ field }) => (
                            <NumberInput
                                label="Salary"
                                error={errors.salary?.message}
                                {...register("salary", { valueAsNumber: true })}
                                disabled={form.formState.isSubmitting}
                                value={field.value}
                                min={0}
                                max={9999999999}
                                hideControls={false}
                                onChange={(value) => field.onChange(value)}
                                required
                            />
                        )}
                    /> */}
                </SimpleGrid>
                <Stack mt="lg">
                    <Textarea
                        label="備考"
                        error={errors.remarks?.message}
                        {...register("remarks")}
                        disabled={form.formState.isSubmitting}
                        minRows={3}
                    />
                </Stack>
                <Stack mt="lg">
                    <Tooltip
                        label="契約書の解約済みであるかを確認するフラグです。"
                        // refProp="rootRef"
                    >
                        <Checkbox label="解約済み" onChange={(value) => {}} />
                    </Tooltip>
                </Stack>
            </form>
        </Box>
    );
};

export default ContractBasicPresentationalForm;
