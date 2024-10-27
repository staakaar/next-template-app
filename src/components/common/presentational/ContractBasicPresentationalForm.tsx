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
        formState: { errors },
        control,
    } = form;

    return (
        <Box className="mt-10">
            <LoadingOverlay visible={form.formState.isSubmitting} />
            <form>
                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
                    <TextInput
                        label="First Name"
                        error={errors.firstName?.message}
                        {...register("firstName")}
                        disabled={form.formState.isSubmitting}
                        required
                    />
                    <TextInput
                        label="Last Name"
                        error={errors.lastName?.message}
                        {...register("lastName")}
                        disabled={form.formState.isSubmitting}
                        required
                    />
                    <TextInput
                        label="Email"
                        error={errors.email?.message}
                        {...register("email")}
                        disabled={form.formState.isSubmitting}
                        required
                    />
                    <TextInput
                        label="Phone"
                        error={errors.phone?.message}
                        {...register("phone")}
                        disabled={form.formState.isSubmitting}
                        required
                    />
                    <Controller
                        name="role"
                        control={control}
                        render={({ field }) => (
                            <Select
                                label="Role"
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
                    <TextInput
                        label="Department"
                        error={errors.department?.message}
                        {...register("department")}
                        disabled={form.formState.isSubmitting}
                        required
                    />
                    <Controller
                        name="startDate"
                        control={control}
                        render={({ field }) => (
                            <DateInput
                                label="Start Date"
                                error={errors.startDate?.message}
                                {...register("startDate")}
                                disabled={form.formState.isSubmitting}
                                onChange={(value) => field.onChange(value)}
                                required
                            />
                        )}
                    />
                    <Controller
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
                    />
                </SimpleGrid>
                <Stack mt="lg">
                    <Textarea
                        label="Comments"
                        error={errors.comments?.message}
                        {...register("comments")}
                        disabled={form.formState.isSubmitting}
                        minRows={3}
                    />
                </Stack>
            </form>
        </Box>
    );
};

export default ContractBasicPresentationalForm;
