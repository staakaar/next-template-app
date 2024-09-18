"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { onContractBasicSubmit } from "@/lib/contract/api";
import { Box } from "@chakra-ui/react";

const formSchema = z.object({
    username: z.string().min(2, {
        message: "ユーザー名は必須です。",
    }),
});

const ContractBasicForm = () => {
    // バリデーション
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {},
    });

    return (
        <Box className="mt-10">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onContractBasicSubmit)}
                    className="space-y-8"
                >
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>ユーザー名</FormLabel>
                                <FormControl>
                                    <Input placeholder="shadcn" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your public display name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </Box>
    );
};

export default ContractBasicForm;
