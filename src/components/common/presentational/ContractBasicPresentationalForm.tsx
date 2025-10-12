"use client";
import React, { useId } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { contractBasicFormSchema } from "@/lib/contractBasic/schema";

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
    const contractCodeId = useId();
    const contractNameId = useId();

    return (
        <div className="mt-10 relative">
            {form.formState.isSubmitting && (
                <div className="absolute inset-0 bg-background/50 z-10 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
            )}
            <form>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor={contractCodeId}>
                            契約書コード <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id={contractCodeId}
                            {...register("contractCode")}
                            disabled={form.formState.isSubmitting}
                            required
                        />
                        {errors.contractCode && (
                            <p className="text-sm text-red-500">
                                {errors.contractCode.message}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor={contractNameId}>
                            契約書名 <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id={contractNameId}
                            {...register("contractName")}
                            disabled={form.formState.isSubmitting}
                            required
                        />
                        {errors.contractName && (
                            <p className="text-sm text-red-500">
                                {errors.contractName.message}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="issuanceType">
                            発行分類 <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="issuanceType"
                            {...register("issuanceType")}
                            disabled={form.formState.isSubmitting}
                            required
                        />
                        {errors.issuanceType && (
                            <p className="text-sm text-red-500">
                                {errors.issuanceType.message}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="status">
                            ステータス <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="status"
                            {...register("status")}
                            disabled={form.formState.isSubmitting}
                            required
                        />
                        {errors.status && (
                            <p className="text-sm text-red-500">
                                {errors.status.message}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="contractConclusionDate">
                            契約締結日 <span className="text-red-500">*</span>
                        </Label>
                        <Controller
                            name="contractConclusionDate"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    id="contractConclusionDate"
                                    type="date"
                                    value={
                                        field.value
                                            ? new Date(field.value)
                                                  .toISOString()
                                                  .split("T")[0]
                                            : ""
                                    }
                                    onChange={(e) => {
                                        const date = e.target.value
                                            ? new Date(e.target.value)
                                            : null;
                                        field.onChange(date);
                                    }}
                                    disabled={form.formState.isSubmitting}
                                    required
                                />
                            )}
                        />
                        {errors.contractConclusionDate && (
                            <p className="text-sm text-red-500">
                                {errors.contractConclusionDate.message}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="contractStartDate">
                            契約開始日 <span className="text-red-500">*</span>
                        </Label>
                        <Controller
                            name="contractStartDate"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    id="contractStartDate"
                                    type="date"
                                    value={
                                        field.value
                                            ? new Date(field.value)
                                                  .toISOString()
                                                  .split("T")[0]
                                            : ""
                                    }
                                    onChange={(e) => {
                                        const date = e.target.value
                                            ? new Date(e.target.value)
                                            : null;
                                        field.onChange(date);
                                    }}
                                    disabled={form.formState.isSubmitting}
                                    required
                                />
                            )}
                        />
                        {errors.contractStartDate && (
                            <p className="text-sm text-red-500">
                                {errors.contractStartDate.message}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="contractEndDate">
                            契約終了日 <span className="text-red-500">*</span>
                        </Label>
                        <Controller
                            name="contractEndDate"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    id="contractEndDate"
                                    type="date"
                                    value={
                                        field.value
                                            ? new Date(field.value)
                                                  .toISOString()
                                                  .split("T")[0]
                                            : ""
                                    }
                                    onChange={(e) => {
                                        const date = e.target.value
                                            ? new Date(e.target.value)
                                            : null;
                                        field.onChange(date);
                                    }}
                                    disabled={form.formState.isSubmitting}
                                    required
                                />
                            )}
                        />
                        {errors.contractEndDate && (
                            <p className="text-sm text-red-500">
                                {errors.contractEndDate.message}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="nameInformation">名義情報</Label>
                        <Input
                            id="nameInformation"
                            placeholder="名義情報"
                            disabled={form.formState.isSubmitting}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="role">
                            ロール <span className="text-red-500">*</span>
                        </Label>
                        <Controller
                            name="role"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    disabled={form.formState.isSubmitting}
                                >
                                    <SelectTrigger id="role">
                                        <SelectValue placeholder="ロールを選択" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="admin">
                                            admin
                                        </SelectItem>
                                        <SelectItem value="user">
                                            User
                                        </SelectItem>
                                        <SelectItem value="manager">
                                            Manager
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.role && (
                            <p className="text-sm text-red-500">
                                {errors.role.message}
                            </p>
                        )}
                    </div>
                </div>
                <div className="mt-6 space-y-2">
                    <Label htmlFor="remarks">備考</Label>
                    <Textarea
                        id="remarks"
                        {...register("remarks")}
                        disabled={form.formState.isSubmitting}
                        rows={3}
                    />
                    {errors.remarks && (
                        <p className="text-sm text-red-500">
                            {errors.remarks.message}
                        </p>
                    )}
                </div>
                <div className="mt-6">
                    <HoverCard>
                        <HoverCardTrigger asChild>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="cancellation" />
                                <Label htmlFor="cancellation">解約済み</Label>
                            </div>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-90">
                            <p className="text-sm">
                                契約書の解約済みであるかを確認するフラグです。
                            </p>
                        </HoverCardContent>
                    </HoverCard>
                </div>
            </form>
        </div>
    );
};

export default ContractBasicPresentationalForm;
