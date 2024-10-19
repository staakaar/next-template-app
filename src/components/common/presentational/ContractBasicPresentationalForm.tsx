"use client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { Box, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../ui/select";
import { Textarea } from "@/components/ui/textarea";

export type ContractBasicFormProps = {
    form: any;
    // control: Control<ContractBasicFormData>;
    // register: UseFormRegister<ContractBasicFormData>;
    // errors: FieldErrors<ContractBasicFormData>;
};

const ContractBasicPresentationalForm = ({ form }: ContractBasicFormProps) => {
    const control = form.control;
    const errors = form.errors;

    return (
        <>
            <Box className="mt-10">
                <Form {...form}>
                    <SimpleGrid
                        columns={{ base: 1, sm: 2, md: 1, lg: 2 }}
                        spacing={4}
                    >
                        <FormField
                            control={control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    {errors?.firstName && (
                                        <FormMessage>
                                            {errors.firstName.message}
                                        </FormMessage>
                                    )}
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    {errors?.lastName && (
                                        <FormMessage>
                                            {errors.lastName.message}
                                        </FormMessage>
                                    )}
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    {errors?.email && (
                                        <FormMessage>
                                            {errors.email.message}
                                        </FormMessage>
                                    )}
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    {errors?.phone && (
                                        <FormMessage>
                                            {errors.phone.message}
                                        </FormMessage>
                                    )}
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
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
                                    {errors?.role && (
                                        <FormMessage>
                                            {errors.role.message}
                                        </FormMessage>
                                    )}
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="department"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Department</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    {errors?.department && (
                                        <FormMessage>
                                            {errors.department.message}
                                        </FormMessage>
                                    )}
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="startDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Start Date</FormLabel>
                                    <FormControl>
                                        <Input type="date" {...field} />
                                    </FormControl>
                                    {errors?.startDate && (
                                        <FormMessage>
                                            {errors.startDate.message}
                                        </FormMessage>
                                    )}
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="salary"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Salary</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} />
                                    </FormControl>
                                    {errors?.salary && (
                                        <FormMessage>
                                            {errors.salary.message}
                                        </FormMessage>
                                    )}
                                </FormItem>
                            )}
                        />
                    </SimpleGrid>
                    <Box width="100%">
                        <FormField
                            control={control}
                            name="comments"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Comments</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} />
                                    </FormControl>
                                    {errors?.comments && (
                                        <FormMessage>
                                            {errors.comments.message}
                                        </FormMessage>
                                    )}
                                </FormItem>
                            )}
                        />
                    </Box>
                </Form>
            </Box>
        </>
    );
};

export default ContractBasicPresentationalForm;
