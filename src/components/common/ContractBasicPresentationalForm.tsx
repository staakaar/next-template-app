"use client";

import { Separator } from "@/components/ui/separator";
import { Heading } from "@chakra-ui/react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Box, SimpleGrid, useToast } from "@chakra-ui/react";
import {
    contractBasicFormSchema,
    ContractBasicFormData,
} from "@/lib/contract/schema";
import { contractBasicFormState } from "@/stores/contractBasic/atom";
import { useRecoilState } from "recoil";
import { useState } from "react";
import { z } from "zod";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Textarea } from "@/components/ui/textarea";
import { postContractBasic } from "@/lib/contract/api";

// export type ContractBasicFormProps = {
//     onSubmit: (data: ContractBasicFormSchema) => void;
// };

const ContractBasicPresentationalForm = () => {
    const [formData, setFormData] = useRecoilState(contractBasicFormState);
    const [errors, setErrors] = useState<Partial<ContractBasicFormData>>({});
    const form = useForm<ContractBasicFormData>({
        resolver: zodResolver(contractBasicFormSchema),
        defaultValues: formData,
    });
    const toast = useToast();

    /** フォーム変更時のストアへの反映 */
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

    /** 保存or更新時のバリデーションチェックと親コンポーネントへAPI処理移譲 */
    const onContractBasicSubmit = form.handleSubmit(async (data) => {
        try {
            const result = await postContractBasic(data);
            toast({
                title: "成功",
                description: result.message,
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            if (error instanceof z.ZodError) {
                setErrors(
                    error.flatten()
                        .fieldErrors as Partial<ContractBasicFormData>
                );
            }
            toast({
                title: "成功",
                description: "保存に失敗しました。",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        }
    });

    return (
        <>
            <Box className="flex items-center justify-between py-2">
                <Heading className="mt-4 mb-6">基本情報</Heading>
                {/* 詳細時は更新ボタン */}
                <Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded hover:shadow-lg transition-all duration-200">
                    更新
                </Button>
            </Box>
            <Separator />
            <Box className="mt-10">
                <Form {...form}>
                    <form
                        onSubmit={onContractBasicSubmit}
                        className="space-y-8"
                    >
                        <SimpleGrid columns={2} spacing={4}>
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Role</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a role" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="admin">
                                                    Admin
                                                </SelectItem>
                                                <SelectItem value="user">
                                                    User
                                                </SelectItem>
                                                <SelectItem value="manager">
                                                    Manager
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="department"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Department</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="startDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Start Date</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="salary"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Salary</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </SimpleGrid>
                        <Box width="100%">
                            <FormField
                                control={form.control}
                                name="comments"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Comments</FormLabel>
                                        <FormControl>
                                            <Textarea {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </Box>
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </Box>
        </>
    );
};

export default ContractBasicPresentationalForm;
